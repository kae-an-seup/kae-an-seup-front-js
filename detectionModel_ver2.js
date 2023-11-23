
            // no touch
            class FPS {
                constructor() {
                    this.startTime = 0;
                    this.frameCount = 0;
                }
            tick() {
                const currentTime = performance.now();
                if (!this.startTime) {
                this.startTime = currentTime;
                }

                if (currentTime - this.startTime >= 1000) {
                const fps = this.frameCount;
                // console.log(`FPS: ${fps}`);
                this.startTime = currentTime;
                this.frameCount = 0;
                }

                this.frameCount++;
                }
            }

            // 여기서부터 내가 짜
            let video2 = document.getElementsByClassName('input_video2')[0]; // video
            let out2 = document.getElementsByClassName('output2')[0];  //canvas
            let controlsElement2 = document.getElementsByClassName('control2')[0]; // no touch
            let spinner = document.querySelector('.loading');
            let countBox = document.getElementById('count-box'); // count 나타내는 p
            let gazeBox = document.getElementById('gaze-box'); // i want.... gaze..
            let canvasCtx = out2.getContext('2d');
            let fpsControl = new FPS();
            let startTime = new Date();
            // 여기 아래는 눈 깜박임 관련
            let blinkCounter = 0;
            let counter = 0;
            let re = false;
            let c = 0;
            let check = false;
            let check30M = 0;
            let movingAvg_tmp = 5;
            let movingAvg = 0;

            

            //1 onResultsFaceMesh
            function onResultsFaceMesh(results){
                // results = faceMesh

                document.body.classList.add("loaded"); // 로딩이 완료된 후
                fpsControl.tick(); // 프임속도 혹은 프레임 없데이트

                canvasCtx.save(); //현재 캔버스 저장
                canvasCtx.clearRect(0,0,out2.width, out2.height); // 캔버스를 지정한 여역을 투명하게 지움
                canvasCtx.drawImage(results.image, 0, 0, out2.width, out2.height); // 영상이 로드됌.

                let imageData = canvasCtx.getImageData(0, 0, out2.width, out2.height);
                let pixels = imageData.data;

                // 각 픽셀에 대해 그레이스케일로 변환
                for (let i = 0; i < pixels.length; i += 4) {
                    // RGB 색상 값을 가져와서 그레이스케일로 변환
                    let avg = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;

                    // R, G, B 값을 각각 그레이스케일 값으로 설정
                    pixels[i] = avg;
                    pixels[i + 1] = avg;
                    pixels[i + 2] = avg;
                }
                let ImageDataGray = imageData;
                // console.log(ImageDataGray.data); // gray scale ok.
                canvasCtx.putImageData(imageData, 0, 0); // gray 


                if (results.multiFaceLandmarks) {
                    for (const landmarks of results.multiFaceLandmarks) {
                        if (
                        landmarks[FACEMESH_RIGHT_EYE[0][0]] && landmarks[FACEMESH_RIGHT_EYE[3][0]] &&
                        landmarks[FACEMESH_LEFT_EYE[0][0]] && landmarks[FACEMESH_LEFT_EYE[3][0]]) {
                
                        let h = out2.height
                        let w = out2.width
                        const canvas = document.createElement('canvas');
                        canvas.width = 480;
                        canvas.height = 480;
                        const ctx = canvas.getContext('2d');
                        

                        // 여기부터
                        var grayCanvas = document.createElement('canvas');
                        grayCanvas.width = out2.width;
                        grayCanvas.height = out2.height;
                        var grayCtx = grayCanvas.getContext('2d');

                        grayCtx.putImageData(ImageDataGray, 0, 0);


                        var image = new Image();
                        image.onload = function() {
                            ctx. drawImage(image, 0, 0, canvas.width, canvas.height);

                            ctx.globalCompositeOperation = 'destination-atop';

                            // canvas에 눈 부분 빼고 다 검은색으로 하는 함수
                            drawEye(ctx, landmarks, FACEMESH_LEFT_EYE, FACEMESH_RIGHT_EYE, image);

                            // const updatedMaskData = ctx.getImageData(0, 0, 480, 480);
                        
                            // 여기는 테스트 부분
                            // let a = document.createElement('canvas');
                            // canvas.width = updatedMaskData.width;
                            // canvas.height = updatedMaskData.height;
                            // let b = canvas.getContext('2d');
                            // b.putImageData(updatedMaskData, 0, 0);
                            // let printImg = new Image();
                            // printImg.src = canvas.toDataURL();
                            // document.body.appendChild(printImg);

                            // 눈 부분만 이미지로 만들기 (Left)
                            var left_hor_point = (landmarks[FACEMESH_LEFT_EYE[6][0]].x * 480);
                            var left_ver_point = (landmarks[FACEMESH_LEFT_EYE[13][0]].y * 480);
                            var left_hor_length = ((landmarks[FACEMESH_LEFT_EYE[0][0]].x * 480) - (landmarks[FACEMESH_LEFT_EYE[6][0]].x * 480));
                            var left_ver_length = ((landmarks[FACEMESH_LEFT_EYE[3][0]].y * 480) - (landmarks[FACEMESH_LEFT_EYE[13][0]].y * 480));
                            var leftEyeImgData = ctx.getImageData(left_hor_point, left_ver_point, left_hor_length, left_ver_length);

                            get_gaze_ratio(leftEyeImgData);

                            // 눈 부분만 이미지로 만들기 (Right)
                            var right_hor_point = (landmarks[FACEMESH_RIGHT_EYE[0][0]].x * 480);
                            var right_ver_point = (landmarks[FACEMESH_RIGHT_EYE[12][0]].y * 480);
                            var right_hor_length = ((landmarks[FACEMESH_RIGHT_EYE[6][0]].x * 480) - (landmarks[FACEMESH_RIGHT_EYE[0][0]].x * 480));
                            var right_ver_length = ((landmarks[FACEMESH_RIGHT_EYE[4][0]].y * 480) - (landmarks[FACEMESH_RIGHT_EYE[12][0]].y * 480));
                            var rightEyeImgData = ctx.getImageData(right_hor_point, right_ver_point, right_hor_length, right_ver_length);

                            const left_gaze_ratio = get_gaze_ratio(leftEyeImgData);
                            const right_gaze_ratio = get_gaze_ratio(rightEyeImgData);

                            var gazeRatio = (left_gaze_ratio + right_gaze_ratio) / 2

                            // console.log(gazeRatio);
                            // 왼쪽 = 2.5~2.8 정도? 암튼 2.몇
                            // 오른쪽 = 0.4 ~ 0.6???
                            // 센터 = 0.12 암튼 0.1몇
                            // 왜 할 때마다 바뀌냐..

                            if (gazeRatio < 0.25) {
                                gazeBox.value = "center";
                            } else if (gazeRatio < 0.7) {
                                gazeBox.value = "right";
                            } else if (gazeRatio > 2.4 && gazeRatio < 2.9) {
                                gazeBox.value = "left";
                            }



                            const left_blinking_ratio = getBlinkingRatio(FACEMESH_LEFT_EYE, landmarks);
                            const right_blinking_ratio = getBlinkingRatio(FACEMESH_RIGHT_EYE, landmarks);
                            const blinkingRatio = (left_blinking_ratio + right_blinking_ratio) / 2;

                            if (blinkingRatio > 2.55) {
                                re = true;
                                countBox.value = c;
                            } else {
                                if (re == true) {
                                    c += 1;
                                    const endTime = new Date();
                                    movingAvg = (endTime - startTime) / c;
                                    movingAvg = (movingAvg_tmp + movingAvg) / 2;
                                    movingAvg_tmp = movingAvg;

                                    if (movingAvg > 3000) {
                                        if (movingAvg < 4000) {
                                            console.log("경고 1단계");
                                        } else if (movingAvg < 5000) {
                                            console.log("경고 2단계");
                                        } else if (movingAvg < 6000) {
                                            console.log("경고 3단계");
                                        }
                                    } else {
                                        console.log("0단계");
                                    }

                                    check = true;
                                    re = false;
                                }
                            }

                            // var gazeRatio = "center";

                            // gazeBox.value = gazeRatio;


                            // let a = document.createElement('canvas');
                            // a.width = rightEyeImgData.width;
                            // a.height = rightEyeImgData.height;
                            // let b = a.getContext('2d');
                            // b.putImageData(rightEyeImgData, 0, 0);
                            // document.body.appendChild(a);

                        }
                        image.src = grayCanvas.toDataURL();

                        // 여기까지 추가

                        
                        // const updatedMaskData = ctx.getImageData(0, 0, 480, 480);
                        
                        // // 여기는 테스트 부분
                        // let a = document.createElement('canvas');
                        // canvas.width = updatedMaskData.width;
                        // canvas.height = updatedMaskData.height;
                        // let b = canvas.getContext('2d');
                        // b.putImageData(updatedMaskData, 0, 0);
                        // let printImg = new Image();
                        // printImg.src = canvas.toDataURL();
                        // document.body.appendChild(printImg);


                        }
                    }
                } 
            }

            function drawEye(ctx, landmarks, leftEye, rightEye, image) {
                ctx.save();
                ctx.beginPath();

                // 왼쪽
                ctx.moveTo(landmarks[leftEye[0][0]].x * 480, landmarks[leftEye[0][0]].y * 480);

                ctx.bezierCurveTo(
                    landmarks[leftEye[1][0]].x * 480, landmarks[leftEye[1][0]].y * 480,
                    landmarks[leftEye[2][0]].x * 480, landmarks[leftEye[2][0]].y * 480,
                    landmarks[leftEye[3][0]].x * 480, landmarks[leftEye[3][0]].y * 480,
                );
                ctx.bezierCurveTo(
                    landmarks[leftEye[4][0]].x * 480, landmarks[leftEye[4][0]].y * 480,
                    landmarks[leftEye[5][0]].x * 480, landmarks[leftEye[5][0]].y * 480,
                    landmarks[leftEye[6][0]].x * 480, landmarks[leftEye[6][0]].y * 480,
                );

                ctx.moveTo(landmarks[leftEye[6][0]].x * 480, landmarks[leftEye[6][0]].y * 480);

                ctx.bezierCurveTo(
                    landmarks[leftEye[13][0]].x * 480, landmarks[leftEye[13][0]].y * 480,
                    landmarks[leftEye[12][0]].x * 480, landmarks[leftEye[12][0]].y * 480,
                    landmarks[leftEye[11][0]].x * 480, landmarks[leftEye[11][0]].y * 480,
                );
                ctx.bezierCurveTo(
                    landmarks[leftEye[10][0]].x * 480, landmarks[leftEye[10][0]].y * 480,
                    landmarks[leftEye[9][0]].x * 480, landmarks[leftEye[9][0]].y * 480,
                    landmarks[leftEye[8][0]].x * 480, landmarks[leftEye[8][0]].y * 480,
                );


                // 오른쪽
                ctx.moveTo(landmarks[rightEye[0][0]].x * 480, landmarks[rightEye[0][0]].y * 480);

                ctx.bezierCurveTo(
                    landmarks[rightEye[1][0]].x * 480, landmarks[rightEye[1][0]].y * 480,
                    landmarks[rightEye[2][0]].x * 480, landmarks[rightEye[2][0]].y * 480,
                    landmarks[rightEye[3][0]].x * 480, landmarks[rightEye[3][0]].y * 480,
                );
                ctx.bezierCurveTo(
                    landmarks[rightEye[4][0]].x * 480, landmarks[rightEye[4][0]].y * 480,
                    landmarks[rightEye[5][0]].x * 480, landmarks[rightEye[5][0]].y * 480,
                    landmarks[rightEye[6][0]].x * 480, landmarks[rightEye[6][0]].y * 480,
                );

                ctx.moveTo(landmarks[rightEye[6][0]].x * 480, landmarks[rightEye[6][0]].y * 480);

                ctx.bezierCurveTo(
                    landmarks[rightEye[13][0]].x * 480, landmarks[rightEye[13][0]].y * 480,
                    landmarks[rightEye[12][0]].x * 480, landmarks[rightEye[12][0]].y * 480,
                    landmarks[rightEye[11][0]].x * 480, landmarks[rightEye[11][0]].y * 480,
                );
                ctx.bezierCurveTo(
                    landmarks[rightEye[10][0]].x * 480, landmarks[rightEye[10][0]].y * 480,
                    landmarks[rightEye[9][0]].x * 480, landmarks[rightEye[9][0]].y * 480,
                    landmarks[rightEye[8][0]].x * 480, landmarks[rightEye[8][0]].y * 480,
                );


                ctx.lineWidth = 1;
                ctx.strokeStyle = 'red';
                ctx.stroke();
                ctx.restore();

                // 눈 안쪽을 이미지로 채우기
                ctx.save();
                ctx.clip();
                ctx.drawImage(image, 0, 0, 480, 480);
                ctx.restore();

                ctx.save();
                ctx.globalCompositeOperation = 'destination-over'; // 기존 그림 위에 덮어씌우기
                ctx.fillStyle = 'black';
                ctx.fillRect(0, 0, 480, 480);
                ctx.restore();
            }

            
            function get_gaze_ratio(imgData){
                var imgPixels = imgData.data; // 눈의 픽셀
                const middleX = Math.floor(imgData.width / 2); // 눈 픽셀의 중간 인덱스

                let leftWhitePixels = 0; // 눈의 왼쪽 흰색 픽셀 수
                let rightWhitePixels = 0; // 눈의 오른쪽 흰색 픽셀 수

                let countLeft = 0;
                let countRight = 0;

                for (let i = 0; i < imgPixels.length; i += 4) {
                    const red = imgPixels[i];
                    const green = imgPixels[i + 1];
                    const blue = imgPixels[i + 2];

                    const brightness = (red + green + blue) / 3;

                    if ( brightness >= 70) {
                        imgPixels[i] = 255;
                        imgPixels[i + 1] = 255;
                        imgPixels[i + 2] = 255;
                    } else {
                        imgPixels[i] = 0;
                        imgPixels[i + 1] = 0;
                        imgPixels[i + 2] = 0;
                    }
                }


                for (let y=0; y<imgData.height; y++) {
                    for (let x=0; x<middleX; x++) {
                        const index = (y * imgData.width + x) * 4;
                        const red = imgPixels[index];
                        const green = imgPixels[index + 1];
                        const blue = imgPixels[index + 2];
                        countLeft++;

                        if (red == 255 && green == 255 && blue == 255) {
                            leftWhitePixels++;
                        }
                    }

                    for (let x=middleX; x<imgData.width; x++) {
                        const index = (y * imgData.width + x) * 4;
                        const red = imgPixels[index];
                        const green = imgPixels[index + 1];
                        const blue = imgPixels[index + 2];
                        countRight++;

                        const brightness = (red + green + blue) / 3;

                        if (red == 255 && green == 255 && blue == 255) {
                            rightWhitePixels++;
                        }
                    }
                }


                // console.log(leftWhitePixels/rightWhitePixels);
                // 왼쪽 = 2.5~2.8 정도? 암튼 2.몇
                // 오른쪽 = 0.4~0.6???
                // 센터 = 0.12 암튼 0.1몇
                // 왜 할 때마다 바뀌냐..

                // var leftWhite = leftWhitePixels / countLeft;
                // var rightWhite = rightWhitePixels / countRight;
                // console.log(Math.abs(leftWhite-rightWhite));
                // console.log(rightWhitePixels);
                // console.log("right: " + rightWhitePixels);
                // console.log("left: " + leftWhitePixels);

                if (leftWhitePixels == 0) {
                    return 0.3;
                } else if (rightWhitePixels == 0) {
                    return 2.6;
                } else {
                    return (leftWhitePixels / rightWhitePixels);
                }

                // if (Math.abs(leftWhite-rightWhite) > 0.04) {
                //     // console.log(leftWhite/rightWhite);
                //     if (leftWhite > rightWhite) {
                //         // console.log("left");
                //         gazeBox.value = "left";
                //         // return "left";
                //         // return ; // 시선 방향 왼쪽인 경우 수치 정해야 됨
                //     } else {
                //         // console.log("right");
                //         gazeBox.value = "right";
                //         // return "right";
                //         // return ; // 시선 방향 오른쪽인 경우 수치 정해야 됨
                //     }
                // } else {
                //     // console.log("center");
                //     gazeBox.value = "center";
                //     // return "center";
                //     // return ;
                // }

            }

            function getBlinkingRatio(FACEMESH, landmarks) {
                const left_point = [landmarks[FACEMESH[0][0]].x,  landmarks[FACEMESH[0][0]].y]
                const right_point = [landmarks[FACEMESH[6][0]].x,  landmarks[FACEMESH[6][0]].y]
                const center_top = [landmarks[FACEMESH[3][0]].x,  landmarks[FACEMESH[3][0]].y]
                const center_bottom = [landmarks[FACEMESH[12][0]].x,  landmarks[FACEMESH[12][0]].y]

                const hor_line_length =  Math.hypot((left_point[0] - right_point[0]), (left_point[1] - right_point[1]));
                const ver_line_length =  Math.hypot((center_top[0] - center_bottom[0]), (center_top[1] - center_bottom[1]))

                return ratio = hor_line_length / (ver_line_length)
            }
            


            // no touch
            spinner.ontransitionend = () => {
            spinner.style.display = 'none';
            };

            //   no touch
            let faceMesh = new FaceMesh({locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.1/${file}`;
            }});
            faceMesh.onResults(onResultsFaceMesh); // 이거로 첫 함수를 부름

            let camera = new Camera(video2, {
                onFrame: async () => {
                    await faceMesh.send({image: video2});
                },
                width: 480,
                height: 480
            });
            camera.start(); // 여기서 카메라 시작하는 줄 알았는데? 아님.

                new ControlPanel(controlsElement2, {
                selfieMode: true,
                maxNumFaces: 1,
                minDetectionConfidence: 0.5,
                minTrackingConfidence: 0.5
            })
            .add([
                new StaticText({title: 'MediaPipe Face Mesh'}),
                fpsControl,
                new Toggle({title: 'Selfie Mode', field: 'selfieMode'}),
                new Slider({
                    title: 'Max Number of Faces',
                    field: 'maxNumFaces',
                    range: [1, 4],
                    step: 1
                }),
                new Slider({
                    title: 'Min Detection Confidence',
                    field: 'minDetectionConfidence',
                    range: [0, 1],
                    step: 0.01
                }),
                new Slider({
                    title: 'Min Tracking Confidence',
                    field: 'minTrackingConfidence',
                    range: [0, 1],
                    step: 0.01
                }),
            ])
            .on(options => {
                video2.classList.toggle('selfie', options.selfieMode);
                faceMesh.setOptions(options);
            });


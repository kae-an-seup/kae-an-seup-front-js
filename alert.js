document.addEventListener('DOMContentLoaded', () => {

    if (Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                // 권한이 허용된 경우 알림 표시
                showNotification();
                
            }
        });
    } else if (Notification.permission === 'granted') {
        // 이미 권한이 허용되어 있을 경우 알림 바로 표시
        showNotification();
    
    }
    let animation_toggle = false;
    console.log(animation_toggle, "애니메이션 토글1");

    const animeButton = document.querySelector('#animation_toggle');
    animeButton.addEventListener('click', () => {
        animeButton.classList.toggle('active');
        animation_toggle = true;
        console.log(animation_toggle, "애니메이션 토글2");
        showOneHour(); // 3600000 밀리초 = 1시간  

    });
    // setInterval(showOneHour, 3600000); // 3600000 밀리초 = 1시간
});

function showOneStep() {
    new Notification("캐-안습", {
        body: "눈을 깜빡일 시간이에요!",
        icon: "assets/cry1.png"
    })
}function showTwoStep() {
    new Notification("캐-안습", {
        body: "눈이 불편하지 않나요?",
        icon: "assets/cry2.png"
    })
}
function showThreeStep() {
    new Notification("캐-안습", {
        body: "안구건조증이 심해요!",
        icon: "assets/cry3.png"
    })
}

// function showOneHour() {
//     new Notification("캐-안습", {
//         body: "내용",
//         icon: "assets/eyeDrop.png"
//     })
// }

function showNotification() {
    const notification = new Notification("캐-안습", {
        body: "안구건조증을 방지하기 위한 서비스가 시작됩니다.",
        icon: "assets/eyeDrop.png" // 알림에 표시될 아이콘 경로
    });
}

function showOneHour() {
    // const notification = new Notification("캐-안습", {
    //     body: "한시간",
    //     icon: "assets/eyeDrop.png" // 알림에 표시될 아이콘 경로
    // });
    // // 알림 클릭 이벤트 리스너 추가
    // notification.onclick = function() {
    //     window.location.href = 'anime.html'; // 이 부분에 원하는 페이지의 URL을 지정하세요.
    // };
    if (Notification.permission === 'granted') {
        const notification = new Notification("캐-안습", {
            body: "한 시간이 지났습니다. 애니메이션 운동 어때요 ?",
            icon: "assets/eyeDrop.png" // 알림에 표시될 아이콘 경로
        });

        // 알림 클릭 시 페이지 이동 (선택적)
        notification.onclick = function() {
            window.location.href = 'anime.html'; // 페이지 URL 변경 가능
        };
    }
}
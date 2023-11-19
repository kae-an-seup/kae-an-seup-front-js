document.addEventListener('DOMContentLoaded', () => {

    if (Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                // 권한이 허용된 경우 알림 표시
                showNotification();
                // const notification = new Notification("캐-안습", {
                //     body: "안구건조증을 방지하기 위한 서비스가 시작됩니다.",
                //     icon: "assets/eyeDrop.png" // 알림에 표시될 아이콘 경로
                // });
            }
        });
    } else if (Notification.permission === 'granted') {
        // 이미 권한이 허용되어 있을 경우 알림 바로 표시
        showNotification();
        // const notification = new Notification("캐-안습", {
        //     body: "안구건조증을 방지하기 위한 서비스가 시작됩니다.",
        //     icon: "assets/eyeDrop.png" // 알림에 표시될 아이콘 경로
        // });
    }
});

function showOneStep() {
    new Notification("캐-안습", {
        body: "내용",
        icon: "assets/cry1.png"
    })
}function showTwoStep() {
    new Notification("캐-안습", {
        body: "내용",
        icon: "assets/cry2.png"
    })
}
function showThreeStep() {
    new Notification("캐-안습", {
        body: "내용",
        icon: "assets/cry3.png"
    })
}

function showOneHour() {
    new Notification("캐-안습", {
        body: "내용",
        icon: "assets/eyeDrop.png"
    })
}

// 알림 클릭 이벤트 핸들러 설정
// document.addEventListener('click', function(e) {
//     // 알림을 클릭한 경우만 처리
//     if (e.target instanceof Notification) {
//       // 원하는 페이지로 이동
//       window.location.href = '/anime.html';
//     }
// });
function showNotification() {
    const notification = new Notification("캐-안습", {
        body: "안구건조증을 방지하기 위한 서비스가 시작됩니다.",
        icon: "assets/eyeDrop.png" // 알림에 표시될 아이콘 경로
    });

    // 알림 클릭 이벤트 리스너 추가
    notification.onclick = function() {
        window.location.href = 'anime.html'; // 이 부분에 원하는 페이지의 URL을 지정하세요.
    };
}
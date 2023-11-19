document.addEventListener('DOMContentLoaded', () => {

    if (Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                // 권한이 허용된 경우 알림 표시
                new Notification("캐-안습", {
                    body: "안구건조증을 방지하기 위한 서비스가 시작됩니다.",
                    icon: "assets/eyeDrop.png" // 알림에 표시될 아이콘 경로
                });
            }
        });
    } else if (Notification.permission === 'granted') {
        // 이미 권한이 허용되어 있을 경우 알림 바로 표시
        new Notification("캐-안습", {
            body: "안구건조증을 방지하기 위한 서비스가 시작됩니다.",
            icon: "assets/eyeDrop.png" // 알림에 표시될 아이콘 경로
        });
    }
});

function showThreeStep() {
    new Notification("캐-안습", {
        body: "내용",
        icon: "assets/eyeDrop.png"
    })
}

function showOneHour() {
    new Notification("캐-안습", {
        body: "내용",
        icon: "assets/eyeDrop.png"
    })
}
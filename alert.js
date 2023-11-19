document.addEventListener('DOMContentLoaded', () => {
    // 알림 권한 요청
    if (Notification.permission !== "granted" && Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                // 사용자가 알림을 허용하면 알림 표시
                showNotification();
            }
        });
    } else if (Notification.permission === "granted") {
        // 이미 권한이 허용된 경우 알림 바로 표시
        showNotification();
    }
});

function showNotification() {
    const notification = new Notification("안녕하세요!", {
        body: "캐-안습에 오신 것을 환영합니다.",
        icon: "경로/icon.png" // 여기에 원하는 아이콘의 경로를 지정하세요.
    });
}
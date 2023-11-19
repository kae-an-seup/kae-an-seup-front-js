document.addEventListener('DOMContentLoaded', (event) => {
    // alert('카메라 접근 권한을 허용하시겠습니까?');
    // alert('사운드 접근 권한을 허용하시겠습니까?');

    const blinkToggle = document.querySelectorAll('#blink_toggle');
    blinkToggle.forEach(switchElement => {
        switchElement.addEventListener('click', () => {
            switchElement.classList.toggle('active');
            // 토글 상태에 따른 추가적인 동작을 여기에 구현할 수 있습니다.
        });
    });
    const lightToggle = document.querySelectorAll('#light_toggle');
    lightToggle.forEach(switchElement => {
        switchElement.addEventListener('click', () => {
            switchElement.classList.toggle('active');
            // 토글 상태에 따른 추가적인 동작을 여기에 구현할 수 있습니다.
        });
    });

    });


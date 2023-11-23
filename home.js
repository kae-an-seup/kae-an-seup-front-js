document.addEventListener('DOMContentLoaded', (event) => {
    // alert('카메라 접근 권한을 허용하시겠습니까?');
    // alert('사운드 접근 권한을 허용하시겠습니까?');

    let blink_toggle = true; // 초기 상태를 true로 설정
    console.log(blink_toggle, "눈 깜박임 토글 초기 상태");

    const blinkButton = document.querySelector('#blink_toggle');
    blinkButton.addEventListener('click', () => {
        blink_toggle = !blink_toggle; // 토글 상태를 반전
        console.log(blink_toggle, "눈 깜박임 토글 변경된 상태");
    });
    
    const lightToggle = document.querySelectorAll('#light_toggle');
    // lightToggle.classList.add('active');

    lightToggle.forEach(switchElement => {
        switchElement.addEventListener('click', () => {
            switchElement.classList.toggle('active');
            // 토글 상태에 따른 추가적인 동작을 여기에 구현할 수 있습니다.
        });
    });

    });


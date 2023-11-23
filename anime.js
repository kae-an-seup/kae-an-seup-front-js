document.addEventListener('DOMContentLoaded', () => {

  if (Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
              // 권한이 허용된 경우 알림 표시
              startAnime();
          }
      });
  } else if (Notification.permission === 'granted') {
      // 이미 권한이 허용되어 있을 경우 알림 바로 표시
      startAnime();
  }
});

// const startButton = document.getElementById('startAnimationButton');
const circle = document.querySelector('.circle');

const upDown = anime({
    targets: '.circle',
    translateY: [
      { value: '-50vh', duration: 800, easing: 'easeInOutSine' },
      { value: '50vh', duration: 800, easing: 'easeInOutSine' },
      { value: '-50vh', duration: 800, easing: 'easeInOutSine' },
      { value: '50vh', duration: 800, easing: 'easeInOutSine' },
      { value: '-50vh', duration: 800, easing: 'easeInOutSine' },
      { value: '0vh', duration: 800, easing: 'easeInOutSine' },
    ],
    autoplay: false,
  });

const leftRight = anime({
    targets: '.circle',
    translateX: [
        { value: '-50vw', duration: 1200, easing: 'easeInOutSine' },
        { value: '50vw', duration: 1200, easing: 'easeInOutSine' },
        { value: '-50vw', duration: 1200, easing: 'easeInOutSine' },
        { value: '50vw', duration: 1200, easing: 'easeInOutSine' },
        { value: '-50vw', duration: 1200, easing: 'easeInOutSine' },
        { value: '0', duration: 1200, easing: 'easeInOutSine' },
    ],
    autoplay: false,
});

const diagonal = anime({
    targets: '.circle',
    translateY: [
        { value: '-70vh', duration: 1200, easing: 'easeInOutSine' },
        { value: '70vh', duration: 1200, easing: 'easeInOutSine' },
        { value: '-70vh', duration: 1200, easing: 'easeInOutSine' },
        { value: '70vh', duration: 1200, easing: 'easeInOutSine' },
        { value: '-70vh', duration: 1200, easing: 'easeInOutSine' },
        { value: '70vh', duration: 1200, easing: 'easeInOutSine' },
        { value: '0', duration: 1200, easing: 'easeInOutSine' },
      ],
      translateX: [
        { value: '-70vw', duration: 1200, easing: 'easeInOutSine' },
        { value: '70vw', duration: 1200, easing: 'easeInOutSine' },
        { value: '-70vw', duration: 1200, easing: 'easeInOutSine' },
        { value: '70vw', duration: 1200, easing: 'easeInOutSine' },
        { value: '-70vw', duration: 1200, easing: 'easeInOutSine' },
        { value: '70vw', duration: 1200, easing: 'easeInOutSine' },
        { value: '0', duration: 1200, easing: 'easeInOutSine' }
      ],
      autoplay: false,
});

const diagonal2 = anime({
    targets: '.circle',
    translateY: [
        { value: '-70vh', duration: 800, easing: 'easeInOutSine' },
        { value: '70vh', duration: 800, easing: 'easeInOutSine' },
        { value: '-70vh', duration: 800, easing: 'easeInOutSine' },
        { value: '70vh', duration: 800, easing: 'easeInOutSine' },
        { value: '-70vh', duration: 800, easing: 'easeInOutSine' },
        { value: '70vh', duration: 800, easing: 'easeInOutSine' },
        { value: '0', duration: 800, easing: 'easeInOutSine' },
      ],
      translateX: [
        { value: '70vw', duration: 800, easing: 'easeInOutSine' },
        { value: '-70vw', duration: 800, easing: 'easeInOutSine' },
        { value: '70vw', duration: 800, easing: 'easeInOutSine' },
        { value: '-70vw', duration: 800, easing: 'easeInOutSine' },
        { value: '70vw', duration: 800, easing: 'easeInOutSine' },
        { value: '-70vw', duration: 800, easing: 'easeInOutSine' },
        { value: '0', duration: 800, easing: 'easeInOutSine' }
      ],
      autoplay: false,
});

// upDown.finished.then(() => {
//     leftRight.restart();
//     leftRight.finished.then(() => {
//       diagonal.restart();
//       diagonal.finished.then(() => {
//           diagonal2.restart();
//       })
//     });
//   });

function startAnime() {
  leftRight.restart();
  leftRight.finished.then(() => {
    diagonal.restart();
    diagonal.finished.then(() => {
      diagonal2.restart();
    })
  })
}
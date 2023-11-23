
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

leftRight.finished.then(() => {
  diagonal.restart();
  diagonal.finished.then(() => {
    diagonal2.restart();
  })
})
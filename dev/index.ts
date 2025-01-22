import './index.scss';

import { createMatrix, mode } from '../src/index';
import { getRandom } from '../src/util';

const urls = ['/images/1.webp', '/images/2.webp', '/images/3.webp', '/images/4.webp'];

const app = document.getElementById('app')!;

const move = createMatrix(app, {
  images: urls,
  row: 7,
  col: 9,
});

const inList = [
  'flash',
  'bounceIn',
  'bounceInDown',
  'bounceInLeft',
  'bounceInRight',
  'bounceInUp',
  'fadeIn',
  'fadeInDown',
  'fadeInDownBig',
  'fadeInLeft',
  'fadeInLeftBig',
  'fadeInRight',
  'fadeInRightBig',
  'fadeInUp',
  'fadeInUpBig',
  'flipInX',
  'flipInY',
  'lightSpeedIn',
  'rotateIn',
  'rotateInDownLeft',
  'rotateInDownRight',
  'rotateInUpLeft',
  'rotateInUpRight',
  'rollIn',
  'zoomIn',
  'zoomInDown',
  'zoomInLeft',
  'zoomInRight',
  'zoomInUp',
  'slideInDown',
  'slideInLeft',
  'slideInRight',
  'slideInUp',
];

const outList = [
  'flash',
  'bounceOut',
  'bounceOutDown',
  'bounceOutLeft',
  'bounceOutRight',
  'bounceOutUp',
  'fadeOut',
  'fadeOutDown',
  'fadeOutDownBig',
  'fadeOutLeft',
  'fadeOutLeftBig',
  'fadeOutRight',
  'fadeOutRightBig',
  'fadeOutUp',
  'fadeOutUpBig',
  'flipOutX',
  'flipOutY',
  'lightSpeedOut',
  'rotateOut',
  'rotateOutDownLeft',
  'rotateOutDownRight',
  'rotateOutUpLeft',
  'rotateOutUpRight',
  'hinge',
  'rollOut',
  'zoomOut',
  'zoomOutDown',
  'zoomOutLeft',
  'zoomOutRight',
  'zoomOutUp',
  'slideOutDown',
  'slideOutLeft',
  'slideOutRight',
  'slideOutUp',
];

const next = () => {
  const animateIndex = getRandom(inList.length);
  move.movePoint(mode[getRandom(mode.length)], {
    animate: true,
    classNameIn: `animate__animated animate__${inList[animateIndex]}`,
    classNameOut: `animate__animated animate__${outList[animateIndex]}`,
  });
};

next();

app.addEventListener('click', () => {
  next();
});

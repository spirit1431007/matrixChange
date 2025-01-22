import { modeType } from './mode/index';

import Matrix, { HitPointEvent } from './matrix';
import { initLayout, initDom } from './init-dom';
import { getRandom } from './util';
import { CHANGE_STEP } from './const';

interface MatrixOption {
  images: string[];
  row?: number;
  col?: number;
}

interface HitPointOption {
  image?: string;
  className?: string;
  animate?: boolean;
  classNameIn?: string;
  classNameOut?: string;
}

let defaultOption = {
  row: 7,
  col: 9,
  images: [],
};

export function createMatrix(dom: HTMLElement, option: MatrixOption) {
  let sureOption = { ...defaultOption, ...option };

  initLayout(sureOption.row, sureOption.col);
  let domMatrix = initDom(dom, sureOption.row, sureOption.col);

  let matrix = new Matrix(sureOption.row, sureOption.col);
  let image = sureOption.images[0];

  matrix.$on('changeStart', () => {
    let num = getRandom(sureOption.images.length - 1);
    image = sureOption.images[num];
  });

  matrix.$on<HitPointEvent<HitPointOption>>('hitPoint', (event) => {
    image = event.option.image ? event.option.image : image;
    let classNameIn = '';
    let classNameOut = 'zm-default';

    if (event.option.classNameIn && event.option.classNameOut) {
      event.option.animate = true;
      classNameIn = event.option.classNameIn;
      classNameOut = event.option.classNameOut;
    } else if (event.option.className) {
      classNameOut = event.option.className;
    }

    let dom = domMatrix[event.point.x][event.point.y];
    if (dom.dataset.step && dom.dataset.step !== CHANGE_STEP.INIT) {
      return;
    }

    let baseClass = dom.dataset.class as string;

    if (event.option.animate) {
      let listenAnimation = () => {
        if (dom.dataset.step === CHANGE_STEP.START_OUT) {
          dom.className = baseClass;
          dom.dataset.step = CHANGE_STEP.INIT;

          dom.removeEventListener('animationend', listenAnimation);
          if (event.end) {
            matrix.$emit('changeEnd');
            matrix.lock = false;
          }
          return;
        }

        dom.className = `${baseClass} ${classNameIn}`;
        dom.dataset.step = CHANGE_STEP.START_OUT;
        let child = dom.children[0] as HTMLElement;
        child.style.backgroundImage = `url(${image})`;
      };

      dom.addEventListener('animationend', listenAnimation);
    } else {
      let listenTransition = () => {
        dom.dataset.step = CHANGE_STEP.INIT;
        dom.className = baseClass;
        let child = dom.children[0] as HTMLElement;
        child.style.backgroundImage = `url(${image})`;

        dom.removeEventListener('transitionend', listenTransition);
        if (event.end) {
          matrix.$emit('changeEnd');
          matrix.lock = false;
        }
      };

      dom.addEventListener('transitionend', listenTransition);
    }

    dom.className = `${baseClass} ${classNameOut}`;
    dom.dataset.step = CHANGE_STEP.START_IN;
    dom.style.transition = event.mode.duration / 1000 + 's';
  });

  return {
    matrixChange: matrix,
    movePoint: (mode: modeType, option = {}) => {
      matrix.movePoint<HitPointOption>(mode, option);
    },
    changeImages(images: string[]) {
      sureOption.images = images;
    },
  };
}

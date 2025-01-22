export function initLayout(row: number, col: number) {
  let positionStyle = [];
  for (let i = 1; i <= row; i++) {
    for (let j = 1; j <= col; j++) {
      let wrapStyle = `top:${(100 / row) * (i - 1)}%;left:${(100 / col) * (j - 1)}%;`;
      positionStyle.push(`.zm-container .zm-item-${i}-${j}{${wrapStyle}}`);
      let childStyle = `top:${-100 * (i - 1)}%;left:${-100 * (j - 1)}%;`;
      positionStyle.push(`.zm-container .zm-item-${i}-${j} .zm-child{${childStyle}}`);
    }
  }

  let matrixChangeStyle = [
    `.zm-container .zm-item{width:${100 / col}%;height:${100 / row}%;}`,
    `.zm-container .zm-item .zm-child{width:${100 * col}%;height:${100 * row}%;}`,
    positionStyle.join(''),
  ].join('');

  let styleDom = document.createElement('style');
  styleDom.innerHTML = matrixChangeStyle;
  document.head.appendChild(styleDom);
}

export function initDom(dom: HTMLElement, row: number, col: number): HTMLElement[][] {
  let fragment = document.createDocumentFragment();
  let domMatrix = [];
  for (let i = 1; i <= row; i++) {
    let rowDom = [];
    for (let j = 1; j <= col; j++) {
      let dom = document.createElement('div');
      dom.className = `zm-item zm-item-${i}-${j}`;
      dom.dataset.class = dom.className;
      let domInner = document.createElement('div');
      domInner.className = `zm-child`;
      dom.appendChild(domInner);
      fragment.appendChild(dom);
      rowDom.push(dom);
    }
    domMatrix.push(rowDom);
  }
  dom.classList.add('zm-container');
  dom.appendChild(fragment);
  return domMatrix;
}

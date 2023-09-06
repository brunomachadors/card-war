const loadText = document.querySelector('.loading-text');
const board = document.querySelector('.board');

export function loader() {
  let load = 0;
  let int = setInterval(blurring, 10);

  function blurring() {
    load++;
    console.log(1);
    if (load > 99) {
      clearInterval(int);
    }

    loadText.innerText = `${load}%`;
    loadText.style.opacity = scale(load, 0, 100, 1, 0);
    board.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;
  }

  const scale = (num, in_min, in_max, out_min, out_max) => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  };
}

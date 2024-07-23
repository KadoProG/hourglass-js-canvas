import { balls, renderBall } from "./ball";
import { drawGrid, gridSize } from "./grid";
import { timeAsync } from "./utils";

const angleInput = document.getElementById("angleInput") as HTMLInputElement;

let isPositiveSine = Math.sin((Number(angleInput.value) * Math.PI) / 180) >= 0;
let isPositiveCosine =
  Math.cos((Number(angleInput.value) * Math.PI) / 180) >= 0;

export const animationRoutine = (
  canvasElement: HTMLCanvasElement,
  canvasIndex: number
) => {
  drawGrid(canvasElement);
  balls[canvasIndex].forEach((ball, index) => {
    let x = ball.x + (isPositiveSine ? 1 : -1);
    let y = ball.y + (isPositiveCosine ? 1 : -1);

    let isRightEnd = false;
    let isBottomEnd = false;

    let isBottomRightEmpty = true;
    let isBottomEmpty = true;
    let isBottomLeftEmpty = true;

    if (isPositiveSine && x === gridSize) {
      x--;
      isRightEnd = true;
    } else if (!isPositiveSine && x === -1) {
      x++;
      isRightEnd = true;
    }

    if (isPositiveCosine && y === gridSize) {
      y--;
      isBottomEnd = true;
    } else if (!isPositiveCosine && y === -1) {
      y++;
      isBottomEnd = true;
    }
    if (isRightEnd && isBottomEnd) {
      ball.x = x;
      ball.y = y;
      return renderBall(canvasElement, x, y, index);
    }

    balls[canvasIndex].forEach((b, index2) => {
      if (index === index2) return;
      if (b.x === x && b.y === y) {
        isBottomEmpty = false;
      }
      if (b.x === x && b.y === (isPositiveCosine ? y - 1 : y + 1)) {
        isBottomRightEmpty = false;
      }
      if (b.x === (isPositiveSine ? x - 1 : x + 1) && b.y === y) {
        isBottomLeftEmpty = false;
      }
    });

    if (!isBottomEmpty) {
      if (isBottomRightEmpty) {
        isPositiveCosine ? y-- : y++;
      } else if (isBottomLeftEmpty) {
        isPositiveSine ? x-- : x++;
      } else {
        isPositiveCosine ? y-- : y++;
        isPositiveSine ? x-- : x++;
      }
    }

    ball.x = x;
    ball.y = y;
    renderBall(canvasElement, x, y, index);
  });
  setTimeout(() => animationRoutine(canvasElement, canvasIndex), 50);
};

export const fallBall = async (time: number, canvasIndex: number) => {
  const x = isPositiveSine ? 0 : gridSize - 1;
  const y = isPositiveCosine ? 0 : gridSize - 1;

  balls[canvasIndex].push({ x, y });
  await timeAsync(time, () => {});
};

export const changeSystemSetting = (
  canvasElement: HTMLElement,
  angle: number
) => {
  angleInput.value = String(angle);
  const size = ((Math.sqrt(2) - 1) * canvasElement.offsetWidth) / 2;
  canvasElement.style.transform = `translate(${size}px, ${size}px) rotate(${angleInput.value}deg)`;

  isPositiveSine = Math.sin((Number(angle) * Math.PI) / 180) >= 0;
  isPositiveCosine = Math.cos((Number(angle) * Math.PI) / 180) >= 0;
};

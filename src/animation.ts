import { balls, renderBall } from "./ball";
import { drawGrid, gridSize } from "./grid";
import { timeAsync } from "./utils";

const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const angleInput = document.getElementById("angleInput") as HTMLInputElement;

let isPositiveSine = Math.sin((Number(angleInput.value) * Math.PI) / 180) >= 0;
let isPositiveCosine =
  Math.cos((Number(angleInput.value) * Math.PI) / 180) >= 0;

export const animationRoutine = () => {
  drawGrid();
  balls.forEach((ball, index) => {
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
      return renderBall(x, y, index);
    }

    balls.forEach((b, index2) => {
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
    renderBall(x, y, index);
  });
  setTimeout(animationRoutine, 50);
};

export const fallBall = async (time: number) => {
  const x = isPositiveSine ? 0 : gridSize - 1;
  const y = isPositiveCosine ? 0 : gridSize - 1;

  balls.push({ x, y });
  await timeAsync(time, () => {});
};

export const changeSystemSetting = (angle: number) => {
  angleInput.value = String(angle);
  canvas.style.transform = `rotate(${angle}deg)`;

  isPositiveSine = Math.sin((Number(angle) * Math.PI) / 180) >= 0;
  isPositiveCosine = Math.cos((Number(angle) * Math.PI) / 180) >= 0;
};

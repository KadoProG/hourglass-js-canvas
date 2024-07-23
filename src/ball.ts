import { isPositiveCosine, isPositiveSine } from "./animation";
import { gridSize } from "./grid";
import { angleInput } from "./main";

export const balls: { x: number; y: number }[][] = [[], []];

export const renderBall = (
  canvasElement: HTMLCanvasElement,
  x: number,
  y: number,
  num: number
) => {
  const ctx = canvasElement.getContext("2d")!;
  const cellSize = canvasElement.width / 8;
  ctx.fillStyle = "white";
  ctx.strokeStyle = "red";
  ctx.beginPath();
  ctx.arc(
    cellSize * x + cellSize / 2,
    cellSize * y + cellSize / 2,
    cellSize / 2,
    0,
    Math.PI * 2
  );
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "black";
  ctx.font = `${cellSize / 2}px Arial`;
  ctx.fillText(
    String(num),
    cellSize * x + cellSize / 2,
    cellSize * y + cellSize / 2
  );
};

export const fallBall = (canvasIndex: number) => {
  const x = isPositiveSine ? 0 : gridSize - 1;
  const y = isPositiveCosine ? 0 : gridSize - 1;

  balls[canvasIndex].push({ x, y });
};

export const removeBall = (canvasIndex: number): boolean => {
  // 真ん中のボールを削除
  const x = isPositiveSine ? gridSize - 1 : 0;
  const y = isPositiveCosine ? gridSize - 1 : 0;
  const index = balls[canvasIndex].findIndex(
    (ball) => ball.x === x && ball.y === y
  );
  if (index === -1) return false;
  balls[canvasIndex].splice(index, 1);
  return true;
};

export const fallBallThrouthCanvas = () => {
  // canvasが横向きの場合はtanθが負になるので、その場合は処理を終了する
  if (Math.tan(Number(angleInput.value)) < 0) return;

  // 真ん中のボールを削除
  const result = removeBall(isPositiveSine ? 0 : 1);

  if (result) {
    // ボールが正常に削除された場合は、ボールを落とす
    fallBall(isPositiveSine ? 1 : 0);
  }
};

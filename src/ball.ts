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

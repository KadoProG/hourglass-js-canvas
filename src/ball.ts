const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const cellSize = canvas.width / 8;

export const balls: { x: number; y: number }[] = [];

export const renderBall = (x: number, y: number, num: number) => {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(
    cellSize * x + cellSize / 2,
    cellSize * y + cellSize / 2,
    cellSize / 2,
    0,
    Math.PI * 2
  );
  ctx.fill();

  ctx.fillStyle = "black";
  ctx.font = `${cellSize / 2}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(
    String(num),
    cellSize * x + cellSize / 2,
    cellSize * y + cellSize / 2
  );
};

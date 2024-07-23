export const gridSize = 8;

export const drawGrid = (canvasElement: HTMLCanvasElement) => {
  const cellSize = canvasElement.width / gridSize;
  const ctx = canvasElement.getContext("2d")!;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);

  ctx.strokeStyle = "black";
  for (let i = 0; i <= gridSize; i++) {
    ctx.beginPath();
    ctx.moveTo(i * cellSize, 0);
    ctx.lineTo(i * cellSize, canvasElement.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i * cellSize);
    ctx.lineTo(canvasElement.width, i * cellSize);
    ctx.stroke();
  }

  ctx.fillStyle = "black";
  ctx.font = "12px Arial";
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const x = col * cellSize + cellSize / 2;
      const y = row * cellSize + cellSize / 2;
      ctx.fillText(`[${col}, ${row}]`, x - 10, y + 10);
    }
  }
};

export const gridSize = 8;

export const drawGrid = (canvasElement: HTMLCanvasElement) => {
  const cellSize = canvasElement.width / gridSize;
  const ctx = canvasElement.getContext("2d")!;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);

  ctx.strokeStyle = "#ddd";
  for (let i = 0; i <= gridSize; i++) {
    // 縦線の描写
    ctx.beginPath();
    ctx.moveTo(i * cellSize, 0);
    ctx.lineTo(i * cellSize, canvasElement.height);
    ctx.stroke();

    // 横線の描写
    ctx.beginPath();
    ctx.moveTo(0, i * cellSize);
    ctx.lineTo(canvasElement.width, i * cellSize);
    ctx.stroke();
  }

  // 中の座標文字の描写
  ctx.fillStyle = "gray";
  ctx.font = `${cellSize / 4}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const x = col * cellSize + cellSize / 2;
      const y = row * cellSize + cellSize / 2;
      ctx.fillText(`[${col}, ${row}]`, x, y);
    }
  }
};

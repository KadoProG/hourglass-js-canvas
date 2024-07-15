// Canvasの初期設定
const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

// グリッドのサイズ設定
const gridSize = 8;
const cellSize = canvas.width / gridSize;

// // 現在の斜めのインデックス
// let currentDiagonal = 0;

// 数字の描画関数
function drawGrid() {
  // キャンバスの背景を白に設定
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // グリッドの描画
  ctx.strokeStyle = "black";
  for (let i = 0; i <= gridSize; i++) {
    ctx.beginPath();
    ctx.moveTo(i * cellSize, 0);
    ctx.lineTo(i * cellSize, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i * cellSize);
    ctx.lineTo(canvas.width, i * cellSize);
    ctx.stroke();
  }

  // 数字の描画
  ctx.fillStyle = "black";
  ctx.font = "10px Arial";
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const number = row * gridSize + col;
      const x = col * cellSize + cellSize / 2;
      const y = row * cellSize + cellSize / 2;
      ctx.fillText(number.toString(), x - 10, y + 10);
    }
  }
}

// // セルの背景色を更新する関数
// function updateDiagonalBackground() {
//   // 斜めのセルを計算
//   for (let i = 0; i <= currentDiagonal; i++) {
//     let row = currentDiagonal - i;
//     let col = i;
//     if (row < gridSize && col < gridSize) {
//       // 色を設定（青色の透明度を増やしていく）
//       ctx.fillStyle = `rgb(0, 0, 255)`;
//       ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);

//       // 数字を再描画
//       ctx.fillStyle = "black";
//       ctx.font = "10px Arial";
//       const number = row * gridSize + col;
//       const x = col * cellSize + cellSize / 2;
//       const y = row * cellSize + cellSize / 2;
//       ctx.fillText(number.toString(), x - 10, y + 10);
//     }
//   }

//   // インデックスを更新
//   currentDiagonal++;
//   if (currentDiagonal >= 2 * gridSize - 1) {
//     // clearInterval(animationInterval);
//   }
// }

const updateBall = (x: number, y: number) => {
  // ボールの描画
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
};

// 初期グリッドの描画
drawGrid();
updateBall(0, 0);

setTimeout(() => {
  drawGrid();
  updateBall(1, 1);
}, 1000);

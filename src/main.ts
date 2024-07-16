// Canvasの初期設定
const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const angleInput = document.getElementById("angleInput") as HTMLInputElement;
const form = document.getElementById("form") as HTMLFormElement;
const ctx = canvas.getContext("2d")!;

// グリッドのサイズ設定
const gridSize = 8;
const cellSize = canvas.width / gridSize;

const isPositiveSine =
  Math.sin((Number(angleInput.value) * Math.PI) / 180) >= 0;
const isPositiveCosine =
  Math.cos((Number(angleInput.value) * Math.PI) / 180) >= 0;

/**
 * グリッドの描画（ボール以外のキャンパスの初期化）
 */
const drawGrid = () => {
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
  ctx.font = "12px Arial";
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const x = col * cellSize + cellSize / 2;
      const y = row * cellSize + cellSize / 2;
      ctx.fillText(`[${col}, ${row}]`, x - 10, y + 10);
    }
  }
};

const updateBall = (x: number, y: number, num: number) => {
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

  // 数値を描画
  ctx.fillStyle = "black"; // 数値の色
  ctx.font = `${cellSize / 2}px Arial`; // フォントサイズとスタイル
  ctx.textAlign = "center"; // 水平方向のテキスト位置
  ctx.textBaseline = "middle"; // 垂直方向のテキスト位置

  // 数値の位置を計算して描画
  ctx.fillText(
    String(num),
    cellSize * x + cellSize / 2,
    cellSize * y + cellSize / 2
  );
};

const balls: { x: number; y: number }[] = [];

/**
 * アニメーションのループ
 */
const animationRoutine = () => {
  drawGrid();
  balls.forEach((ball, index) => {
    let x = ball.x + (isPositiveSine ? 1 : -1);
    let y = ball.y + (isPositiveCosine ? 1 : -1);

    let isRightEnd = false;
    let isBottomEnd = false;

    let isBottomRightEmpty = true;
    let isBottomEmpty = true;
    let isBottomLeftEmpty = true;

    // ============= 端に到達した場合の処理
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
      return updateBall(x, y, index);
    }
    // 端に到達した場合の処理 End =============

    balls.forEach((b, index2) => {
      if (index === index2) return;

      // 真下に別のボールがある場合、分岐の処理を入れることになる
      if (b.x === x && b.y === y) {
        isBottomEmpty = false;
      }

      // 右下に別のボールがある場合
      if (b.x === x && b.y === (isPositiveCosine ? y - 1 : y + 1)) {
        isBottomRightEmpty = false;
      }

      // 左下に別のボールがある場合
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
    updateBall(x, y, index);
  });
  setTimeout(animationRoutine, 50);
};

animationRoutine();

/**
 * 指定時間後に関数を実行する
 */
const timeAsync = async (time: number, func: () => void): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      func();
      resolve();
    }, time);
  });
};

/**
 * ボールを落下させる
 */
const fallBall = () => {
  const x = isPositiveSine ? 0 : gridSize - 1;
  const y = isPositiveCosine ? 0 : gridSize - 1;

  balls.push({ x, y });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const angle = angleInput.value;
  canvas.style.transform = `rotate(${angle}deg)`;
  // angleInput.value = angle;
});

const main = async () => {
  let time = 200;
  canvas.style.transform = `rotate(${angleInput.value}deg)`;
  canvas.style.transition = `${time / 1000}s`;
  for (let i = 0; i < gridSize ** 2; i++) {
    await timeAsync(time, fallBall);
  }
};

main();

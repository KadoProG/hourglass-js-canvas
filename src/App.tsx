import React from "react";

const App: React.FC = () => {
  const angleInputRef = React.useRef<HTMLInputElement>(null);
  const canvas0Ref = React.useRef<HTMLCanvasElement>(null);
  const canvas1Ref = React.useRef<HTMLCanvasElement>(null);
  const formContainerRef = React.useRef<HTMLDivElement>(null);
  const canvasContainerRef = React.useRef<HTMLDivElement>(null);
  const isPositiveSineRef = React.useRef<boolean>(true);
  const isPositiveCosineRef = React.useRef<boolean>(true);
  const audioElementRef = React.useRef<HTMLAudioElement>(null);
  const audioIdRef = React.useRef<number>(0);
  const gridSizeRef = React.useRef<number>(8);
  const gridSizeElementRef = React.useRef<HTMLInputElement>(null);

  const [gridSize, setGridSize] = React.useState<number>(8);

  React.useEffect(() => {
    gridSizeRef.current = gridSize;
  }, [gridSize]);

  const ballsRef = React.useRef<{ x: number; y: number }[][]>([[], []]);

  const renderBall = (
    canvasElement: HTMLCanvasElement,
    x: number,
    y: number,
    num: number
  ) => {
    const ctx = canvasElement.getContext("2d")!;
    const cellSize = canvasElement.width / gridSizeRef.current;
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

  const removeBall = (canvasIndex: number): boolean => {
    // 真ん中のボールを削除
    const x = isPositiveSineRef.current ? gridSizeRef.current - 1 : 0;
    const y = isPositiveCosineRef.current ? gridSizeRef.current - 1 : 0;
    const index = ballsRef.current[canvasIndex].findIndex(
      (ball) => ball.x === x && ball.y === y
    );
    if (index === -1) return false;
    ballsRef.current[canvasIndex].splice(index, 1);
    return true;
  };

  const fallBallThrouthCanvas = () => {
    // canvasが横向きの場合はtanθが負になるので、その場合は処理を終了する
    if (!angleInputRef.current) return;
    if (Math.tan(Number(angleInputRef.current!.value)) < 0) return;

    // 真ん中のボールを削除
    const result = removeBall(isPositiveSineRef.current ? 0 : 1);

    if (result) {
      // ボールが正常に削除された場合は、ボールを落とす
      fallBall(isPositiveSineRef.current ? 1 : 0);
    }
  };

  const changeAngle = (angle: number, isEnabledAnimation?: boolean) => {
    angleInputRef.current!.value = String(angle);
    if (
      canvas0Ref.current &&
      canvas1Ref.current &&
      canvasContainerRef.current &&
      angleInputRef.current
    ) {
      const size =
        ((Math.sqrt(2) - 1) * canvasContainerRef.current.offsetWidth) / 2;
      canvasContainerRef.current.style.transform = `translate(${size}px, ${size}px) rotate(${angleInputRef.current.value}deg)`;
      canvasContainerRef.current.style.transition = isEnabledAnimation
        ? `0.5s`
        : `none`;

      isPositiveSineRef.current =
        Math.sin((Number(angle) * Math.PI) / 180) >= 0;
      isPositiveCosineRef.current =
        Math.cos((Number(angle) * Math.PI) / 180) >= 0;
    }
  };

  const setCanvasSize = (minCanvasSize: number) => {
    if (canvas0Ref.current && canvas1Ref.current) {
      canvas0Ref.current.width = minCanvasSize / 2;
      canvas0Ref.current.height = minCanvasSize / 2;
      canvas1Ref.current.width = minCanvasSize / 2;
      canvas1Ref.current.height = minCanvasSize / 2;
    }
  };

  const setCanvasContainerStyle = (minCanvasSize: number, angle: number) => {
    if (canvasContainerRef.current) {
      canvasContainerRef.current.style.width = `${minCanvasSize}px`;
      canvasContainerRef.current.style.height = `${minCanvasSize}px`;

      const size =
        ((Math.sqrt(2) - 1) * canvasContainerRef.current.offsetWidth) / 2;
      canvasContainerRef.current.style.transform = `translate(${size}px, ${size}px) rotate(${angle}deg)`;
    }
  };
  const drawGrid = (canvasElement: HTMLCanvasElement) => {
    const cellSize = canvasElement.width / gridSizeRef.current;
    const ctx = canvasElement.getContext("2d")!;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);

    ctx.strokeStyle = "#ddd";
    for (let i = 0; i <= gridSizeRef.current; i++) {
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
    for (let row = 0; row < gridSizeRef.current; row++) {
      for (let col = 0; col < gridSizeRef.current; col++) {
        const x = col * cellSize + cellSize / 2;
        const y = row * cellSize + cellSize / 2;
        ctx.fillText(`[${col}, ${row}]`, x, y);
      }
    }
  };

  const fallBall = (canvasIndex: number) => {
    const x = isPositiveSineRef.current ? 0 : gridSizeRef.current - 1;
    const y = isPositiveCosineRef.current ? 0 : gridSizeRef.current - 1;

    ballsRef.current[canvasIndex].push({ x, y });
  };

  const animationRoutine = (
    canvasElement: HTMLCanvasElement,
    canvasIndex: number
  ) => {
    drawGrid(canvasElement);
    ballsRef.current[canvasIndex].forEach((ball, index) => {
      let x = ball.x + (isPositiveSineRef.current ? 1 : -1);
      let y = ball.y + (isPositiveCosineRef.current ? 1 : -1);

      let isRightEnd = false;
      let isBottomEnd = false;

      let isBottomRightEmpty = true;
      let isBottomEmpty = true;
      let isBottomLeftEmpty = true;

      if (isPositiveSineRef.current && x === gridSizeRef.current) {
        x--;
        isRightEnd = true;
      } else if (!isPositiveSineRef.current && x === -1) {
        x++;
        isRightEnd = true;
      }

      if (isPositiveCosineRef.current && y === gridSizeRef.current) {
        y--;
        isBottomEnd = true;
      } else if (!isPositiveCosineRef.current && y === -1) {
        y++;
        isBottomEnd = true;
      }
      if (isRightEnd && isBottomEnd) {
        ball.x = x;
        ball.y = y;
        return renderBall(canvasElement, x, y, index);
      }

      ballsRef.current[canvasIndex].forEach((b, index2) => {
        if (index === index2) return;
        if (b.x === x && b.y === y) {
          isBottomEmpty = false;
        }
        if (
          b.x === x &&
          b.y === (isPositiveCosineRef.current ? y - 1 : y + 1)
        ) {
          isBottomRightEmpty = false;
        }
        if (b.x === (isPositiveSineRef.current ? x - 1 : x + 1) && b.y === y) {
          isBottomLeftEmpty = false;
        }
      });

      if (!isBottomEmpty) {
        if (isBottomRightEmpty) {
          isPositiveCosineRef.current ? y-- : y++;
        } else if (isBottomLeftEmpty) {
          isPositiveSineRef.current ? x-- : x++;
        } else {
          isPositiveCosineRef.current ? y-- : y++;
          isPositiveSineRef.current ? x-- : x++;
        }
      }

      ball.x = x;
      ball.y = y;
      renderBall(canvasElement, x, y, index);
    });
    setTimeout(() => animationRoutine(canvasElement, canvasIndex), 100);
  };

  const animationThrouthCanvasRoutine = () => {
    fallBallThrouthCanvas();
    setTimeout(animationThrouthCanvasRoutine, 1000);
  };

  const audioPlayButtonClick = () => {
    if (
      audioElementRef.current &&
      canvasContainerRef.current &&
      angleInputRef.current
    ) {
      if (!audioIdRef.current) {
        audioElementRef.current.play();
        audioIdRef.current = setInterval(() => {
          changeAngle(Number(angleInputRef.current!.value) + 1);
        }, 10);
      } else {
        audioElementRef.current.pause();
        clearInterval(audioIdRef.current);
        audioIdRef.current = 0;
      }
    }
  };

  React.useEffect(() => {
    const main = async () => {
      const ballLength = 30;
      const calculateMinCanvasSize = () => {
        if (formContainerRef.current) {
          return window.innerWidth <
            window.innerHeight - formContainerRef.current.offsetHeight
            ? window.innerWidth / Math.sqrt(2)
            : window.innerHeight / Math.sqrt(2) -
                formContainerRef.current.offsetHeight;
        }
        return 0;
      };

      const minCanvasSize = calculateMinCanvasSize();
      const angle = angleInputRef.current
        ? parseFloat(angleInputRef.current.value)
        : 0;

      setCanvasSize(minCanvasSize);
      setCanvasContainerStyle(minCanvasSize, angle);
      changeAngle(45);
      if (canvas0Ref.current && canvas1Ref.current) {
        drawGrid(canvas0Ref.current);
        drawGrid(canvas1Ref.current);
        animationRoutine(canvas0Ref.current, 0);
        animationRoutine(canvas1Ref.current, 1);
      }

      const time = 100;
      for (let i = 0; i < ballLength; i++) {
        setTimeout(() => fallBall(0), i * time);
      }

      setTimeout(() => {
        animationThrouthCanvasRoutine();
      }, ballLength * time + 3000);
    };

    window.addEventListener("resize", () => {
      const minCanvasSize =
        window.innerWidth < window.innerHeight
          ? window.innerWidth / Math.sqrt(2)
          : window.innerHeight / Math.sqrt(2);
      setCanvasSize(minCanvasSize);
      setCanvasContainerStyle(
        minCanvasSize,
        parseFloat(angleInputRef.current!.value)
      );
    });

    main();
  }, []);

  const angleButtonClick = (angle: number) => {
    canvasContainerRef.current!.style.transition = `0.5s`;
    changeAngle(angle, true);
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGridSize(Number(gridSizeElementRef.current!.value));
    gridSizeRef.current = Number(gridSizeElementRef.current!.value);
    const angle = Number(angleInputRef.current!.value);
    changeAngle(angle, true);
  };

  return (
    <>
      <div id="formContainer" ref={formContainerRef}>
        <div>
          <form id="form" onSubmit={submitForm}>
            <label htmlFor="gridSize">GridSize</label>
            <input
              type="number"
              defaultValue="8"
              id="gridSize"
              ref={gridSizeElementRef}
            />
            <label htmlFor="angleInput">角度</label>
            <input
              type="number"
              defaultValue="45"
              id="angleInput"
              ref={angleInputRef}
            />
            <button type="submit">送信</button>
          </form>
          {[-135, -45, 45, 135].map((angle) => (
            <button
              key={angle}
              className="button"
              onClick={() => angleButtonClick(angle)}
            >
              {angle}
            </button>
          ))}
          <button
            id="rotate"
            className="button"
            onClick={audioPlayButtonClick}
            style={{
              backgroundColor: audioIdRef.current ? "green" : "",
            }}
          >
            {audioIdRef.current ? "回転ストップ" : "回転スタート"}
          </button>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
        </div>
        <audio
          id="audioPlayer"
          controls
          style={{ display: "none" }}
          ref={audioElementRef}
        >
          <source src="/cat-mean.m4a" type="audio/mp4" />
          Your browser does not support the audio element.
        </audio>
      </div>
      <div ref={canvasContainerRef} id="canvasContainer">
        <canvas ref={canvas0Ref} id="myCanvas0" />
        <canvas ref={canvas1Ref} id="myCanvas1" />
      </div>
    </>
  );
};

export default App;

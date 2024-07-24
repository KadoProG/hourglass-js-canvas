import React from "react";
import drawGrid from "../utils/drawGrid";

const intervalBetweenFallTime = 200; // 玉を追加する間隔
const animationFrameTime = 100; // 玉が1マス進む時間（フレームレート）
const intervalBetweenFallThrouthTime = 1000; // 玉がキャンバスを通過して落下する間隔

const useCanvas = () => {
  const angleInputRef = React.useRef<HTMLInputElement>(null);
  const canvas0Ref = React.useRef<HTMLCanvasElement>(null);
  const canvas1Ref = React.useRef<HTMLCanvasElement>(null);
  const formContainerRef = React.useRef<HTMLDivElement>(null);
  const canvasContainerRef = React.useRef<HTMLDivElement>(null);
  const isPositiveSineRef = React.useRef<boolean>(true);
  const isPositiveCosineRef = React.useRef<boolean>(true);
  const audioElementRef = React.useRef<HTMLAudioElement>(null);
  const [audioId, setAudioId] = React.useState<number>(0);
  const gridSizeRef = React.useRef<number>(8);
  const gridSizeElementRef = React.useRef<HTMLInputElement>(null);
  const ballLengthInputRef = React.useRef<HTMLInputElement>(null);

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

  const removeBall = (canvasIndex?: number): boolean => {
    const x = isPositiveSineRef.current ? gridSizeRef.current - 1 : 0;
    const y = isPositiveCosineRef.current ? gridSizeRef.current - 1 : 0;

    if (canvasIndex !== undefined) {
      const index = ballsRef.current[canvasIndex].findIndex(
        (ball) => ball.x === x && ball.y === y
      );
      if (index === -1) return false;
      ballsRef.current[canvasIndex].splice(index, 1);
      return true;
    } else {
      if (ballsRef.current[0].length > 0) {
        ballsRef.current[0].pop();
        return true;
      } else if (ballsRef.current[1].length > 0) {
        ballsRef.current[1].pop();
        return true;
      } else {
        return false;
      }
    }
  };

  const fallBallThrouthCanvas = () => {
    if (!angleInputRef.current) return;
    if (Math.tan(Number(angleInputRef.current!.value)) <= 0) return;

    const result = removeBall(isPositiveSineRef.current ? 0 : 1);

    if (result) {
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

  const fallBall = (canvasIndex: number) => {
    const x = isPositiveSineRef.current ? 0 : gridSizeRef.current - 1;
    const y = isPositiveCosineRef.current ? 0 : gridSizeRef.current - 1;

    ballsRef.current[canvasIndex].push({ x, y });
  };

  const animationRoutine = (
    canvasElement: HTMLCanvasElement,
    canvasIndex: number
  ) => {
    drawGrid(canvasElement, gridSizeRef.current);
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
    setTimeout(
      () => animationRoutine(canvasElement, canvasIndex),
      animationFrameTime
    );
  };

  const animationThrouthCanvasRoutine = () => {
    fallBallThrouthCanvas();
    setTimeout(animationThrouthCanvasRoutine, intervalBetweenFallThrouthTime);
  };

  const audioPlayButtonClick = () => {
    if (
      audioElementRef.current &&
      canvasContainerRef.current &&
      angleInputRef.current
    ) {
      if (!audioId) {
        audioElementRef.current.play();
        const newAudioId = setInterval(() => {
          const angle = Number(angleInputRef.current!.value);
          const resultAngle = angle >= 180 ? -180 : angle;
          changeAngle(resultAngle + 1);
        }, 10);
        setAudioId(newAudioId);
      } else {
        audioElementRef.current.pause();
        clearInterval(audioId);
        setAudioId(0);
      }
    }
  };

  React.useEffect(() => {
    const main = async () => {
      const ballLength = Number(ballLengthInputRef.current?.value);
      if (audioElementRef.current) {
        audioElementRef.current.volume = 0.4;
      }

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
        drawGrid(canvas0Ref.current, gridSizeRef.current);
        drawGrid(canvas0Ref.current, gridSizeRef.current);
        animationRoutine(canvas0Ref.current, 0);
        animationRoutine(canvas1Ref.current, 1);
      }

      for (let i = 0; i < ballLength; i++) {
        setTimeout(() => fallBall(0), i * intervalBetweenFallTime);
      }

      setTimeout(() => {
        animationThrouthCanvasRoutine();
      }, ballLength * intervalBetweenFallTime + animationFrameTime * gridSizeRef.current);
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

    audioElementRef.current!.addEventListener("ended", () => {
      audioElementRef.current!.currentTime = 0;
      audioElementRef.current!.play();
    });

    main();
  }, []);

  const angleButtonClick = (angle: number) => {
    canvasContainerRef.current!.style.transition = `0.5s`;
    changeAngle(angle, true);
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    gridSizeRef.current = Number(gridSizeElementRef.current!.value);
    const angle = Number(angleInputRef.current!.value);
    changeAngle(angle, true);

    if (gridSizeRef.current ** 2 < Number(ballLengthInputRef.current!.value)) {
      ballLengthInputRef.current!.value = String(gridSizeRef.current ** 2);
    }
    const ballLength = Number(ballLengthInputRef.current!.value);

    const preBallLength =
      ballsRef.current[0].length + ballsRef.current[1].length;

    if (preBallLength !== ballLength) {
      for (let i = preBallLength; i < ballLength; i++) {
        setTimeout(
          () => fallBall(0),
          (i - preBallLength) * intervalBetweenFallTime
        );
      }
      for (let i = preBallLength - 1; i >= ballLength; i--) {
        removeBall();
      }
    }
  };

  return {
    angleInputRef,
    canvasContainerRef,
    audioPlayButtonClick,
    audioId,
    formContainerRef,
    gridSizeElementRef,
    angleButtonClick,
    submitForm,
    canvas0Ref,
    canvas1Ref,
    audioElementRef,
    ballLengthInputRef,
  };
};

export default useCanvas;

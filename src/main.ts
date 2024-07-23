import "./style.scss";
import {
  animationRoutine,
  animationThrouthCanvasRoutine,
  changeAngle,
} from "./animation";
import { settingCanvasInit } from "./canvas";
import { fallBall } from "./ball";

export const canvasElements: HTMLCanvasElement[] = [
  document.getElementById("myCanvas0") as HTMLCanvasElement,
  document.getElementById("myCanvas1") as HTMLCanvasElement,
];

export const formContainerElement = document.getElementById(
  "formContainer"
) as HTMLDivElement;

export const canvasContainerElement = document.getElementById(
  "canvasContainer"
) as HTMLDivElement;

export const angleInput = document.getElementById(
  "angleInput"
) as HTMLInputElement;
const form = document.getElementById("form") as HTMLFormElement;
const rotateButtonElement = document.getElementById(
  "rotate"
) as HTMLButtonElement;
const audioPlayer = document.getElementById("audioPlayer") as HTMLAudioElement;

/**
 * 回転ループアニメーションのIntervalID
 */
let intervalId: number;

audioPlayer.volume = 0.5;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const angle = Number(angleInput.value);
  changeAngle(angle, true);
});

["change_1", "change_2", "change_3", "change_4"].forEach((id, idx) => {
  const button = document.getElementById(id) as HTMLButtonElement;
  button.addEventListener("click", () => {
    canvasContainerElement.style.transition = `0.5s`;
    changeAngle([-135, -45, 45, 135][idx], true);
  });
});

rotateButtonElement.addEventListener("click", () => {
  if (!intervalId) {
    audioPlayer.play();
    rotateButtonElement.style.backgroundColor = "green";
    rotateButtonElement.textContent = "回転ストップ";
    intervalId = setInterval(() => {
      canvasContainerElement.style.transition = `none`;
      changeAngle(Number(angleInput.value) + 1);
    }, 10);
  } else {
    audioPlayer.pause();
    rotateButtonElement.style.backgroundColor = "";
    rotateButtonElement.textContent = "回転スタート";
    clearInterval(intervalId);
    intervalId = 0;
  }
});

audioPlayer.addEventListener("ended", () => {
  audioPlayer.currentTime = 0;
  audioPlayer.play();
});

// 画面がリサイズされたときの処理
window.addEventListener("resize", settingCanvasInit);

const main = async () => {
  const time = 1; // ボール挿入の間隔
  const ballLength = 60; // ボールの数

  // 設定関連の初期化
  changeAngle(45);
  settingCanvasInit();

  // アニメーションループの開始
  animationRoutine(canvasElements[0], 0);
  animationRoutine(canvasElements[1], 1);

  for (let i = 0; i < ballLength; i++) {
    setTimeout(() => fallBall(0), i * time);
  }
  setTimeout(() => {
    animationThrouthCanvasRoutine();
  }, ballLength * time + 3000);
};

main();

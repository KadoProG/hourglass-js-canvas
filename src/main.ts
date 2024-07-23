import "./style.scss";
import { animationRoutine, fallBall, changeSystemSetting } from "./animation";

const canvasElements: HTMLCanvasElement[] = [
  document.getElementById("myCanvas0") as HTMLCanvasElement,
  document.getElementById("myCanvas1") as HTMLCanvasElement,
];

const canvasContainerElement = document.getElementById(
  "canvasContainer"
) as HTMLDivElement;

const angleInput = document.getElementById("angleInput") as HTMLInputElement;
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
  changeSystemSetting(canvasContainerElement, angle);
});

["change_1", "change_2", "change_3", "change_4"].forEach((id, idx) => {
  const button = document.getElementById(id) as HTMLButtonElement;
  button.addEventListener("click", () => {
    canvasContainerElement.style.transition = `0.5s`;
    changeSystemSetting(canvasContainerElement, [-135, -45, 45, 135][idx]);
  });
});

rotateButtonElement.addEventListener("click", () => {
  if (!intervalId) {
    audioPlayer.play();
    rotateButtonElement.style.backgroundColor = "green";
    rotateButtonElement.textContent = "回転ストップ";
    intervalId = setInterval(() => {
      canvasContainerElement.style.transition = `none`;
      changeSystemSetting(canvasContainerElement, Number(angleInput.value) + 1);
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

const main = async () => {
  const time = 200; // ボール挿入の間隔
  // 角度の初期化
  changeSystemSetting(canvasContainerElement, 45);

  setTimeout(() => {
    canvasContainerElement.style.transition = `0.5s`;
  }, 0);

  // アニメーションループの開始
  animationRoutine(canvasElements[0], 0);
  animationRoutine(canvasElements[1], 1);

  for (let i = 0; i < 32; i++) {
    await fallBall(time, 0);
  }
  for (let i = 0; i < 16; i++) {
    await fallBall(time, 1);
  }
};

main();

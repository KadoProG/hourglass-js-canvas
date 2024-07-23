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
const rotate = document.getElementById("rotate") as HTMLButtonElement;
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
    changeSystemSetting(canvasContainerElement, [-135, -45, 45, 135][idx]);
  });
});

rotate.addEventListener("click", () => {
  if (!intervalId) {
    audioPlayer.play();
    intervalId = setInterval(() => {
      changeSystemSetting(canvasContainerElement, Number(angleInput.value) + 1);
    }, 10);
  } else {
    audioPlayer.pause();
    clearInterval(intervalId);
    intervalId = 0;
  }
});

audioPlayer.addEventListener("ended", () => {
  audioPlayer.currentTime = 0;
  audioPlayer.play();
});

const main = async () => {
  let time = 200;
  const size = (Math.sqrt(2) - 1) * canvasElements[0].width;
  canvasContainerElement.style.transform = `translate(${size}px, ${size}px) rotate(${angleInput.value}deg)`;

  setTimeout(() => {
    canvasContainerElement.style.transition = `0.5s`;
  }, 0);

  // アニメーションループの開始
  animationRoutine(canvasElements[0], 0);
  animationRoutine(canvasElements[1], 1);
  for (let i = 0; i < 32; i++) {
    await fallBall(time, 0);
  }
};

main();

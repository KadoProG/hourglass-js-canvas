import { animationRoutine, fallBall, changeSystemSetting } from "./animation";

const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const angleInput = document.getElementById("angleInput") as HTMLInputElement;
const form = document.getElementById("form") as HTMLFormElement;
const rotate = document.getElementById("rotate") as HTMLButtonElement;
const audioPlayer = document.getElementById("audioPlayer") as HTMLAudioElement;

let intervalId: number;

audioPlayer.volume = 0.5;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const angle = Number(angleInput.value);
  changeSystemSetting(angle);
});

["change_1", "change_2", "change_3", "change_4"].forEach((id, idx) => {
  const button = document.getElementById(id) as HTMLButtonElement;
  button.addEventListener("click", () => {
    changeSystemSetting([-135, -45, 45, 135][idx]);
  });
});

rotate.addEventListener("click", () => {
  if (!intervalId) {
    audioPlayer.play();
    intervalId = setInterval(() => {
      changeSystemSetting(Number(angleInput.value) + 1);
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
  canvas.style.transform = `rotate(${angleInput.value}deg)`;
  canvas.style.transition = `${time / 1000}s`;
  for (let i = 0; i < 32; i++) {
    await fallBall(time);
  }
};

main();
animationRoutine();

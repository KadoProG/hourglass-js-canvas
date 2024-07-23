import { angleInput, canvasContainerElement, canvasElements } from "./main";

export const settingCanvasInit = () => {
  const minCanvasSize =
    window.innerWidth < window.innerHeight
      ? window.innerWidth / Math.sqrt(2)
      : window.innerHeight / Math.sqrt(2);

  canvasElements.forEach((canvasElement) => {
    canvasElement.width = minCanvasSize / 2;
    canvasElement.height = minCanvasSize / 2;
  });

  canvasContainerElement.style.width = `${minCanvasSize}px`;
  canvasContainerElement.style.height = `${minCanvasSize}px`;

  const size = ((Math.sqrt(2) - 1) * canvasContainerElement.offsetWidth) / 2;
  canvasContainerElement.style.transform = `translate(${size}px, ${size}px) rotate(${angleInput.value}deg)`;
};

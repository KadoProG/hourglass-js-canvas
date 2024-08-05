import React from "react";

interface ControlButtonsProps {
  angleButtonClick: (angle: number) => void;
  audioPlayButtonClick: () => void;
  audioId: number;
  audioElementRef: React.RefObject<HTMLAudioElement>;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
  angleButtonClick,
  audioPlayButtonClick,
  audioId,
  audioElementRef,
}) => {
  return (
    <div>
      {[-135, -45, 45, 135].map((angle, index) => (
        <button
          key={angle}
          className={`button${index % 2 === 0 ? " primary" : ""}`}
          onClick={() => angleButtonClick(angle)}
        >
          {angle}
        </button>
      ))}
      <button
        id="rotate"
        className="button"
        onClick={audioPlayButtonClick}
        style={{ backgroundColor: audioId ? "green" : "" }}
      >
        {audioId ? "回転ストップ" : "回転スタート"}
      </button>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
      <audio controls style={{ display: "none" }} ref={audioElementRef}>
        <source src="/cat-mean.m4a" type="audio/mp4" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default ControlButtons;

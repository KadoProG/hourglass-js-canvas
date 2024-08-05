import React, { RefObject } from "react";

interface CanvasContainerProps {
  canvasContainerRef: RefObject<HTMLDivElement>;
  canvas0Ref: RefObject<HTMLCanvasElement>;
  canvas1Ref: RefObject<HTMLCanvasElement>;
}

const CanvasContainer: React.FC<CanvasContainerProps> = ({
  canvasContainerRef,
  canvas0Ref,
  canvas1Ref,
}) => {
  return (
    <div ref={canvasContainerRef} id="canvasContainer">
      <canvas id="myCanvas0" ref={canvas0Ref} />
      <canvas id="myCanvas1" ref={canvas1Ref} />
    </div>
  );
};

export default CanvasContainer;

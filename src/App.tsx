import React from "react";
import useCanvas from "./hooks/useCanvas";
import AngleForm from "./components/AngleForm";
import ControlButtons from "./components/ControlButtons";
import CanvasContainer from "./components/CanvasContainer";

const App: React.FC = () => {
  const {
    angleInputRef,
    canvasContainerRef,
    audioPlayButtonClick,
    audioElementRef,
    audioId,
    formContainerRef,
    gridSizeElementRef,
    angleButtonClick,
    submitForm,
    canvas0Ref,
    canvas1Ref,
  } = useCanvas();

  return (
    <>
      <div id="formContainer" ref={formContainerRef}>
        <AngleForm
          angleInputRef={angleInputRef}
          gridSizeElementRef={gridSizeElementRef}
          submitForm={submitForm}
        />
        <ControlButtons
          angleButtonClick={angleButtonClick}
          audioPlayButtonClick={audioPlayButtonClick}
          audioId={audioId}
          audioElementRef={audioElementRef}
        />
      </div>
      <CanvasContainer
        canvasContainerRef={canvasContainerRef}
        canvas0Ref={canvas0Ref}
        canvas1Ref={canvas1Ref}
      />
    </>
  );
};

export default App;

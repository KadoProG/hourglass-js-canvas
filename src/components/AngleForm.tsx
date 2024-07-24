import React, { RefObject, FormEvent } from "react";

interface AngleFormProps {
  angleInputRef: RefObject<HTMLInputElement>;
  gridSizeElementRef: RefObject<HTMLInputElement>;
  submitForm: (e: FormEvent<HTMLFormElement>) => void;
}

const AngleForm: React.FC<AngleFormProps> = ({
  angleInputRef,
  gridSizeElementRef,
  submitForm,
}) => {
  return (
    <form id="form" onSubmit={submitForm}>
      <div>
        <label htmlFor="gridSize">GridSize</label>
        <input
          type="number"
          defaultValue="8"
          id="gridSize"
          ref={gridSizeElementRef}
        />
      </div>
      <div>
        <label htmlFor="angleInput">角度</label>
        <input
          type="number"
          defaultValue="45"
          id="angleInput"
          ref={angleInputRef}
        />
      </div>
      <button type="submit">送信</button>
    </form>
  );
};

export default AngleForm;

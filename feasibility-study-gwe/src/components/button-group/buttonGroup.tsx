import React, { FC } from "react";

type ButtonGroupProps = {
  handleCancel: () => void;
  cancelIsDisabled: boolean;
  deleteIsDisabled: boolean;
  handleDataIsDisabled: boolean;
  handleData: () => void;
  handleDataBtnText: string;
};

const ButtonGroup: FC<ButtonGroupProps> = ({
  handleCancel,
  cancelIsDisabled,
  deleteIsDisabled,
  handleDataIsDisabled,
  handleData,
  handleDataBtnText,
}) => {
  return (
    <div className="d-flex flex-wrap justify-content-end mb-3">
      <button
        type="button"
        className="btn btn-light mb-2"
        onClick={handleCancel}
        disabled={cancelIsDisabled}
      >
        Скасувати
      </button>
      <button
        type="button"
        className="btn btn-danger ms-2 mb-2"
        disabled={deleteIsDisabled}
        data-bs-toggle="modal"
        data-bs-target="#deleteModal"
      >
        Видалити дані
      </button>
      <button
        type="button"
        className="btn btn-primary ms-2 mb-2"
        onClick={handleData}
        disabled={handleDataIsDisabled}
      >
        {handleDataBtnText}
      </button>
    </div>
  );
};

export default ButtonGroup;

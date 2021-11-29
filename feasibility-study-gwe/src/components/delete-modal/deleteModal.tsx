import React, { FC } from "react";

type DeleteModal = {
  handleDeleteData: () => void;
};

const DeleteModal: FC<DeleteModal> = ({ handleDeleteData }) => {
  return (
    <div
      className="modal fade"
      id="deleteModal"
      tabIndex={-1}
      aria-labelledby="modalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalLabel">
              Видалення
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">Видалити данні?</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Ні
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDeleteData}
              data-bs-dismiss="modal"
            >
              Так
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

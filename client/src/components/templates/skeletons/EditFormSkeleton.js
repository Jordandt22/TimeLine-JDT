import React from "react";

function EditFormSkeleton() {
  return (
    <div className="container create-form-container form-skeleton">
      <div className="form-skeleton__title"></div>
      <div className="form-skeleton__input"></div>
      <div className="form-skeleton__textarea"></div>
      <div className="form-skeleton__status row">
        <div className="form-skeleton__button"></div>
        <div className="form-skeleton__button"></div>
        <div className="form-skeleton__button"></div>
      </div>

      <div className="row">
        <div className="form-skeleton__submit"></div>
        <div className="form-skeleton__cancel"></div>
      </div>
    </div>
  );
}

export default EditFormSkeleton;

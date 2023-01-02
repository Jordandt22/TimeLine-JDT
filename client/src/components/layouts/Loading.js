import React from "react";
import { useGlobal } from "../../context/UI/global/global.context";

function Loading() {
  const {
    _loading: { loading },
  } = useGlobal();

  return (
    <>
      {loading.show && (
        <div className="loading center">
          <p>{loading?.message}</p>
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </>
  );
}

export default Loading;

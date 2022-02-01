import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";

export default function Modal({
  show,
  onClose,
  children,
  title,
}: {
  show: boolean;
  onClose: any;
  children: React.ReactNode;
  title?: string;
}) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => setIsBrowser(true), []);

  const handleClose = (e: any) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div
      className="h-screen w-screen bg-zinc-900/80 absolute 
      top-0 left-0 flex flex-col items-center">
      <div className="w-1/2 bg-white rounded-md my-12">
        <div className="">
          <a href="#" onClick={handleClose}>
            <FaTimes />
          </a>
        </div>
        {title && <div>{title}</div>}
        <div className="">{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("__next") as HTMLElement
    );
  } else {
    return null;
  }
}

// https://devrecipes.net/modal-component-with-next-js/

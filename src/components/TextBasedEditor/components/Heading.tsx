/* eslint-disable jsx-a11y/heading-has-content */
import React from "react";

interface Props {
  id: string;
  onEnter?: (id: string) => void;
  onBackspace?: (id: string) => void;
  onArrowDown?: (id: string) => void;
  onArrowUp?: (id: string) => void;
}

const FormTitle = (props: Props, ref: any) => {
  const { id, onEnter, onBackspace, onArrowDown, onArrowUp } = props;

  const isContent = () => {
    const text = document.getElementById(id)?.innerText;
    if (text === "") return false;

    return true;
  };

  const handleKeyDown = (e: any) => {
    switch (e.key) {
      case "ArrowDown":
        onArrowDown && onArrowDown(id);
        return;
      case "ArrowUp":
        onArrowUp && onArrowUp(id);
        return;
      case "Enter":
        onEnter && onEnter(id);
        return;
      case "Backspace":
        onBackspace && !isContent() && onBackspace(id);
        return
    }
  };

  return (
    <h1
      id={id}
      ref={ref}
      data-placeholder="Heading"
      className="heading"
      onKeyDown={handleKeyDown}
      contentEditable
    ></h1>
  );
};

export default React.forwardRef(FormTitle);

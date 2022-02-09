/* eslint-disable jsx-a11y/heading-has-content */
import React from "react";

interface Props {
  id: string;
  onEnter?: (id: string) => void;
  onBackspace?: (id: string) => void;
  onArrowDown?: (id: string) => void;
  onArrowUp?: (id: string) => void;
}

const Option = (props: Props, ref: any) => {
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
        return;
    }
  };

  return (
    <div>
      <h3
        id={id}
        ref={ref}
        data-placeholder="Options"
        className="heading"
        onKeyDown={handleKeyDown}
        contentEditable
      ></h3>
      <option value="option1">Opt1</option>
      <option value="option1">Opt2</option>
      <option value="option1">Opt3</option>
    </div>
  );
};

export default React.forwardRef(Option);

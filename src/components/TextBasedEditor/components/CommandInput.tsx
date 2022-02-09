import React, { useState, forwardRef } from "react";

type Role = "headline" | "textinput" | "option" | "input" | "title" | "submit";

interface Props {
  id: string;
  onCommand?: (id: string, role: Role) => void;
  onEnter?: (id: string) => void;
  onBackspace?: (id: string) => void;
  onArrowDown?: (id: string) => void;
  onArrowUp?: (id: string) => void;
}

const Input = (props: Props, ref: any) => {
  const [value, setValue] = useState<string>("");
  const { id, onArrowDown, onArrowUp, onBackspace, onEnter, onCommand } = props;

  const handleChange = (e: any) => {
    setValue(e.target.value);
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
        if (value[0] === "/")
          onCommand && onCommand(id, value.replace("/", "") as Role);
        else onEnter && onEnter(id);
        return;
      case "Backspace":
        onBackspace && value === "" && onBackspace(id);
        return;
    }
  };

  return (
    <input
      id={id}
      ref={ref}
      type="text"
      autoFocus
      placeholder="Type / to insert blocks"
      className="smart-input"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
};

export default forwardRef(Input);

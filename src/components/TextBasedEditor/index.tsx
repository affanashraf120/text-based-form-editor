/* eslint-disable jsx-a11y/heading-has-content */
import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CommandInput from "./components/CommandInput";
import FormTitle from "./components/FormTitle";
import Heading from "./components/Heading";
import TextInput from "./components/TextInput";
import Option from "./components/Option";

import "./styles.scss";

type Role = "headline" | "textinput" | "option" | "input" | "title" | "submit";

interface Element {
  id: string;
  role: Role;
  value: "";
}

const TextBasedEditor = () => {
  const refs = useRef<any>([]);
  refs.current = [];
  const [elements, setElements] = useState<Element[]>([
    {
      id: uuidv4(),
      role: "title",
      value: "",
    },
    {
      id: uuidv4(),
      role: "input",
      value: "",
    },
  ]);

  const addToRefs = (el: any) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };

  const handleSubmit = (data: any) => {
    console.log(data);
  };

  const handleCommand = (id: string, role: Role) => {
    setElements((prev) =>
      prev.map((e) => {
        if (e.id === id) {
          return {
            ...e,
            role: role,
          };
        }
        return e;
      })
    );
  };

  const insertAt = (arr: any[], index: number, newItem: any) => [
    // part of the array before the specified index
    ...arr.slice(0, index),
    // inserted item
    newItem,
    // part of the array after the specified index
    ...arr.slice(index),
  ];

  const addElement = (id: string, role?: Role) => {
    const index = elements.findIndex((e) => e.id === id) + 1;
    console.log("index", index);
    if (index === 0) {
      setElements((prev) => [
        {
          id: uuidv4(),
          role: role || "input",
          value: "",
        },
        ...prev,
      ]);
    } else if (index > elements.length - 1) {
      setElements((prev) => [
        ...prev,
        {
          id: uuidv4(),
          role: role || "input",
          value: "",
        },
      ]);
    } else if (index > 0) {
      setElements((prev) => [
        ...insertAt(prev, index, {
          id: uuidv4(),
          role: role || "input",
          value: "",
        }),
      ]);
    }
  };

  const removeElement = (id: string) => {
    const [next, pre] = getNodes(id);
    setElements((prev) => prev.filter((e) => e.id !== id));
    pre && pre.focus();
  };

  const getNodes = (id: string): any[] => {
    let pre, next;
    refs.current.forEach((el: any, index: number) => {
      if (id === el.id) {
        pre = refs.current[index - 1];
        next = refs.current[index + 1];
      }
    });

    return [next, pre];
  };

  const focusNext = (id: string) => {
    const index = elements.findIndex((e) => e.id === id);
    if (index === 0) {
      if (elements[index + 1]) refs.current[index + 1].focus();
    } else if (index === elements.length - 1) {
      return;
    } else if (index > 0) {
      refs.current[index + 1].focus();
    } else {
      return;
    }
  };
  const focusPre = (id: string) => {
    const index = elements.findIndex((e) => e.id === id);
    if (index === 0) {
      return;
    } else if (index === elements.length - 1) {
      refs.current[index - 1].focus();
    } else if (index > 0) {
      refs.current[index - 1].focus();
    } else {
      return;
    }
  };

  const handleEnter = (id: string) => {
    console.log("enter");
    addElement(id);
  };

  const handleBackspace = (id: string) => {
    console.log("backspace");
    removeElement(id);
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        {elements.map((e) => {
          switch (e.role) {
            case "title":
              return (
                <FormTitle
                  id={e.id}
                  key={e.id}
                  ref={addToRefs}
                  onArrowDown={focusNext}
                  onEnter={handleEnter}
                />
              );
            case "headline":
              return (
                <Heading
                  id={e.id}
                  key={e.id}
                  ref={addToRefs}
                  onArrowUp={focusPre}
                  onArrowDown={focusNext}
                  onEnter={handleEnter}
                  onBackspace={handleBackspace}
                />
              );
            case "input":
              return (
                <CommandInput
                  id={e.id}
                  key={e.id}
                  ref={addToRefs}
                  onCommand={handleCommand}
                  onArrowUp={focusPre}
                  onArrowDown={focusNext}
                  onEnter={handleEnter}
                  onBackspace={handleBackspace}
                />
              );
            case "option":
              return (
                <Option
                  id={e.id}
                  key={e.id}
                  ref={addToRefs}
                  onArrowUp={focusPre}
                  onArrowDown={focusNext}
                  onEnter={handleEnter}
                  onBackspace={handleBackspace}
                />
              );
            case "textinput":
              return (
                <TextInput
                  id={e.id}
                  key={e.id}
                  ref={addToRefs}
                  onArrowUp={focusPre}
                  onArrowDown={focusNext}
                  onEnter={handleEnter}
                  onBackspace={handleBackspace}
                />
              );
            default:
              return null;
          }
        })}
      </form>
    </div>
  );
};

export default TextBasedEditor;

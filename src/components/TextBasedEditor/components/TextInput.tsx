import React from 'react'

interface Props {
    id: string,
    onEnter?: (id: string) => void;
    onBackspace?: (id: string) => void;
    onArrowDown?: (id: string) => void;
    onArrowUp?: (id: string) => void;
}

const TextInput = (props: Props, ref: any) => {
    const { id, onArrowDown, onArrowUp, onBackspace, onEnter } = props

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
        <input
            id={id}
            ref={ref}
            autoFocus
            type="text"
            placeholder="Input"
            className='textinput'
            onKeyDown={handleKeyDown}
        />
    )
}

export default React.forwardRef(TextInput)
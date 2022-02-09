import React from 'react';

interface Props {
    id: string,
    onEnter?: (id: string) => void,
    onArrowDown?: (id: string) => void,
}

const FormTitle = (props: Props, ref: any) => {
    const { id, onEnter, onArrowDown } = props

    const handleKeyDown = (e: any) => {
        switch (e.key) {
            case 'ArrowDown':
                onArrowDown && onArrowDown(id)
                return
            case 'Enter':
                onEnter && onEnter(id)
        }
    }

    return <div
        id={id}
        ref={ref}
        data-placeholder="Form Title"
        className='title'
        onKeyDown={handleKeyDown}
        contentEditable
    ></div>
};

export default React.forwardRef(FormTitle);

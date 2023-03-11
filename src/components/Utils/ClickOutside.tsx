import {FC, forwardRef, Fragment, useEffect, useRef} from "react";

const useClickOutside = (ref: any, onClickOutside: () => void) => {
    const handleClick = (e: any) => {
        if (ref.current && !ref.current.contains(e.target)) {
            onClickOutside();
        }
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClick);
        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    });
}

interface ClickOutsideInterface {
    onClickOutside: () => void;
    children: any;
}

const ClickOutside = forwardRef((props: ClickOutsideInterface, ref) => {
    const { onClickOutside, children } = props;
    useClickOutside(ref, onClickOutside);
    return children;
});

export default ClickOutside;

import {FC, useEffect, useState} from "react";
import Input from "../Input/Input";
import ColorPicker from "./ColorPicker";

const BoxShadowEditor: FC<{
    onChange: (boxShadow: string) => void;
    defaultValue?: string;
}> = ({ onChange, defaultValue }) => {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [blur, setBlur] = useState(0);
    const [spread, setSpread] = useState(0);
    const [color, setColor] = useState('#000000');
    const deparseBoxShadow = (boxShadow: string) => {
        const [x, y, blur, spread, color] = boxShadow.split(' ');
        setX(parseInt(x));
        setY(parseInt(y));
        setBlur(parseInt(blur));
        setSpread(parseInt(spread));
        setColor(color);
    }
    useEffect(
        () => {
            if (defaultValue) {
                deparseBoxShadow(defaultValue);
            }
        },
        [defaultValue]
    )
    useEffect(
        () => {
            if (x === 0 && y === 0 && blur === 0 && spread === 0) {
                return;
            }
            const boxShadow = `${x}px ${y}px ${blur}px ${spread}px ${color}`;
            onChange(boxShadow);
        },
        [x, y, blur, spread, color]
    )
    return (
        <div className="flex flex-col">
            <p className="text-xs p-2 border-y font-bold">Drop shadow</p>
            <div className="flex flex-col space-y-2 p-2">
                <div className="flex space-x-2">
                    <div className="flex-1">
                        <Input onChange={setX} label="X" />
                    </div>
                    <div className="flex-1">
                        <Input onChange={setY} label="Y" />
                    </div>
                </div>
                <div className="flex space-x-2">
                    <div className="flex-1">
                        <Input onChange={setBlur} label="Blur" />
                    </div>
                    <div className="flex-1">
                        <Input onChange={setSpread} label="Spread" />
                    </div>
                </div>
                <div>
                    <ColorPicker onChange={setColor} />
                </div>
            </div>
        </div>
    )
}

export default BoxShadowEditor;

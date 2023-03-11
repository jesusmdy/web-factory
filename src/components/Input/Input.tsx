import {Dispatch, FC, SetStateAction, useRef, useState} from "react";
import classNames from "classnames";

const Input: FC<{
    onChange: Dispatch<SetStateAction<number>>;
    label: string;
    value?: string;
    className?: string;
}> = ({ onChange, label, value, className }) => {
    const [active, setActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(Number(e.target.value));
    };
    const onClick = () => {
        inputRef.current?.focus();
    }
    return (
        <div
            className={
                classNames(
                    'flex items-center border rounded text-xs cursor-pointer w-full',
                    className,
                    {
                        'border-blue-400': active,
                    }
                )
            }
            onClick={onClick}
        >
            <p className="p-2">{label}</p>
            <input
                ref={inputRef}
                type="string"
                className="w-full bg-transparent outline-none"
                onChange={handleChange}
                onBlur={() => setActive(!active)}
                onFocus={() => setActive(!active)}
            />
        </div>
    );
};

export default Input;

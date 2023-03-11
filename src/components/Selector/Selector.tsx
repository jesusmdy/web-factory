import {FC, Key, useState} from "react";
import {Option} from "../../types/prop";
import {CheckCircleIcon} from "@heroicons/react/20/solid";
import { Item, Picker, Section } from "@adobe/react-spectrum";

const Selector: FC<{
    options: Option[];
    label?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
}> = ({ options, label, onChange, defaultValue }) => {

    const handleChange = (key: Key) => {
        if (onChange) {
            onChange(key as string);
        }
    };
    return (
        <Picker
            label={label}
            onSelectionChange={handleChange}
            width="100%"
            defaultSelectedKey={defaultValue}
        >
            {
                options.map(
                    (option) => (
                        <Item key={option.value}>{option.label}</Item>
                    )
                )
            }
        </Picker>
    );
};

export default Selector;

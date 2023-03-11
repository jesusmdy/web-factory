import {
    ChangeEvent,
    FC,
    useEffect,
    useMemo,
    useState
} from "react";
import {PrimitiveElement} from "../../types";
import {elementsStore} from "../../store";
import {Option, PropType} from "../../types/prop";
import _ from "lodash";
import ColorPicker from "./ColorPicker";
import Selector from "../Selector/Selector";
import classNames from "classnames";
import {toNumber} from "../../utils/parser";
import { ChainedController } from "../../hooks/useChainedController";
import { NumberField, TextField, ToggleButton } from "@adobe/react-spectrum";
import Link from "@spectrum-icons/workflow/Link";

const useRenderInput = (
    prop: PropType,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
) => {
    const [value, setValue] = useState<string | number | null>(null);

    useEffect(
        () => {
            if (prop.defaultValue && !value) {
                if (prop.type === 'number' || prop.type === 'number-alt') {
                    setValue(
                        toNumber(prop.defaultValue as string)
                    );
                } else {
                    setValue(prop.defaultValue as string);
                }
            }
        },
        [prop]
    )
    useEffect(
        () => {
            if (value) {
                onChange({
                    target: {
                        value,
                    }
                } as ChangeEvent<HTMLInputElement>)
            }
        },
        [value],
    )
    const createChange = (value: string) => {
        onChange({
            target: {
                value,
            }
        } as ChangeEvent<HTMLInputElement>)
    }
    switch (prop.type) {
        case 'number':
            return (
                <NumberField
                    label={prop.name}
                    value={value as number | undefined}
                    onChange={setValue}
                    defaultValue={prop.defaultValue as number}
                    width="100%"
                />
            );
        case 'color':
            return (
                <ColorPicker
                    onChange={createChange}
                    defaultValue={prop.defaultValue as string}
                    label={prop.name}
                />
            )
        case 'number-alt':
            return (
                <NumberField
                    label={prop.name}
                    value={value as number | undefined}
                    onChange={setValue}
                    defaultValue={prop.defaultValue as number}
                    width="100%"
                    isQuiet
                />
            )
        case 'select':
            return (
                <Selector
                    options={prop.options as Option[]}
                    label={prop.name}
                    onChange={createChange}
                    defaultValue={prop.defaultValue as string}
                />
            )
        default:
            return (
                <TextField
                    label={prop.name}
                    value={value as string}
                    onChange={setValue}
                    defaultValue={prop.defaultValue as string}
                    width="100%"
                />
            )
    }
}

const Prop: FC<{
    prop: PropType;
    element: PrimitiveElement;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}> = ({prop, element, handleChange}) => {
    return useRenderInput(prop, handleChange);
}

const ChainedButton: FC<{
    controller?: ChainedController;
    prop: PropType;
    element: PrimitiveElement;
}> = ({ controller, prop, element }) => {
    const isPropChained = useMemo(
        () => controller?.isChained(prop.key),
        [controller],
    );
    if (!controller) return null;
    const handleClick = () => {
        controller.toggle(prop.key);
    }
    return (
        <ToggleButton
            isSelected={isPropChained}
            onChange={handleClick}
        >
            <Link />
        </ToggleButton>
    )
};

export const PropEditor: FC<{
    prop: PropType;
    element: PrimitiveElement;
    asProp?: boolean;
    asColumn?: boolean;
    chainedController?: ChainedController;
    hideLabel?: boolean;
}> = ({element, prop, asProp, asColumn, chainedController, hideLabel}) => {
    const [suffix, setSuffix] = useState<string>('');
    const updateElement = elementsStore(state => state.updateElement);
    const isMultipleSuffix = typeof prop.suffix === 'object';
    useEffect(
        () => {
            if (isMultipleSuffix && prop.suffix) {
                setSuffix(prop.suffix[0]);
            } else {
                setSuffix(prop.suffix as string);
            }
        },
        [prop.suffix]
    );
    const prepareUpdatedElement = (
        key: string,
        value: string | number,
    ) => {
        if (asProp) {
            return {
                ...element,
                props: {
                    ...element.props,
                    [key]: value,
                }
            }
        }
        return {
            ...element,
            props: {
                ...element.props,
                style: {
                    ...element.props.style,
                    [key]: value,
                }
            }
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value + (suffix || '');
        const updatedElement = prepareUpdatedElement(prop.key, value);
        if (
            chainedController
            && chainedController.isChained(prop.key)
        ) {
            return chainedController.updateChain(value);
        } else {
            return updateElement(updatedElement);
        }
    }
    return (
        <div
            className={
                classNames(
                    'flex gap-2 items-end',
                    {
                        'flex-col w-full text-left': asColumn,
                    }
                )
            }
        >
            <ChainedButton
                controller={chainedController}
                prop={prop}
                element={element}
            />
            <div className="flex-1 flex w-full">
                <Prop
                    prop={prop}
                    element={element}
                    handleChange={handleChange}
                />
            </div>
        </div>
    );
};

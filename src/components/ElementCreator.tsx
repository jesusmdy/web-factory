import {FC} from 'react';
import {editorStore, elementsStore} from "../store";
import {ElementCreatorPreset} from "../types";
import {generateElement} from "../utils/element";
import classNames from "classnames";
import {getElementIcon} from "../utils/icon";
import { ActionButton, Tooltip, TooltipTrigger } from '@adobe/react-spectrum';

const ElementCreator: FC<{
    preset: ElementCreatorPreset;
}> = ({ preset }) => {
    const setElementId = editorStore(state => state.setElement);
    const selectedElement = editorStore(state => state.element);
    const addElement = elementsStore(state => state.addElement);
    const onClick = () => {
        const elements = generateElement(
            preset,
            selectedElement || undefined,
        );
        elements.forEach((element) =>  addElement(element));
        setElementId(elements[0].id);
    };
    return (
        <TooltipTrigger placement="bottom end" delay={0}>
            <ActionButton
                onPress={onClick}
                isDisabled={preset.disabled}
                isQuiet
            >
                {
                    getElementIcon(preset.type)
                }
            </ActionButton>
            <Tooltip>{preset.label}</Tooltip>
        </TooltipTrigger>
    );
};

export default ElementCreator;

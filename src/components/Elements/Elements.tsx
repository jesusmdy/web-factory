import {FC, useMemo} from "react";
import {ElementCreatorPreset, PrimitiveElement} from "../../types";
import {ElementCreator} from "../index";
import {editorStore, elementsStore} from "../../store";
import _ from "lodash";
import {hierarchyValidator} from "../../utils/element";

const Elements: FC = () => {
    const selectedElementId = editorStore(state => state.element);
    const elements = elementsStore(state => state.elements);
    const currentElement = useMemo(
        () => _.find(elements, {id: selectedElementId}) as PrimitiveElement,
        [selectedElementId, elements]
    )

    const validatorBind = (blacklist: string[]) => currentElement && hierarchyValidator(blacklist, currentElement.type);
    const buttons = useMemo(
        () => [
            {
                label: "Block",
                type: "div",
                disabled: validatorBind(['p', 'img'])
            },
            {
                label: "Text",
                type: "p",
                disabled: validatorBind(['p', 'img', 'ul', 'ol', 'li'])
            },
            {
                label: 'Link',
                type: 'a',
                disabled: validatorBind(['a', 'img'])
            },
            {
                label: 'Image',
                type: 'img',
                disabled: validatorBind(['a', 'img'])
            },
            {
                label: 'List',
                type: 'ul',
                disabled: validatorBind(['ul', 'ol', 'li', 'img'])
            },

            {
                label: 'Item',
                type: 'li',
                disabled: validatorBind(['div', 'p', 'li', 'img'])
            },
        ] as ElementCreatorPreset[],
        [currentElement]
    );
    return (
        <>
            {
                buttons.map(
                    (preset, key) => (
                        <ElementCreator
                            preset={preset}
                            key={key}
                        />
                    )
                )
            }
        </>
    );
}
export default Elements;

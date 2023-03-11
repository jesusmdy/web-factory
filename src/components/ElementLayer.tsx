import {FC, useMemo, useState} from "react";
import {PrimitiveElement} from "../types";
import {editorStore, elementsStore} from "../store";
import classNames from "classnames";
import {Disclosure} from "@headlessui/react";
import {getElementIcon} from "../utils/icon";
import LayerItemContextMenu from "./Element/LayerItemContextMenu";
import { ActionButton, Flex, Item, ListView, Text, ToggleButton, View } from "@adobe/react-spectrum";
import ChevronDown from "@spectrum-icons/workflow/ChevronDown";
import ChevronUp from "@spectrum-icons/workflow/ChevronUp";
import _ from "lodash";

const LayerTrigger: FC<{
    element: PrimitiveElement;
    index: number;
}> = ({element, index}) => {
    const [isOpen, setIsOpen] = useState(false);
    const setElementId = editorStore(state => state.setElement);
    const currentElementId = editorStore(state => state.element);
    const setHighlightElement = editorStore(state => state.setHighlightElement);

    const isCurrentElement = useMemo(
        () => currentElementId === element.id,
        [currentElementId, element.id]
    );
    const onclick = () => setElementId(element.id);
    const handleHighlight = () => setHighlightElement(element.id);
    const handleUnhighlight = () => setHighlightElement(null);
    const onContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(true);
    }
    return (
        <>
            <ToggleButton
                flex="1"
                isSelected={isCurrentElement}
                onPress={onclick}
                isQuiet
                isEmphasized
                UNSAFE_className="rounded-none"
            >
                {
                    getElementIcon(element.type)
                }
                <Text
                    flex={1}
                    UNSAFE_className="text-left"
                >
                    {element.name || _.capitalize(element.type)}
                </Text>
            </ToggleButton>
            <LayerItemContextMenu element={element} />
        </>
    );
}
const ElementLayer: FC<{
    element: PrimitiveElement;
    index: number;
}> = ({element, index}) => {
    const elements = elementsStore(state => state.elements);
    const children = useMemo(
        () => elements.filter(e => e.parent === element.id),
        [elements, element]
    )
    const hasChildren = useMemo(
        () => children.length > 0,
        [children]
    )
    return (
        <Disclosure
            defaultOpen
            as={View}
            id={`layer-${element.id}-${index}`}
        >
            {
                ({open}) => (
                    <div>
                        <Flex alignItems="center">
                            {
                                hasChildren && (
                                    <Disclosure.Button
                                        as={ActionButton}
                                        isQuiet
                                        UNSAFE_className="rounded-none"
                                    >
                                        {
                                            open
                                                ? <ChevronDown />
                                                : <ChevronUp />
                                        }
                                    </Disclosure.Button>
                                )
                            }
                            <LayerTrigger element={element} index={index} />
                        </Flex>
                        <Disclosure.Panel>
                            {
                                hasChildren && (
                                    <View
                                        marginStart="35px"
                                    >
                                        {
                                            children.map((child, index) => (
                                                <ElementLayer
                                                    key={`layer-${child.id}-${index}`}
                                                    element={child}
                                                    index={index}
                                                />
                                            ))
                                        }
                                    </View>
                                )
                            }
                        </Disclosure.Panel>
                    </div>
                )
            }
        </Disclosure>
    );
};

export default ElementLayer;

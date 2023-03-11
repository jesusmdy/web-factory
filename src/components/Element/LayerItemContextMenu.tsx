import {createRef, FC, Key} from "react";
import {PrimitiveElement} from "../../types";
import {ListBulletIcon, Square2StackIcon, TrashIcon} from "@heroicons/react/20/solid";
import _ from "lodash";
import {editorStore, elementsStore} from "../../store";
import ClickOutside from "../Utils/ClickOutside";
import { ActionButton, Item, Menu, MenuTrigger } from "@adobe/react-spectrum";
import MoreSmallListVert from "@spectrum-icons/workflow/MoreSmallListVert";
import { idGenerator } from "../../utils";

const LayerItemContextMenu: FC<{
    element: PrimitiveElement;
}> = ({ element }) => {
    const deleteElement = elementsStore(state => state.deleteElement);
    const addElement = elementsStore(state => state.addElement);
    const clearElementId = editorStore(state => state.clearElement);
    const setElementId = editorStore(state => state.setElement);
    const elementId = editorStore(state => state.element);
    const isCurrentElement = elementId === element.id;
    const handleClearSelection = () => {
        if (isCurrentElement) {
            if (element.parent) {
                setElementId(element.parent);
            }
            clearElementId();
        }
    }
    const handleAction = (action: Key) => {
        switch (action) {
            case "delete":
                deleteElement(element);
                handleClearSelection();
                break;
            case "copy":
                addElement(
                    {
                        ...element,
                        id: idGenerator(),
                    }
                );
                break;
        }
    };
    return (
        <MenuTrigger>
            <ActionButton
                isQuiet
                UNSAFE_className="rounded-none"
            >
                <MoreSmallListVert />
            </ActionButton>
            <Menu
                onAction={handleAction}
            >
                <Item key="delete">Delete</Item>
                <Item key="copy">Copy</Item>
            </Menu>
        </MenuTrigger>
    );
};

export default LayerItemContextMenu;

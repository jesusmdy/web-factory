import {FC, PropsWithChildren, useMemo} from "react";
import {editorStore, elementsStore} from "../store";
import {Editor} from "./";
import {XMarkIcon} from "@heroicons/react/20/solid";
import _ from "lodash";
import {PrimitiveElement} from "../types";
import {Scrollbars} from "react-custom-scrollbars";
import classNames from "classnames";
import { ActionButton, Flex, Heading, Item, Text } from "@adobe/react-spectrum";
import CloseCircle from "@spectrum-icons/workflow/CloseCircle";

const ElementOptions: FC<{
    element: PrimitiveElement;
}> = ({ element }) => {
    const elementId = editorStore(state => state.element);
    const clearElement = editorStore(state => state.clearElement);
    const isActive = useMemo(
        () => elementId === element.id,
        [elementId, element]
    )
    return (
        <div
            className={
                classNames(
                    'hidden',
                    {
                        '!block': isActive,
                    }
                )
            }
        >
            <p className="p-2 text-xs flex gap-1 border-b items-center">
                <Flex
                    alignItems="center"
                    width="100%"
                >
                    <Heading flex="1">Editing #{element.id}</Heading>
                    <ActionButton isQuiet onPress={clearElement}>
                        <CloseCircle />
                    </ActionButton>
                </Flex>
            </p>
            <Editor element={element} />
        </div>
    );
};

const Wrapper: FC<PropsWithChildren> = ({ children }) => (
    <div className="w-[20vw] md:w-[20vw] xl:w-[15vw] border-l flex flex-col max-h-[100vh] bg-gray-50">{children}</div>
);

const ElementEditor: FC = () => {
    const elements = elementsStore(state => state.elements);
    const elementId = editorStore(state => state.element);
    if (!elementId) return (
        <Wrapper>
            <p className="text-xs text-center p-4 text-zinc-500">Click an element to start editing</p>
        </Wrapper>
    );
    if (!elements) return (
        <Wrapper>
            <p className="text-xs text-center p-4 text-zinc-500">Create an element to start editing</p>
        </Wrapper>
    );
    return (
        <Wrapper>
            <Scrollbars>
                {
                    elements.map(
                        (element) => (
                            <ElementOptions
                                key={element.id}
                                element={element}
                            />
                        )
                    )
                }
            </Scrollbars>
        </Wrapper>
    );
};

export default ElementEditor;

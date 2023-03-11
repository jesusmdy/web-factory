import {PrimitiveElement} from "../types";
import {createElement, createRef, FC, useMemo, useState} from "react";
import {editorStore, elementsStore} from "../store";
import _ from "lodash";
import ChildrenEditor from "./ChildrenEditor/ChildrenEditor";
import classNames from "classnames";

const Element: FC<{
    element: PrimitiveElement;
}> = ({element}) => {
    const elements = elementsStore(state => state.elements);
    const deleteElement = elementsStore(state => state.deleteElement);
    const setElement = editorStore(state => state.setElement);
    const selectedElement = editorStore(state => state.element);
    const elementRef = createRef();
    const isSelected = useMemo(
        () => selectedElement === element.id,
        [selectedElement, element.id]
    );
    const renderedElement =  useMemo(
        () => {
            const children = _.map(
                _.filter(
                    elements,
                    (child: PrimitiveElement) => child.parent === element.id,
                ),
                (child: PrimitiveElement) => (
                    <Element element={child} key={child.id} />
                )
            );

            const injectedProps = {
                ...element.props,
                className: classNames(
                    element.props.className,
                    'outline-blue-500',
                    {
                        'outline outline-2': isSelected,
                    },
                ),
                onFocus: (event: React.FocusEvent) => {
                    event.stopPropagation();
                    setElement(element.id);
                },
                onClick: (event: React.MouseEvent) => {
                    event.stopPropagation();
                    setElement(element.id);
                },
                onKeyPress: (event: React.KeyboardEvent) => {
                    if (event.key === 'Delete') {
                        deleteElement(element);
                    }
                },
                ref: elementRef,
            };

            if (element.type === 'img') {
                return createElement(
                    element.type,
                    injectedProps,
                );
            }

            return createElement(
                element.type,
                injectedProps,
                [
                    <ChildrenEditor element={element} key={`children-editor-${element.id}`} />,
                    children,
                ]
            );
        },
        [element, elements, isSelected]
    );
    return renderedElement;
};

export default Element;

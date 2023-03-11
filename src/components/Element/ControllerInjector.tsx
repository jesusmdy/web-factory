import {FC, PropsWithChildren, useEffect, useMemo, useState} from "react";
import {PrimitiveElement} from "../../types";
import {editorStore} from "../../store";
import classNames from "classnames";

interface ControllerInjectorProps extends PropsWithChildren {
    element: PrimitiveElement;
    children: any;
};
const ControllerInjector: FC<ControllerInjectorProps> = ({ element, children }) => {
    const setElementId = editorStore(state => state.setElement);
    const currentElementId = editorStore(state => state.element);
    const highlightElementId = editorStore(state => state.highlightElement);

    const isHighlightElement = useMemo(
        () => highlightElementId === element.id,
        [highlightElementId, element.id]
    );
    const isCurrentElement = useMemo(
        () => currentElementId === element.id,
        [currentElementId, element.id]
    );
    const onClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setElementId(element.id);
    };
    return (
        <div
            className={
                classNames(
                    'outline outline-1 outline-offset-2 outline-transparent transition-all duration-100 w-auto h-auto',
                    {
                        '!outline-blue-500': isCurrentElement,
                        'outline-blue-200': isHighlightElement,
                    }
                )
            }
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default ControllerInjector;

import {createElement, FC, Fragment, useEffect, useMemo} from 'react';
import {elementsStore} from "../store";
import {PrimitiveElement} from "../types";
import _ from "lodash";
import {Element} from "./index";

const ElementViewport: FC = () => {
    const elements = elementsStore(state => state.elements);
    const higherElements = useMemo(
        () => _.filter(
            elements,
            (element: PrimitiveElement) => element.parent === undefined,
        ),
        [elements]
    );
    return (
        <div className="flex-1 relative h-[calc(100vh-52px)] overflow-auto">
            {
                _.map(
                    higherElements,
                    (element: PrimitiveElement) => (
                        <Fragment key={element.id}>
                            <Element element={element} />
                        </Fragment>
                    )
                )
            }
        </div>
    );
};
export default ElementViewport;

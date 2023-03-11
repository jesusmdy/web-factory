import {PrimitiveElement} from "../../types";
import React, {FC, useMemo} from "react";
import _ from "lodash";
import {specialProps} from "../../utils/element";
import {PropEditor} from "./PropEditor";

const SpecialProps: FC<{
    element: PrimitiveElement;
}> = ({ element }) => {
    const elementProps = useMemo(
        () => _.get(
            specialProps,
            element.type,
            null
        ),
        [element]
    );
    if (!elementProps) return null;
    return (
        <div className="flex flex-col">
            {
                _.map(
                    elementProps,
                    (prop, key) => (
                        <div className="p-2" key={key}>
                            <PropEditor
                                prop={prop}
                                element={element}
                                asProp
                                asColumn
                            />
                        </div>
                    )
                )
            }
        </div>
    );
}

export default SpecialProps;

import { FC, useMemo } from "react";
import { PrimitiveElement } from "../../../types";
import { defaultSuffix } from "../../../utils";
import _ from "lodash";
import { PropEditor } from "../PropEditor";
import useChainedController from "../../../hooks/useChainedController";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { View } from "@adobe/react-spectrum";

const MarginPanel: FC<{
    element: PrimitiveElement;
}> = ({ element }) => {
    const chainedController = useChainedController(
        element,
        ['marginLeft', 'marginRight', 'marginTop', 'marginBottom']
    );
    const props = useMemo(
        () => [
            {
                name: "Left",
                key: "marginLeft",
                value: element.props.style?.marginLeft as string,
                defaultValue: element.props.style?.marginLeft || "0",
                type: "number",
                suffix: defaultSuffix,
            },
            {
                name: "Right",
                key: "marginRight",
                value: element.props.style?.marginRight as string,
                defaultValue: element.props.style?.marginRight || "0",
                type: "number",
                suffix: defaultSuffix,
            },
            {
                name: "Top",
                key: "marginTop",
                value: element.props.style?.marginTop as string,
                defaultValue: element.props.style?.marginTop || "0",
                type: "number",
                suffix: defaultSuffix,
            },
            {
                name: "Bottom",
                key: "marginBottom",
                value: element.props.style?.marginBottom as string,
                defaultValue: element.props.style?.marginBottom || "0",
                type: "number",
                suffix: defaultSuffix,
            },
        ],
        [element]
    );
    return (
        <View padding="size-100">
            {
                _.map(
                    props,
                    (prop) => (
                        <div key={prop.key}>
                            <PropEditor
                                chainedController={chainedController}
                                prop={prop}
                                element={element}
                            />
                        </div>
                    )
                )
            }
        </View>
    );
};

export default MarginPanel;

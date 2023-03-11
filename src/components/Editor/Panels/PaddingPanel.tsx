import { FC, useMemo } from "react";
import { PrimitiveElement } from "../../../types";
import { defaultSuffix } from "../../../utils";
import _ from "lodash";
import { PropEditor } from "../PropEditor";
import useChainedController from "../../../hooks/useChainedController";
import { View } from "@adobe/react-spectrum";

const PaddingPanel: FC<{
    element: PrimitiveElement;
}> = ({ element }) => {
    const props = useMemo(
        () => [
            {
                name: "Left",
                key: "paddingLeft",
                value: element.props.style?.paddingLeft as string,
                defaultValue: element.props.style?.paddingLeft || "0",
                type: "number",
                suffix: defaultSuffix,
            },
            {
                name: "Right",
                key: "paddingRight",
                value: element.props.style?.paddingRight as string,
                defaultValue: element.props.style?.paddingRight || "0",
                type: "number",
                suffix: defaultSuffix,
            },
            {
                name: "Top",
                key: "paddingTop",
                value: element.props.style?.paddingTop as string,
                defaultValue: element.props.style?.paddingTop || "0",
                type: "number",
                suffix: defaultSuffix,
            },
            {
                name: "Bottom",
                key: "paddingBottom",
                value: element.props.style?.paddingBottom as string,
                defaultValue: element.props.style?.paddingBottom || "0",
                type: "number",
                suffix: defaultSuffix,
            },
        ],
        [element]
    );
    const chainController = useChainedController(
        element,
        ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom']
    );
    return (
        <View padding="size-100">
            {
                _.map(
                    props,
                    (prop) => (
                        <div key={prop.key}>
                            <PropEditor
                                prop={prop}
                                element={element}
                                chainedController={chainController}
                            />
                        </div>
                    )
                )
            }
        </View>
    );
};

export default PaddingPanel;

import { FC, useMemo } from "react";
import { PrimitiveElement } from "../../../types";
import { defaultSuffix } from "../../../utils";
import _ from "lodash";
import { PropEditor } from "../PropEditor";
import useChainedController from "../../../hooks/useChainedController";
import { ChevronDoubleDownIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { View } from "@adobe/react-spectrum";

const RadiusPanel: FC<{
    element: PrimitiveElement;
}> = ({ element }) => {
    const props = useMemo(
        () => [
            {
                name: "Top Left",
                key: "borderTopLeftRadius",
                value: element.props.style?.borderTopLeftRadius as string,
                defaultValue: element.props.style?.borderTopLeftRadius || "0",
                type: "number",
                suffix: defaultSuffix,
                icon: ChevronUpIcon,
                iconClassname: "transform -rotate-45"
            },
            {
                name: "Top Right",
                key: "borderTopRightRadius",
                value: element.props.style?.borderTopRightRadius as string,
                defaultValue: element.props.style?.borderTopRightRadius || "0",
                type: "number",
                suffix: defaultSuffix,
                icon: ChevronUpIcon,
                iconClassname: "transform rotate-45"
            },
            {
                name: "Bottom Left",
                key: "borderBottomLeftRadius",
                value: element.props.style?.borderBottomLeftRadius as string,
                defaultValue: element.props.style?.borderBottomLeftRadius || "0",
                type: "number",
                suffix: defaultSuffix,
                icon: ChevronDownIcon,
                iconClassname: "transform rotate-45"
            },
            {
                name: "Bottom Right",
                key: "borderBottomRightRadius",
                value: element.props.style?.borderBottomRightRadius as string,
                defaultValue: element.props.style?.borderBottomRightRadius || "0",
                type: "number",
                suffix: defaultSuffix,
                icon: ChevronDownIcon,
                iconClassname: "transform -rotate-45"
            },
        ],
        [element]
    );
    const chainController = useChainedController(
        element,
        ['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomLeftRadius', 'borderBottomRightRadius']
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

export default RadiusPanel;

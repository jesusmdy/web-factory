import {FC, useEffect, useMemo, useState} from "react";
import {elementsStore} from "../store";
import _, { divide } from "lodash";
import StylesEditor from "./Editor/StylesEditor";
import {PrimitiveElement} from "../types";
import SpacingEditor from "./Editor/Spacing";
import BoxShadowEditor from "./Editor/BoxShadowEditor";
import { Badge, Divider, Flex, Text, View } from "@adobe/react-spectrum";

const Editor: FC<{
    element: PrimitiveElement;
}> = ({element}) => {
    const updateElement = elementsStore(state => state.updateElement);
    const handleChange = (shadow: string) => {
        updateElement({
            ...element,
            props: {
                ...element.props,
                style: {
                    ...element.props.style,
                    boxShadow: shadow,
                }
            }
        });
    }
    return (
        <div>
            <View padding="10px">
                <Flex alignItems="center">
                    <Text flexGrow={1}>Element type</Text>
                    <Badge variant="info">
                        {
                            _.capitalize(element.type)
                        }
                    </Badge>
                </Flex>
            </View>
            <Divider size="S" />
            <StylesEditor element={element} />
            <BoxShadowEditor onChange={handleChange} defaultValue={element.props.style?.boxShadow} />
            <SpacingEditor element={element} />
        </div>
    )
}

export default Editor;

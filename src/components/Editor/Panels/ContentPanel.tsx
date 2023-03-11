import { FC, useEffect, useState } from "react";
import { PrimitiveElement } from "../../../types";
import { ActionButton, Flex, Text, TextArea, View } from "@adobe/react-spectrum";
import Delete from "@spectrum-icons/workflow/Delete";
import { elementsStore } from "../../../store";

const ContentPanel: FC<{
    element: PrimitiveElement;
}> = ({ element }) => {
    const [isFocused, setIsFocused] = useState(false);
    const updateElement = elementsStore(state => state.updateElement);
    const [value, setValue] = useState<string | undefined>(element.props.children as string);

    const onDelete = () => {
        setValue('');
        updateElement({
            ...element,
            props: {
                ...element.props,
                children: undefined,
            }
        });
    };
    
    useEffect(
        () => {
            updateElement({
                ...element,
                props: {
                    ...element.props,
                    children: value,
                }
            });
        },
        [value]
    );

    return (
        <View
            padding="size-100"
        >
            <Flex>
                <Text flex="1">Content</Text>
                <ActionButton
                    isQuiet
                    onPress={onDelete}
                >
                    <Delete />
                </ActionButton>
            </Flex>
            <TextArea
                width="100%"
                placeholder="Edit element content..."
                isQuiet={!isFocused}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                value={value}
                onChange={setValue}
            />
        </View>
    );
};

export default ContentPanel;

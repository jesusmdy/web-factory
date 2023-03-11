import {createRef, FC, Fragment, useRef, useState} from "react";
import { ColorArea, ColorField, ColorSlider } from "@react-spectrum/color";
import { ActionButton, Dialog, DialogTrigger, Flex, View } from "@adobe/react-spectrum";
import { parseColor } from "@react-stately/color";
import ColorWheelIcon from "@spectrum-icons/workflow/ColorWheel";
import {ColorWheel} from '@react-spectrum/color'
import _ from "lodash";

const ColorPicker: FC<{
    onChange: (color: string) => void;
    defaultValue?: string;
    label?: string;
}> = ({ onChange, defaultValue = '#000000', label }) => {
    const [color, setColor] = useState(parseColor(defaultValue));
    const handleChange = (color: any) => {
        setColor(color);
        onChange(color.toString('hex'));
    }
    
    return (
        <Flex
            alignItems="end"
            maxWidth="100%"
            gap="6px"
        >
            <ColorField
                value={color}
                onChange={handleChange}
                flex={1}
                label={_.capitalize(label)}
            />
            <DialogTrigger type="popover">
                <ActionButton>
                    <ColorWheelIcon />
                </ActionButton>
                <Dialog>
                    <View padding="size-100">
                        <ColorWheel
                            onChange={handleChange}
                        />
                    </View>
                </Dialog>
            </DialogTrigger>
        </Flex>
    );
};

export default ColorPicker;

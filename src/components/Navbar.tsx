import {FC} from "react";
import Elements from "./Elements/Elements";
import { Flex, View } from "@adobe/react-spectrum";

const Navbar: FC = () => {
    return (
        <View
            backgroundColor="gray-50"
            borderBottomWidth="thin"
            padding="size-100"
        >
            <Flex gap="size-100">
                <Elements />
            </Flex>
        </View>
    );
};

export default Navbar;

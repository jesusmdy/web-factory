import {elementsStore} from "../store";
import _ from "lodash";
import {Fragment, useMemo} from "react";
import {ElementLayer} from "./";
import {Square2StackIcon} from "@heroicons/react/20/solid";
import { Scrollbars } from 'react-custom-scrollbars';
import { Divider, Flex, Heading, View } from "@adobe/react-spectrum";
import Layers from "@spectrum-icons/workflow/Layers";

const ElementsLayersList = () => {
    const elements = elementsStore(state => state.elements);
    const higherElements = useMemo(
        () => _.filter(elements, e => e.parent === undefined),
        [elements]
    );
    return (
        <div className="w-[20vw] md:w-[20vw] xl:w-[15vw] border-r flex flex-col max-h-[100vh] bg-zinc-50 relative">
            <Scrollbars>
                <View padding="size-100">
                    <Flex gap="size-100">
                        <Layers />
                        <Heading flex="1" level={4}>Layers</Heading>
                    </Flex>
                </View>
                <Divider size="S" />
                {
                    _.map(
                        higherElements,
                        (element, index) => (
                            <Fragment key={`layer-${element.id}-${index}`}>
                                <ElementLayer element={element} index={index} />
                            </Fragment>
                        )
                    )
                }
            </Scrollbars>
        </div>
    );
};

export default ElementsLayersList;

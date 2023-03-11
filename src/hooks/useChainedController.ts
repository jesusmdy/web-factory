import { useEffect, useState } from "react";
import { elementsStore } from "../store";
import { PrimitiveElement } from "../types";

type Controller = string;

export interface ChainedController {
    controllers: Controller[];
    addController: (controller: Controller) => void;
    removeController: (controller: Controller) => void;
    isChained: (controller: Controller) => boolean;
    toggle: (controller: Controller) => void;
    updateChain: (value: any) => void;
};

// controller stands for a property key for the PrimitiveElement

const useChainedController = (
    element: PrimitiveElement,
    preControllers: Controller[] = [],
): ChainedController => {
    const [controllers, setControllers] = useState<Controller[]>([]);

    useEffect(() => {
        if (preControllers.length > 0 && controllers.length === 0) {
            setControllers(preControllers);
        }
    }, [preControllers]);
    
    const updateElement = elementsStore(state => state.updateElement);
    const addController = (controller: Controller) => setControllers([...controllers, controller]);
    const removeController = (controller: Controller) => setControllers(controllers.filter(c => c !== controller));
    const isChained = (controller: Controller) => controllers.includes(controller);
    const toggle = (controller: Controller) => {
        if (isChained(controller)) {
            removeController(controller);
        } else {
            addController(controller);
        }
    }
    const updateChain = (value: any) => {
        const props = controllers.reduce(
            (acc, controller) => {
                acc[controller] = value;
                return acc;
            },
            {} as any
        );
        updateElement({
            ...element,
            props: {
                ...element.props,
                style: {
                    ...element.props.style,
                    ...props
                }
            },
        });        
    };
    return {
        controllers,
        addController,
        removeController,
        isChained,
        toggle,
        updateChain
    };
};

export default useChainedController;

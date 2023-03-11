import { create } from 'zustand';
import { PrimitiveElement } from '../types';
import _ from "lodash";

interface ElementsStore {
    elements: PrimitiveElement[];
    setElements: (elements: PrimitiveElement[]) => void;
    addElement: (element: PrimitiveElement) => void;
    removeElement: (element: PrimitiveElement) => void;
    clearElements: () => void;
    updateElement: (element: PrimitiveElement) => void;
    deleteElement: (element: PrimitiveElement) => void;
}

const elementsStore = create<ElementsStore>(
    (set) => (
        {
            elements: [],
            setElements: (elements) => set({ elements }),
            addElement: (element) => set((state) => ({ elements: [...state.elements, element] })),
            removeElement: (element) => set((state) => ({ elements: state.elements.filter((e) => e !== element) })),
            clearElements: () => set({ elements: [] }),
            updateElement: (
                element: PrimitiveElement,
            ) => set(
                (state) => {
                    const el = _.find(state.elements, (e) => e.id === element.id);
                    const index = _.indexOf(state.elements, el);
                    const newElements = [...state.elements];
                    newElements[index] = element;
                    return { elements: newElements };
                }
            ),
            deleteElement: (
                element: PrimitiveElement,
            ) => set(
                (state) => {
                    const el = _.find(state.elements, (e) => e.id === element.id);
                    const index = _.indexOf(state.elements, el);
                    const newElements = [...state.elements];
                    newElements.splice(index, 1);
                    return { elements: newElements };
                }
            ),
        }
    )
);

export default elementsStore;

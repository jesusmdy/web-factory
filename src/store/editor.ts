import {create} from "zustand";

interface EditorStoreInteface {
    element: string | null;
    highlightElement: string | null;
    setHighlightElement: (element: string | null) => void;
    setElement: (element: string) => void;
    clearElement: () => void;
};

const editorStore = create<EditorStoreInteface>(
    (set) => (
        {
            element: null,
            highlightElement: null,
            setElement: (elementId) => set({ element: elementId }),
            clearElement: () => set({ element: null }),
            setHighlightElement: (elementId) => set({ highlightElement: elementId }),
        }
    )
);

export default editorStore;

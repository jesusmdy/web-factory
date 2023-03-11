import {ChangeEvent, FC, useMemo, useState} from "react";
import {PrimitiveElement} from "../../types";
import TextareaAutosize from "react-autosize-textarea";
import {editorStore, elementsStore} from "../../store";

const LiEditor: FC<{
    element: PrimitiveElement;
}> = ({element}) => {
    const [value, setValue] = useState(element.props.children as string);
    const updateElement = elementsStore(state => state.updateElement);
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
        updateElement({
            ...element,
            props: {
                ...element.props,
                children: e.target.value,
            }
        });
    }
    return (
        <TextareaAutosize
            className="w-full bg-transparent text-inherit"
            defaultValue={value}
            onChange={handleChange}
            placeholder="Enter text..."
        />
    );
};

const ChildrenEditor: FC<{
    element: PrimitiveElement;
}> = ({element}) => {
    const elementId = editorStore(state => state.element);
    const isSelected = useMemo(
        () => elementId === element.id,
        [elementId, element.id]
    );

    return <>{element.props.children}</>;

    return (
        <>
            {
                isSelected
                ? <LiEditor element={element} />
                : <>{element.props.children}</>
            }
        </>
    );
};

export default ChildrenEditor;

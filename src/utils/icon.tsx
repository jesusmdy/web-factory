import Circle from "@spectrum-icons/workflow/Circle";
import Globe from "@spectrum-icons/workflow/Globe";
import Image from "@spectrum-icons/workflow/Image";
import Selection from "@spectrum-icons/workflow/Selection";
import TextIcon from "@spectrum-icons/workflow/TextParagraph";
import ViewList from "@spectrum-icons/workflow/ViewList";

export const getElementIcon = (
    type: string,
    className?: string
) => {
    switch (type) {
        case 'div':
            return <Selection />;
        case 'p':
            return <TextIcon />;
        case 'ul':
            return <ViewList />;
        case 'li':
            return <Circle />;
        case 'a':
            return <Globe />;
        case 'img':
            return <Image />;
        default:
            return <Selection />;
    }
};

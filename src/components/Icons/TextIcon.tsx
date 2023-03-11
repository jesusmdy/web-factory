import {FC, SVGProps} from "react";

const Icon: FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
            <path
                fill="currentColor"
                d="M4 4a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 11-2 0V5h-5v14h2a1 1 0 110 2H9a1 1 0 110-2h2V5H6v1a1 1 0 01-2 0V4z"
            ></path>
        </svg>
    );
}

export default Icon;
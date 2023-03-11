import {ForwardRefExoticComponent, HTMLProps, SVGProps} from "react";
import {CubeTransparentIcon} from "@heroicons/react/20/solid";

export type SupportedElements = 'div' | 'p' | 'ul' | 'li' | 'a' | 'img';

export type PrimitiveElement = {
    id: string;
    name?: string;
    type: SupportedElements;
    props: HTMLProps<HTMLDivElement>;
    parent?: string;
};

export type ElementCreatorPreset = {
    label: string;
    type: SupportedElements;
    disabled?: boolean;
};

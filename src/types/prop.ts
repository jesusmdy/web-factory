import {ForwardRefExoticComponent, SVGProps} from "react";

export type Option = {
    value: string;
    label: string;
}

export type PropType = {
    name: string;
    key: string;
    value: string | number | boolean | null;
    type: string;
    placeholder?: string;
    suffix?: string | string[];
    defaultValue?: string | number | boolean | null;
    options?: Option[];
    icon?: ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
    iconClassname?: string;
};

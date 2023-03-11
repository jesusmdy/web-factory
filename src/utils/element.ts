import _ from "lodash";
import {ElementCreatorPreset, PrimitiveElement, SupportedElements} from "../types";
import {idGenerator} from "./index";
import {HTMLProps} from "react";

export const hierarchyValidator = (
    blacklist: string[],
    current: string,
) => {
    return blacklist.includes(current);
};

export const elementGenerator = (tag: SupportedElements, parent?: string, content?: string, props?: HTMLProps<any>): PrimitiveElement => {
    return {
        id: idGenerator(),
        name: _.uniqueId(`${tag}-`),
        type: tag,
        props: {
            ...props,
            children: content || undefined,
            tabIndex: 0,
        },
        parent: parent,
    };
};

export const generateElement = (
    preset: ElementCreatorPreset,
    parent?: string,
): PrimitiveElement[] => {
    switch (preset.type) {
        case 'div':
            return [
                elementGenerator('div', parent, 'Click to edit'),
            ];
        case 'p':
            return [
                elementGenerator('p', parent, 'Click to edit')
            ];
        case 'a':
            return [
                elementGenerator(
                    'a',
                    parent,
                    'Click to edit',
                    {
                        target: '_blank',
                    }
                )
            ];
        case 'img':
            return [
                elementGenerator(
                    'img',
                    parent,
                    undefined,
                    {
                        src: 'https://via.placeholder.com/150',
                    }
                )
            ];
        case 'ul': {
            const elements = [];
            const list = elementGenerator('ul', parent);
            const listItem = elementGenerator('li', list.id, 'Click to edit');
            elements.push(list, listItem);
            return elements;
        }
        case 'li':
            return [
                elementGenerator('li', parent, 'Click to edit')
            ];
        default:
            return [];
    }
};

export const specialProps = {
    a: [
        {
            name: 'Link',
            key: 'href',
            value: null,
            type: 'text',
            placeholder: 'https://example.com',
            defaultValue: 'https://example.com',
        },
    ],
    img: [
        {
            name: 'Image URL',
            key: 'src',
            value: null,
            type: 'text',
            placeholder: 'https://via.placeholder.com/150',
        },
        {
            name: 'Alt Text',
            key: 'alt',
            value: null,
            type: 'text',
            placeholder: 'Image description',
        },
        {
            name: 'Width',
            key: 'width',
            value: 150,
            type: 'number-alt',
            placeholder: '150',
        },
        {
            name: 'Height',
            key: 'height',
            value: 150,
            type: 'number-alt',
            placeholder: '150',
        }
    ],
};

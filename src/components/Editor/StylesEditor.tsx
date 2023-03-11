import {FC, Fragment, useMemo} from "react";
import {PrimitiveElement} from "../../types";
import {PropEditor} from "./PropEditor";
import _ from "lodash";
import {defaultSuffix} from "../../utils";
import BoxShadowEditor from "./BoxShadowEditor";
import {elementsStore} from "../../store";
import {Tab} from "@headlessui/react";
import classNames from "classnames";
import {ArrowsPointingOutIcon} from "@heroicons/react/20/solid";
import SpecialProps from "./SpecialProps";
import {LayoutPanel} from "./Panels";
import ContentPanel from "./Panels/ContentPanel";

const Props: FC<{
    element: PrimitiveElement;
}> = ({ element }) => {
    const props = useMemo(
        () => [
            {
                name: 'color',
                key: 'color',
                value: element.props.style?.color as string,
                defaultValue: element.props.style?.color,
                type: 'color',
            },
            {
                name: 'background color',
                key: 'backgroundColor',
                value: element.props.style?.backgroundColor as string,
                defaultValue: element.props.style?.backgroundColor,
                type: 'color',
            },
            {
                name: 'border color',
                key: 'borderColor',
                value: element.props.style?.borderColor as string,
                defaultValue: element.props.style?.borderColor,
                type: 'color',
            },
            {
                name: 'border width',
                key: 'borderWidth',
                value: element.props.style?.borderWidth as string,
                defaultValue: element.props.style?.borderWidth || '0',
                type: 'number',
                suffix: defaultSuffix,
            },
        ],
        [element],
    );
    return (
        <Fragment>
            {
                _.map(
                    props,
                    (prop) => (
                        <PropEditor
                            prop={prop}
                            element={element}
                            key={prop.key}
                        />
                    )
                )
            }
        </Fragment>
    );
};

const PositionProps: FC<{
    element: PrimitiveElement;
}> = ({ element }) => {
    const props = [
        {
            name: 'Top',
            key: 'top',
            value: element.props.style?.top as string,
            type: 'number-alt',
        },
        {
            name: 'Right',
            key: 'right',
            value: element.props.style?.right as string,
            type: 'number-alt',
        },
        {
            name: 'Bottom',
            key: 'bottom',
            value: element.props.style?.bottom as string,
            type: 'number-alt',
        },
        {
            name: 'Left',
            key: 'left',
            value: element.props.style?.left as string,
            type: 'number-alt',
        },
    ];
    const position = {
        name: 'Position',
        key: 'position',
        value: element.props.style?.position as string,
        defaultValue: element.props.style?.position || 'static',
        type: 'select',
        icon: ArrowsPointingOutIcon,
        options: [
            {
                value: 'static',
                label: 'Static',
            },
            {
                value: 'relative',
                label: 'Relative',
            },
            {
                value: 'absolute',
                label: 'Absolute',
            },
            {
                value: 'fixed',
                label: 'Fixed',
            },
            {
                value: 'sticky',
                label: 'Sticky',
            },
        ],
    };
    return (
        <>
            <div className="px-3 py-2">
                <PropEditor
                    prop={position}
                    element={element}
                />
            </div>
            <div className="p-2 flex flex-wrap">
                {
                    _.map(
                        props,
                        (prop) => (
                            <div className="w-1/2 p-1" key={prop.key}>
                                <PropEditor
                                    prop={prop}
                                    element={element}
                                />
                            </div>
                        )
                    )
                }
            </div>
        </>
    );
};

const StylesEditor: FC<{
    element: PrimitiveElement;
}> = ({ element }) => {
    const tabs = ['Content', 'Design', 'Position', 'Layout'];
    return (
        <div className="flex flex-col">
            <SpecialProps element={element} />
            <Tab.Group>
                <Tab.List className="border-b">
                    {
                        _.map(
                            tabs,
                            (tab) => (
                                <Tab as={Fragment} key={tab}>
                                    {
                                        ({selected}) => (
                                            <button
                                                className={
                                                    classNames(
                                                        'p-2 text-xs font-semibold text-zinc-600 border-b -mb-[1px] hover:bg-gray-50',
                                                        {
                                                            'text-blue-500 border-b-blue-500': selected,
                                                        }
                                                    )
                                                }
                                            >
                                                {tab}
                                            </button>
                                        )
                                    }
                                </Tab>
                            )
                        )
                    }
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel>
                        <ContentPanel element={element} />
                    </Tab.Panel>
                    <Tab.Panel>
                        <div className="p-2 flex flex-col gap-2">
                            <Props element={element} />
                        </div>
                    </Tab.Panel>
                    <Tab.Panel>
                        <PositionProps element={element} />
                    </Tab.Panel>
                    <Tab.Panel>
                        <LayoutPanel element={element} />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};

export default StylesEditor;

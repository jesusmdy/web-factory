import {FC, useMemo} from "react";
import {PrimitiveElement} from "../../../types";
import {ArrowsPointingOutIcon, BookmarkSquareIcon, RectangleGroupIcon, Squares2X2Icon} from "@heroicons/react/20/solid";
import _ from "lodash";
import {PropEditor} from "../PropEditor";

const LayoutPanel: FC<{
    element: PrimitiveElement;
}> = ({ element }) => {
    const displayProp = useMemo(
        () => (
            {
                name: 'Display',
                key: 'display',
                value: element.props.style?.display as string,
                defaultValue: element.props.style?.display || 'block',
                type: 'select',
                icon: RectangleGroupIcon,
                options: [
                    {
                        label: 'Block',
                        value: 'block',
                    },
                    {
                        label: 'Inline',
                        value: 'inline',
                    },
                    {
                        label: 'Inline Block',
                        value: 'inline-block',
                    },
                    {
                        label: 'Flex',
                        value: 'flex',
                    },
                    {
                        label: 'Inline Flex',
                        value: 'inline-flex',
                    },
                    {
                        label: 'Grid',
                        value: 'grid',
                    },
                    {
                        label: 'Inline Grid',
                        value: 'inline-grid',
                    },
                    {
                        label: 'Table',
                        value: 'table',
                    },
                    {
                        label: 'Inline Table',
                        value: 'inline-table',
                    },
                    {
                        label: 'Hidden',
                        value: 'hidden',
                    },
                    {
                        label: 'None',
                        value: 'none',
                    }
                ],
            }
        ),
        [element],
    );
    const asFlexProps = useMemo(
        () => (
            [
                {
                    name: 'Gap',
                    key: 'gap',
                    value: element.props.style?.gap as string,
                    defaultValue: element.props.style?.gap || '0',
                    type: 'number',
                    suffix: 'px',
                },
                {
                    name: 'Y Gap',
                    key: 'rowGap',
                    value: element.props.style?.rowGap as string,
                    defaultValue: element.props.style?.rowGap || '0',
                    type: 'number',
                    suffix: 'px',
                },
                {
                    name: 'X Gap',
                    key: 'columnGap',
                    value: element.props.style?.columnGap as string,
                    defaultValue: element.props.style?.columnGap || '0',
                    type: 'number',
                    suffix: 'px',
                },
                {
                    name: 'Flex direction',
                    key: 'flexDirection',
                    value: element.props.style?.flexDirection as string,
                    defaultValue: element.props.style?.flexDirection || 'row',
                    type: 'select',
                    icon: Squares2X2Icon,
                    options: [
                        {
                            label: 'Row',
                            value: 'row',
                        },
                        {
                            label: 'Row Reverse',
                            value: 'row-reverse',
                        },
                        {
                            label: 'Column',
                            value: 'column',
                        },
                        {
                            label: 'Column Reverse',
                            value: 'column-reverse',
                        },
                    ]
                },
                {
                    name: 'Flex wrap',
                    key: 'flexWrap',
                    value: element.props.style?.flexWrap as string,
                    defaultValue: element.props.style?.flexWrap || 'nowrap',
                    type: 'select',
                    icon: Squares2X2Icon,
                    options: [
                        {
                            label: 'No Wrap',
                            value: 'nowrap',
                        },
                        {
                            label: 'Wrap',
                            value: 'wrap',
                        },
                        {
                            label: 'Wrap Reverse',
                            value: 'wrap-reverse',
                        },
                    ]
                },
                {
                    name: 'Flex Grow',
                    key: 'flexGrow',
                    value: element.props.style?.flexGrow as string,
                    defaultValue: element.props.style?.flexGrow || '0',
                    type: 'number',
                },
                {
                    name: 'Flex Shrink',
                    key: 'flexShrink',
                    value: element.props.style?.flexShrink as string,
                    defaultValue: element.props.style?.flexShrink || '1',
                    type: 'number',
                },
                {
                    name: 'Flex Basis',
                    key: 'flexBasis',
                    value: element.props.style?.flexBasis as string,
                    defaultValue: element.props.style?.flexBasis || 'auto',
                    type: 'text',
                },
                {
                    name: 'Justify Content',
                    key: 'justifyContent',
                    value: element.props.style?.justifyContent as string,
                    defaultValue: element.props.style?.justifyContent || 'flex-start',
                    type: 'select',
                    icon: Squares2X2Icon,
                    options: [
                        {
                            label: 'Flex Start',
                            value: 'flex-start',
                        },
                        {
                            label: 'Flex End',
                            value: 'flex-end',
                        },
                        {
                            label: 'Center',
                            value: 'center',
                        },
                        {
                            label: 'Space Between',
                            value: 'space-between',
                        },
                        {
                            label: 'Space Around',
                            value: 'space-around',
                        },
                        {
                            label: 'Space Evenly',
                            value: 'space-evenly',
                        },
                    ]
                },
                {
                    name: 'Align Items',
                    key: 'alignItems',
                    value: element.props.style?.alignItems as string,
                    defaultValue: element.props.style?.alignItems || 'stretch',
                    type: 'select',
                    icon: Squares2X2Icon,
                    options: [
                        {
                            label: 'Stretch',
                            value: 'stretch',
                        },
                        {
                            label: 'Flex Start',
                            value: 'flex-start',
                        },
                        {
                            label: 'Flex End',
                            value: 'flex-end',
                        },
                        {
                            label: 'Center',
                            value: 'center',
                        },
                        {
                            label: 'Baseline',
                            value: 'baseline',
                        },
                    ]
                },
                {
                    name: 'Align Content',
                    key: 'alignContent',
                    value: element.props.style?.alignContent as string,
                    defaultValue: element.props.style?.alignContent || 'stretch',
                    type: 'select',
                    icon: Squares2X2Icon,
                    options: [
                        {
                            label: 'Stretch',
                            value: 'stretch',
                        },
                        {
                            label: 'Flex Start',
                            value: 'flex-start',
                        },
                        {
                            label: 'Flex End',
                            value: 'flex-end',
                        },
                        {
                            label: 'Center',
                            value: 'center',
                        },
                        {
                            label: 'Space Between',
                            value: 'space-between',
                        },
                        {
                            label: 'Space Around',
                            value: 'space-around',
                        },
                    ]
                },
                {
                    name: 'Align Self',
                    key: 'alignSelf',
                    value: element.props.style?.alignSelf as string,
                    defaultValue: element.props.style?.alignSelf || 'auto',
                    type: 'select',
                    icon: Squares2X2Icon,
                    options: [
                        {
                            label: 'Auto',
                            value: 'auto',
                        },
                        {
                            label: 'Stretch',
                            value: 'stretch',
                        },
                        {
                            label: 'Flex Start',
                            value: 'flex-start',
                        },
                        {
                            label: 'Flex End',
                            value: 'flex-end',
                        },
                        {
                            label: 'Center',
                            value: 'center',
                        },
                        {
                            label: 'Baseline',
                            value: 'baseline',
                        },
                    ]
                },
            ]
        ),
        [element],
    );
    const asGridProps = useMemo(
        () => (
            [
                {
                    name: 'Grid Template Columns',
                    key: 'gridTemplateColumns',
                    value: element.props.style?.gridTemplateColumns as string,
                    defaultValue: element.props.style?.gridTemplateColumns || 'none',
                    type: 'text',
                },
                {
                    name: 'Grid Template Rows',
                    key: 'gridTemplateRows',
                    value: element.props.style?.gridTemplateRows as string,
                    defaultValue: element.props.style?.gridTemplateRows || 'none',
                    type: 'text',
                },
                {
                    name: 'Grid Template Areas',
                    key: 'gridTemplateAreas',
                    value: element.props.style?.gridTemplateAreas as string,
                    defaultValue: element.props.style?.gridTemplateAreas || 'none',
                    type: 'text',
                },
                {
                    name: 'Grid Auto Columns',
                    key: 'gridAutoColumns',
                    value: element.props.style?.gridAutoColumns as string,
                    defaultValue: element.props.style?.gridAutoColumns || 'auto',
                    type: 'text',
                },
                {
                    name: 'Grid Auto Rows',
                    key: 'gridAutoRows',
                    value: element.props.style?.gridAutoRows as string,
                    defaultValue: element.props.style?.gridAutoRows || 'auto',
                    type: 'text',
                },
                {
                    name: 'Grid Column Gap',
                    key: 'gridColumnGap',
                    value: element.props.style?.gridColumnGap as string,
                    defaultValue: element.props.style?.gridColumnGap || '0',
                    type: 'text',
                },
                {
                    name: 'Grid Row Gap',
                    key: 'gridRowGap',
                    value: element.props.style?.gridRowGap as string,
                    defaultValue: element.props.style?.gridRowGap || '0',
                    type: 'text',
                },
                {
                    name: 'Grid Auto Flow',
                    key: 'gridAutoFlow',
                    value: element.props.style?.gridAutoFlow as string,
                    defaultValue: element.props.style?.gridAutoFlow || 'row',
                    type: 'select',
                    icon: Squares2X2Icon,
                    options: [
                        {
                            label: 'Row',
                            value: 'row',
                        },
                        {
                            label: 'Column',
                            value: 'column',
                        },
                        {
                            label: 'Row Dense',
                            value: 'row dense',
                        },
                        {
                            label: 'Column Dense',
                            value: 'column dense',
                        },
                    ]
                },
                {
                    name: 'Grid Column Start',
                    key: 'gridColumnStart',
                    value: element.props.style?.gridColumnStart as string,
                    defaultValue: element.props.style?.gridColumnStart || 'auto',
                    type: 'text',
                },
                {
                    name: 'Grid Column End',
                    key: 'gridColumnEnd',
                    value: element.props.style?.gridColumnEnd as string,
                    defaultValue: element.props.style?.gridColumnEnd || 'auto',
                    type: 'text',
                },
                {
                    name: 'Grid Row Start',
                    key: 'gridRowStart',
                    value: element.props.style?.gridRowStart as string,
                    defaultValue: element.props.style?.gridRowStart || 'auto',
                    type: 'text',
                },
                {
                    name: 'Grid Row End',
                    key: 'gridRowEnd',
                    value: element.props.style?.gridRowEnd as string,
                    defaultValue: element.props.style?.gridRowEnd || 'auto',
                    type: 'text',
                },
                {
                    name: 'Grid Area',
                    key: 'gridArea',
                    value: element.props.style?.gridArea as string,
                    defaultValue: element.props.style?.gridArea || 'auto',
                    type: 'text',
                },
                {
                    name: 'Justify Items',
                    key: 'justifyItems',
                    value: element.props.style?.justifyItems as string,
                    defaultValue: element.props.style?.justifyItems || 'stretch',
                    icon: Squares2X2Icon,
                    type: 'select',
                    options: [
                        {
                            label: 'Stretch',
                            value: 'stretch',
                        },
                        {
                            label: 'Flex Start',
                            value: 'flex-start',
                        },
                        {
                            label: 'Flex End',
                            value: 'flex-end',
                        },
                        {
                            label: 'Center',
                            value: 'center',
                        },
                        {
                            label: 'Baseline',
                            value: 'baseline',
                        },
                        {
                            label: 'Initial',
                            value: 'initial',
                        },
                        {
                            label: 'Inherit',
                            value: 'inherit',
                        },
                    ]
                },
                {
                    name: 'Align Items',
                    key: 'alignItems',
                    value: element.props.style?.alignItems as string,
                    defaultValue: element.props.style?.alignItems || 'stretch',
                    icon: Squares2X2Icon,
                    type: 'select',
                    options: [
                        {
                            label: 'Stretch',
                            value: 'stretch',
                        },
                        {
                            label: 'Flex Start',
                            value: 'flex-start',
                        },
                        {
                            label: 'Flex End',
                            value: 'flex-end',
                        },
                        {
                            label: 'Center',
                            value: 'center',
                        },
                        {
                            label: 'Baseline',
                            value: 'baseline',
                        },
                        {
                            label: 'Initial',
                            value: 'initial',
                        },
                        {
                            label: 'Inherit',
                            value: 'inherit',
                        },
                    ]
                },
                {
                    name: 'Justify Content',
                    key: 'justifyContent',
                    value: element.props.style?.justifyContent as string,
                    defaultValue: element.props.style?.justifyContent || 'flex-start',
                    icon: Squares2X2Icon,
                    type: 'select',
                    options: [
                        {
                            label: 'Flex Start',
                            value: 'flex-start',
                        },
                        {
                            label: 'Flex End',
                            value: 'flex-end',
                        },
                        {
                            label: 'Center',
                            value: 'center',
                        },
                        {
                            label: 'Space Between',
                            value: 'space-between',
                        },
                        {
                            label: 'Space Around',
                            value: 'space-around',
                        },
                        {
                            label: 'Space Evenly',
                            value: 'space-evenly',
                        },
                        {
                            label: 'Initial',
                            value: 'initial',
                        },
                        {
                            label: 'Inherit',
                            value: 'inherit',
                        },
                    ]
                },
                {
                    name: 'Align Content',
                    key: 'alignContent',
                    value: element.props.style?.alignContent as string,
                    defaultValue: element.props.style?.alignContent || 'stretch',
                    type: 'select',
                    icon: Squares2X2Icon,
                    options: [
                        {
                            label: 'Stretch',
                            value: 'stretch',
                        },
                        {
                            label: 'Flex Start',
                            value: 'flex-start',
                        },
                        {
                            label: 'Flex End',
                            value: 'flex-end',
                        },
                        {
                            label: 'Center',
                            value: 'center',
                        },
                        {
                            label: 'Space Between',
                            value: 'space-between',
                        },
                        {
                            label: 'Space Around',
                            value: 'space-around',
                        },
                    ]
                },
                {
                    name: 'Align Self',
                    key: 'alignSelf',
                    value: element.props.style?.alignSelf as string,
                    defaultValue: element.props.style?.alignSelf || 'auto',
                    type: 'select',
                    icon: Squares2X2Icon,
                    options: [
                        {
                            label: 'Auto',
                            value: 'auto',
                        },
                        {
                            label: 'Stretch',
                            value: 'stretch',
                        },
                        {
                            label: 'Flex Start',
                            value: 'flex-start',
                        },
                        {
                            label: 'Flex End',
                            value: 'flex-end',
                        },
                        {
                            label: 'Center',
                            value: 'center',
                        },
                        {
                            label: 'Baseline',
                            value: 'baseline',
                        },
                    ]
                },
            ]
        ),
        [element],
    );
    const enabledProps = useMemo(
        () => {
            const display = element.props.style?.display as string;
            if (display === 'flex' || display === 'inline-flex') {
                return asFlexProps;
            } else if (display === 'grid' || display === 'inline-grid') {
                return asGridProps;
            }
        },
        [element],
    );
    return (
        <div className="flex flex-col p-2 gap-2">
            <PropEditor
                prop={displayProp}
                element={element}
            />
            {
                enabledProps && enabledProps.map((prop) => (
                    <PropEditor
                        key={prop.key}
                        prop={prop}
                        element={element}
                    />
                ))
            }
        </div>
    )
};

export default LayoutPanel;

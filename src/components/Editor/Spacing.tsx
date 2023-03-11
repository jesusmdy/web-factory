import { FC, Fragment } from "react";
import { PrimitiveElement } from "../../types";
import { Tab } from "@headlessui/react";
import classNames from "classnames";
import _ from "lodash";
import PaddingPanel from "./Panels/PaddingPanel";
import MarginPanel from "./Panels/MarginPanel";
import RadiusPanel from "./Panels/RadiusPanel";

const SpacingEditor: FC<{
    element: PrimitiveElement;
}> = ({ element }) => {
    const tabs = ['Padding', 'Margin', 'Radius'];
    return (
        <div>
            <p className="text-xs p-2 border-y font-bold">Spacing</p>
            <Tab.Group>
                <Tab.List className="flex border-b">
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
                                                        'p-2 text-xs font-semibold text-zinc-600 border-b -mb-[1px] hover:bg-gray-50 flex-1',
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
                        <PaddingPanel element={element} />
                    </Tab.Panel>
                    <Tab.Panel>
                        <MarginPanel element={element} />
                    </Tab.Panel>
                    <Tab.Panel>
                        <RadiusPanel element={element} />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};

export default SpacingEditor;

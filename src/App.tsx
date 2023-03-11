import {FC, Fragment} from 'react';
import {ElementEditor, ElementLayersList, ElementViewport} from './components';
import Navbar from "./components/Navbar";
import {Provider, defaultTheme} from '@adobe/react-spectrum';

const App: FC = () => (
    <Provider theme={defaultTheme} colorScheme="light">
        <div className="h-[100vh] w-[100vw] bg-white text-black flex flex-col max-w-full">
            <Navbar />
            <div className="flex-1 flex">
                <ElementLayersList />
                <div className="flex-1">
                    <ElementViewport />
                </div>
                <ElementEditor />
            </div>
        </div>
    </Provider>
);

export default App;

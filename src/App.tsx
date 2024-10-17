import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Web3Context} from "./context/Web3Context";

import Navbar from "./components/Navbar/Navbar";
import SettingsPage from "./components/Settings/SettingsPage";
import Header from "./components/Header/Header";
import SwapPage from "./components/Swap/SwapPage";
import BridgePage from "./components/Bridge/BridgePage";
import PortfolioPage from "./components/Portfolio/PortfolioPage";



function App() {
    return (
        <Web3Context>
            <BrowserRouter>
                <div className='app-wrapper'>
                    <Header/>
                    <Navbar/>
                    <div className='app-wrapper-content'>
                        <Routes>
                            {/*<Route path="/" element={<Navigate to="/profile" />} />*/}
                            <Route path='/Portfolio' element={<PortfolioPage/>}/>
                            <Route path='/Swap' element={<SwapPage/>}/>
                            <Route path='/Bridge' element={<BridgePage/>}/>
                            <Route path='/Settings' element={<SettingsPage/>}/>
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        </Web3Context>

    );
}

export default App;

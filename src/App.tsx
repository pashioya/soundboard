import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";
import "./css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Soundboard from "./tsx/Soundboard/Soundboard";
import Soundboards from "./tsx/Soundboard/Soundboards";

function App() {
    return (
        <>
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path="/soundboards/:id" element={<Soundboard />} />
                        <Route path="/soundboards" element={<Soundboards />} />
                        <Route path="/" element={<Soundboards />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    );
}

export default App;

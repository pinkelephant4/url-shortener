import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import RedirectPage from "./pages/Redirect";
import Stats from "./pages/Stats";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/stats/:shortCode" element={<Stats />} />
                <Route path="/r/:shortCode" element={<RedirectPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;

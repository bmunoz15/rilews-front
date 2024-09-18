import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "../shared/sidebar/Sidebar";
import User from "../shared/user/User";
import HomeEws from "../early-warning-system/view/EwsHomePage"; // Adjust the path as necessary
import HomeMs from "../monitoring-system/view/MsHomePage"; // Adjust the path as necessary
import NotFound from "../shared/not-found/NotFound";
import Footer from "../shared/footer/Footer";

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Sidebar />
            <User />
            <main>
                <Routes>
                    <Route path="/" element={<HomeEws />} />
                    <Route path="/monitoring-system" element={<HomeMs />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    )
}
export default Router
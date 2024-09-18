import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "../shared/sidebar/Sidebar";
import User from "../shared/user/User";
import HomeEws from "../early-warning-system/view/EwsHomePage";
import HomeMs from "../monitoring-system/view/MsHomePage";
import NotFound from "../shared/not-found/NotFound";
import Footer from "../shared/footer/Footer";
import UserLogin from "../users/view/UserLogin";
import CreateUser from "../users/view/UserRegistry";
import UserList from "../users/view/UserList";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <Sidebar />
            <User />
            <main>
                {children}
            </main>
        </>
    );
};

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout><HomeEws /></Layout>} />
                <Route path="/monitoring-system" element={<Layout><HomeMs /></Layout>} />
                <Route path="/sign-up" element={<Layout><CreateUser /></Layout>} />
                <Route path="/users" element={<Layout><UserList /></Layout>} />
                <Route path="/sign-in" element={<UserLogin />} />

                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default Router;

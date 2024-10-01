import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "../shared/sidebar/Sidebar";
import User from "../shared/user/User";
import NotFound from "../shared/not-found/NotFound";
import UserLogin from "../users/view/UserLogin";
import CreateUser from "../users/view/UserRegistry";
import UserList from "../users/view/UserList";
import UserProfile from "../users/view/UserProfile";
import HomePage from "../rilews/views/HomePage";

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
                <Route path="/" element={<Layout> <HomePage /></Layout>} />
                <Route path="/sign-up" element={<Layout><CreateUser /></Layout>} />
                <Route path="/profile" element={<Layout><UserProfile /></Layout>} />
                <Route path="/users" element={<Layout><UserList /></Layout>} />
                <Route path="/sign-in" element={<UserLogin />} />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;

import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Sidebar from "../shared/sidebar/Sidebar";
import User from "../shared/user/User";
import NotFound from "../shared/not-found/NotFound";
import UserLogin from "../users/view/UserLogin";
import CreateUser from "../users/view/UserRegistry";
import UserList from "../users/view/UserList";
import UserProfile from "../users/view/UserProfile";
import HomePage from "../rilews/views/HomePage";
import { AuthContext } from "../users/context/AuthenticationContext";
import Loading from "../shared/loading/Loading";

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

const AppRouter: React.FC = () => {

    const { authData, isLoading } = useContext(AuthContext);
    const location = useLocation();

    if (
        isLoading &&
        location.pathname !== "/login" &&
        location.pathname !== "/"
    ) {
        return <Loading />;
    }

    return (
        <Routes location={location} key={location.pathname}>

            {authData?.access_token ? (
                <>
                    <Route path="/home" element={<Layout><HomePage /></Layout>} />
                    <Route path="/profile" element={<Layout><UserProfile /></Layout>} />
                    <Route path="/users" element={<Layout><UserList /></Layout>} />
                    <Route path="/sign-up" element={<Layout><CreateUser /></Layout>} />
                    <Route path="/sign-in" element={<Navigate to="/home" replace />} />
                    <Route path="/" element={<Navigate to="/home" replace />} />
                </>
            ) : (
                <>
                    <Route path="/sign-in" element={<UserLogin />} />
                    <Route path="/" element={<Navigate to="/sign-in" replace />} />
                    <Route path="/home" element={<Navigate to="/sign-in" replace />} />
                </>
            )}
            <Route path="/*" element={<NotFound />} />
        </Routes>
    );
};

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    );
};

export default Router;

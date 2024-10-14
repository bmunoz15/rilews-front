import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type AuthData = {
    access_token: string;
    email: string;
    role: string;
    user_id: string;
};

type AuthContextType = {
    authData: AuthData | null;
    saveAuth: (token: AuthData) => void;
    logout: () => void;
    isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
    authData: null,
    saveAuth: () => { },
    logout: () => { },
    isLoading: true,
});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [authData, setAuthData] = useState<AuthData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const saveAuth = (providedAuth: AuthData) => {
        setAuthData(providedAuth);
        localStorage.setItem('auth', JSON.stringify(providedAuth));

        setTimeout(() => {
            logout();
        }, 43200000);
    };

    const logout = () => {
        setAuthData(null);
        localStorage.removeItem('auth');
    };

    useEffect(() => {
        const savedAuth = localStorage.getItem('auth');

        if (savedAuth) {
            setAuthData(JSON.parse(savedAuth));
        } else {
            logout();
        }
        setIsLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ authData, saveAuth, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

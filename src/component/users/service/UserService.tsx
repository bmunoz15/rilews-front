import users from './mockdata/UserMock.json';
import AuthenticationHttpClient from '../http-client/AuthenticationHttpClient';
import { Access_token } from '../types/Authentication';

export const authenticationService = async (email: string, password: string): Promise<Access_token> => {
    try {
        const response = await AuthenticationHttpClient.post('/auth/login', {
            email,
            password,
        });
        const accessToken: Access_token = response.data;
        console.log(accessToken)
        return accessToken;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error(String(err));
        }
    }
}

export const logoutService = async (access_token: string): Promise<string> => {
    try {
        const response = await AuthenticationHttpClient.post('/auth/logout', {
            access_token
        });
        return response.data;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);

        } else {
            throw new Error(String(err));
        }
    }
}

export interface User {
    user_id: number;
    email: string;
    organizacion: string;
    nombre: string;
    apellido: string;
}

export const getUserById = async (id: number): Promise<User> => {

    try {
        const user = users.find((user: User) => user.user_id === id);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        return user;

    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error(String(err));
        }
    }
};

export const getUserByEmail = async (email: string): Promise<User> => {
    try {
        const user = users.find((user: User) => user.email === email);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        return user;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error(String(err));
        }
    }
};

export const getAllUsers = async (): Promise<User[]> => {
    try {
        return users;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error(String(err));
        }
    }
};
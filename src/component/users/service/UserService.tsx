import users from './mockdata/UserMock.json';
import { AuthenticationHttpClient, UserHttpClient } from '../http-client/AuthenticationHttpClient';
import { Access_token } from '../types/Authentication';

export const authenticationService = async (email: string, password: string): Promise<Access_token> => {
    try {
        const response = await AuthenticationHttpClient.post('/login', {
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
        const response = await AuthenticationHttpClient.post('/logout', {
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
    id: number;
    email: string;
    organization: string;
    fullname: string;
    lastname: string;
}

export const getUserById = async (id: number): Promise<User> => {

    try {
        const response = await UserHttpClient.get('/user/' + id);
        const user: User = response.data;
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
        const response = await UserHttpClient.get('/admin');
        return response.data;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error(String(err));
        }
    }
}

export const createUser = async (user: UserRegistration): Promise<User> => {
    try {
        const response = await UserHttpClient.post('/admin/register', {
            ...user,
        });
        return response.data;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error(String(err));
        }
    }
};

export interface UserRegistration {
    email: string;
    password: string;
    fullname: string;
    lastname: string;
    organization: string;
}
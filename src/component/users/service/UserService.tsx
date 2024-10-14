import authusers from './mockdata/AuthMock.json';
import users from './mockdata/UserMock.json';

export const loginService = async (email: string, password: string) => {

    try {
        const user = authusers.find((user: any) => user.email === email && user.password === password);

        if (!user) {
            throw new Error('Credenciales incorrectas');
        }

        return { token: user.token };
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error(String(err));
        }
    };
};

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
import { axios } from './../utils/axios';
import { User } from '../../types';
import { BASE_URL } from './constants';

type Response = {
    jwt: string,
    user: Omit<User, 'jwt'>
}

export const submit = async (username: string, password: string): Promise<User> => {
    const resp = await axios.post<Response>(`${BASE_URL}/auth/local`, {
        identifier: username,
        password: password,
    });
    return {
        jwt: resp.data.jwt,
        ...resp.data.user,
    };
}

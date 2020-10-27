import * as React from 'react';
import { User } from './../../types/index';


export const defaultUser: User = {
    jwt: '',
    blocked: true,
    confirmed: false,
    created_at: '',
    email: '',
    id: 0,
    provider: '',
    role: {
        description: '',
        id: 0,
        name: '',
        type: ''
    },
    updated_at: '',
    username: '',
};


export const UserContext = React.createContext(defaultUser);

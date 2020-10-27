import * as React from 'react';
import './Login.scss';
import { FormGroup, Label, InputGroup, Button, Intent, Toast } from '@blueprintjs/core';
import { navigate } from '@reach/router';
import { submit } from './../actions/login.action';
import { User } from './../../types/index';

type Props = {
    setUserContext: (user: User) => void;
    path: string;
}

export const Login = (props: Props): JSX.Element => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');

    const updateUsername = (evt: React.FormEvent<HTMLElement>) => {
        const { value } = evt.target as unknown as HTMLInputElement;
        setUsername(value);
    }

    const updatePassword = (evt: React.FormEvent<HTMLElement>) => {
        const { value } = evt.target as unknown as HTMLInputElement;
        setPassword(value);
    }

    const submitHandler = async (evt: React.FormEvent<unknown>) => {
        evt.preventDefault();
        const user = await submit(username, password).catch((err) => {
            console.log({ err });
            setErrorMessage('Invalid username/email or password combination');
        });
        if (user) {
            props.setUserContext(user);
            navigate('/docs');
        }
    }

    const clearError = () => setErrorMessage('');

    return (
        <>
        {errorMessage && (<Toast onDismiss={clearError} intent={Intent.DANGER} message={errorMessage}  />)}
        <section className="login">
            <form action="" onSubmit={submitHandler}>
            <legend>Login Section</legend>

            <FormGroup>
                <Label htmlFor='username'>Username:
                    <InputGroup id="username" value={username} placeholder="Type username" onChange={updateUsername} />
                </Label>
                <Label htmlFor='password'>Password:
                    <InputGroup id='password' value={password} placeholder='Type password' onChange={updatePassword} />
                </Label>
            </FormGroup>
            <Button text={'Submit form'} intent={Intent.PRIMARY} onClick={submitHandler} />

            </form>
        </section>
        </>
    )
}
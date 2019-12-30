import React, { Fragment, useState, FormEvent, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { LOGIN, IS_AUTHENTICATED } from '../queries';
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [login] = useMutation(LOGIN);
    const { data } = useQuery(IS_AUTHENTICATED);
    const history = useHistory();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const fieldName = e.target.name;
        const fieldValue = e.target.value;

        if (fieldName === 'username') {
            setUsername(fieldValue);
        } else {
            setPassword(fieldValue);
        }
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login({ 
            variables: { username, password },
        })
        .then(res => { 
            localStorage.setItem('isAuthenticated', 'true');
            history.push('/');
        })
    }

    useEffect(() => {
        if (data.isAuthenticated) {
            history.push('/');
        }
    })

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="userName">Username</label>
                <input type="text" name="username" value={username} onChange={onChange} />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={password} onChange={onChange} />
            </div>
            <div>
                <button type="submit" className="waves-effect waves-light btn right">Login</button>
            </div>
        </form>
    )
};

export default Login;
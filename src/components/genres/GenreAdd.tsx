import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import ViewAdd from '../master/ViewAdd';
import { GET_GENRES as query } from '../../queries';

const GenreAdd = () => {
    const history = useHistory();
    const [addGenre] = useMutation(ADD_GENRE);
    const [name, setName] = useState('');

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setName(e.target.value);
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addGenre({
            variables: {
                name
            },
            refetchQueries: [
                {
                    query
                }
            ]
        })
        .then(res => history.push('/genres'))
        .catch(err => console.log(err))
    }

    const fields = [
        <div key="name"><label htmlFor="name">Name</label><input type="text" name="name" value={name} onChange={onChange} /></div>
    ];

    return <ViewAdd title="Add a genre" onSubmit={onSubmit} fields={fields} />
}


const ADD_GENRE = gql`
    mutation AddGenre($name: String) {
        addGenre(name: $name) {
            id
            name
        }
    }
`;

export default GenreAdd;
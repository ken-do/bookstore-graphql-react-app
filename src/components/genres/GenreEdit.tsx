import React, { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useHistory, useParams } from 'react-router-dom';

import { GET_GENRES as query } from '../../queries';
import ViewEdit from '../master/ViewEdit';

const GenreAdd = () => {
    let { id } = useParams();
    const history = useHistory();

    const [editGenre] = useMutation(EDIT_GENRE);

    const { loading, error, data } = useQuery(GET_GENRE, {
        variables: { id },
        onCompleted: (data) => {
            setName(data.genre.name)
        }
    });

    const [name, setName] = useState('');

    if (loading) return <div>...Loading</div>;
    if (error) return <div></div>;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        editGenre({
            variables: {
                id,
                name
            },
            refetchQueries: [
                {
                    query
                }
            ]
        })
            .then(res => history.push('/genres'))
            .catch(err => console.log(err));
    }

    const fields = [
        <div key="name"><label htmlFor="name">Name</label><input type="text" name="name" value={name} onChange={onChange} /></div>
    ];

    return <ViewEdit title="Edit genre" onSubmit={onSubmit} fields={fields} />
}

const GET_GENRE = gql`
    query Genre($id: String!) {
        genre(id: $id) {
            id
            name
        }
    }
`;

const EDIT_GENRE = gql`
    mutation EditGenre($id: ID!, $name: String) {
        editGenre(id: $id, name: $name) {
            id
            name
        }
    }
`;

export default GenreAdd;
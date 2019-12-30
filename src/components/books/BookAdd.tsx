import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import ViewAdd from '../master/ViewAdd';

const GenreAdd = () => {
    const history = useHistory();
    const [addBook] = useMutation(ADD_BOOK);
    const [title, setTitle] = useState('');

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setTitle(e.target.value);
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addBook({
            variables: {
                title
            }
        })
        .then(res => history.push('/books'))
        .catch(err => console.log(err));
    }

    const fields = [
        <div><label htmlFor="title">Title</label><input type="text" title="title" value={title} onChange={onChange} /></div>
    ];

    return <ViewAdd title="Add a book" onSubmit={onSubmit} fields={fields} />
}


const ADD_BOOK = gql`
    mutation AddBook($title: String) {
        addBook(title: $title) {
            id
            title
        }
    }
`;

export default GenreAdd;
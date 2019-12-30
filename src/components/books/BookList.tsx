import React, { Fragment, useEffect } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { GET_BOOKS } from '../../queries';
import ViewList from '../master/ViewList';
import BookAdd from './BookAdd';

interface IBook {
    id: string,
    title: string,
}

const BookList: React.FC = () => {
    const match = useRouteMatch();
    const { loading, error, data } = useQuery(GET_BOOKS);
    
    if (loading) return <Fragment>'...Loading'</Fragment>;
    if (error) return <Fragment>{error}</Fragment>;

    const items = data.books.map(({ id, title }: IBook) => {
        return <li className="collection-item" key={id}>{title}</li>
    });

    return (
        <Switch>
            <Route path={`${match.path}/add`}>
                <BookAdd />
            </Route>
            <Route path={match.path}>
                <ViewList title="Books List">
                    {items}
                </ViewList>
            </Route>
        </Switch>
    )
}

export default BookList;
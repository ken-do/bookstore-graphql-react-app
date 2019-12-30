import React from 'react';
import { Switch, Route } from 'react-router-dom';
import BookList from './books/BookList';
import GenreList from './genres/GenreList';

const Dashboard: React.FC = () => {
    return (
        <Switch>
            <Route path="/books">
                <BookList />
            </Route>
            <Route path="/genres">
                <GenreList />
            </Route>
            <Route path="">
                <BookList />
            </Route>
        </Switch>
    )
}

export default Dashboard;
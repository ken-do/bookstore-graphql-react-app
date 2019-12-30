import React, { Fragment, useEffect } from 'react';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { GET_GENRES } from '../../queries';
import ViewList from '../master/ViewList';
import GenreAdd from './GenreAdd';
import GenreEdit from './GenreEdit';

interface IGenre {
    id: string,
    name: string,
}

const GenreList: React.FC = () => {
    const match = useRouteMatch();
    const history = useHistory();
    const [deleteGenre] = useMutation(DELETE_GENRE);
    const { loading, error, data, refetch } = useQuery(GET_GENRES);

    if (loading) return <Fragment>'...Loading'</Fragment>;
    if (error) return <Fragment>{error}</Fragment>;

    const onDelete = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
        deleteGenre({
            variables: {
                id
            }
        })
            .then(res => refetch())
            .catch(err => console.log(err))
    }

    const onEdit = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
        history.push(`${match.url}/${id}`)
    }

    const items = data.genres.map(({ id, name }: IGenre) => {
        return (
            <li className="collection-item" key={id}>
                {name}
                <div className="right">
                    <a onClick={(e) => onEdit(e, id)}><i className="material-icons">edit</i></a>
                    <a onClick={(e) => onDelete(e, id)}><i className="material-icons">delete</i></a>
                </div>
            </li>
        )
    });

    return (
        <Switch>
            <Route path={`${match.path}/add`}>
                <GenreAdd />
            </Route>
            <Route path={`${match.path}/:id`}>
                <GenreEdit />
            </Route>
            <Route path={match.path}>
                <ViewList title="Genres List">
                    {items}
                </ViewList>
            </Route>
        </Switch>

    )
}

const DELETE_GENRE = gql`
    mutation DeleteGenre($id: ID!) {
        deleteGenre(id: $id) {
            id
        }
    }
`;


export default GenreList;
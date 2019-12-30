import React, { Fragment, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

interface IProps {
    children: React.ReactNode,
    title: string
}

const ViewList: React.FC<IProps> = ({ children, title }) => {

    const match = useRouteMatch();
    const history = useHistory();

    const addItem = () => {
        const path = match.path !== '/' ? match.path : '/books'
        history.push(`${path}/add`);
    }

    return (
        <div className="book-list">
            <ul className="collection with-header">
                <li className="collection-header"><h4>{title}</h4></li>
                {children}
            </ul>
            <div className="add-book-btn">
                <a className="btn-floating btn-large waves-effect waves-light red right" onClick={addItem}>
                    <i className="material-icons">add</i>
                </a>
            </div>
        </div>
    )
}

export default ViewList;
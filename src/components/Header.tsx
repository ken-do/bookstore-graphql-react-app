import React from 'react';
import { Link } from 'react-router-dom';
import { IS_AUTHENTICATED, LOGOUT } from '../queries';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useHistory, useRouteMatch } from 'react-router-dom';

const Header: React.FC = () => {
    const { data } = useQuery(IS_AUTHENTICATED);
    const [logout] = useMutation(LOGOUT);
    const history = useHistory();
    const match = useRouteMatch();

    const onLogout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        logout()
            .then(() => {
                localStorage.removeItem('isAuthenticated');
                history.push('/login');
            })
    }

    const links = !data.isAuthenticated ?
        <li><Link to="/login">Login</Link></li> :
        [
            <li key="books"><Link to='/books'>Books</Link></li>,
            <li key="genres"><Link to='/genres'>Genres</Link></li>,
            <li key="logout"><a onClick={onLogout}>Logout</a></li>
        ]

    return (
        <nav>
            <div className="nav-wrapper">
                <div className="col s12">
                    <Link to="/" className="brand-logo">GraphQL Store</Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {links}
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default Header;
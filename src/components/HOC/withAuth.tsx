import React, { useEffect } from 'react';
import { IS_AUTHENTICATED } from '../../queries';
import { useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

const withAuth = (WrappedComponent: React.FC) => {
    return (props: object) => {
        const history = useHistory();
        const { data } = useQuery(IS_AUTHENTICATED);

        useEffect(() => {
            if (!data.isAuthenticated) {
                history.push('/login');
            }
        })


        return (
            <WrappedComponent {...props} />
        )
    }
};

export default withAuth;
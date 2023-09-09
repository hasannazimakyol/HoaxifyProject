<<<<<<< HEAD
import React from 'react';
import ProfileCard from '../components/ProfileCard';

const UserPage = (props) => {
    return (
        <div className='container'>
            <ProfileCard username={props.username}/>
=======
import React, { useEffect, useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import { getUser } from '../api/apiCalls';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from '../components/Spinner';

const UserPage = (props) => {

    const [user, setUser] = useState({});
    const [notFound, setNotFound] = useState(false);

    // const [username] = props.match.params;
    const { username } = useParams();
    const { t } = useTranslation();

    const pendingApiCall = useApiProgress('get', '/api/1.0/users/' + username);

    useEffect(() => {
        setNotFound(false);
    }, [user]);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await getUser(username);
                setUser(response.data);
            } catch (error) {
                setNotFound(true);
            }
        }
        loadUser();
    }, [username]);

    if (pendingApiCall) {
        return (
            <Spinner />
        );
    }

    if (notFound) {
        return (
            <div className='container'>
                <div className="alert alert-danger text-center">
                    <div>
                        <i className="material-icons" style={{ fontSize: '48px' }}>error</i>
                    </div>
                    {t('UserNotFound')}</div>
            </div>
        )
    }

    return (
        <div className='container'>
            <ProfileCard user={user} />
>>>>>>> 1228ac1633a57b02e146b9c0c26cca9cd0f67b35
        </div>
    );
};

export default UserPage;
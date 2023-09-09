<<<<<<< HEAD
import React, { Component } from 'react';
import { getUsers } from '../api/apiCalls';
import { withTranslation } from 'react-i18next';

class UserList extends Component {

    state = {
        users: []
    }

    componentDidMount() {
        getUsers().then(response => {
            this.setState({
                users: response.data
            });
        });
    }

    render() {
        const { users } = this.state;
        const { t } = this.props;

        return (
            <div className='card'>
                <h3 className='card-header text-center'>{t("Users")}</h3>
                <div className='list-group'>
                    {users.map(user => (
                        <div className='list-group-item list-group-item-action' key={user.username}>{user.username}</div>
                    ))}
                </div>
            </div>
        );
    }
}

export default withTranslation()(UserList);    
=======
import React, { useEffect, useState } from 'react';
import { getUsers } from '../api/apiCalls';
import { useTranslation } from 'react-i18next';
import UserListItem from './UserListItem';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from './Spinner';

const UserList = () => {

    const [page, setPage] = useState({
        content: [],
        size: 3,
        number: 0
    });

    const [loadFailure, setLoadFailure] = useState(false);

    const pendingApiCall = useApiProgress('get', '/api/1.0/users?page');

    useEffect(() => {
        loadUsers();
    }, []); // [] componentDidMount

    const onClickNext = () => {
        const nextPage = page.number + 1;
        loadUsers(nextPage);
    }

    const onClickPrevious = () => {
        const previousPage = page.number - 1;
        loadUsers(previousPage);
    }

    const loadUsers = async (page) => {
        setLoadFailure(false);
        try {
            const response = await getUsers(page);
            setPage(response.data);
        } catch (error) {
            setLoadFailure(true);
        }
        // getUsers(page).then(response => {
        //     setPage(response.data);
        // }).catch(error => {
        //     setLoadFailure(true);
        // })
    }

    const { t } = useTranslation();
    const { content: users, last, first } = page;

    let actionDiv = (
        <div>
            {first === false && <button className='btn btn-light' onClick={onClickPrevious} width='50'>{t('Previous')}</button>}
            {last === false && <button className='btn btn-light float-end' onClick={onClickNext}>{t('Next')}</button>}
        </div>
    );

    if (pendingApiCall) {
        actionDiv = (
            <Spinner />
        )
    }

    return (
        <div className='card'>
            <h3 className='card-header text-center'>{t("Users")}</h3>
            <div className='list-group'>
                {users.map(user => (
                    <UserListItem key={user.username} user={user} />
                ))}
            </div>
            {actionDiv}
            {loadFailure && <div className='text-center text-danger'>{t('LoadFailure')}</div>}
            {/* {!last && <button></button>}  eğer &&'den önceki koşul true dönerse sağdaki yapıyı göster */}
        </div>
    );
}

export default UserList;    
>>>>>>> 1228ac1633a57b02e146b9c0c26cca9cd0f67b35

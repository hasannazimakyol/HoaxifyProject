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
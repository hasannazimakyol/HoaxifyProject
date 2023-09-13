import React, { useState } from 'react';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { Link } from 'react-router-dom';
import TimeAgo from 'javascript-time-ago';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { deleteHoax } from '../api/apiCalls';
import Modal from './Modal';
import { useApiProgress } from '../shared/ApiProgress';

const HoaxView = (props) => {
    const loggedIndUser = useSelector(store => store.username);
    const { hoax, onDeleteHoax } = props;
    const { user, content, timestamp, fileAttachment, id } = hoax;
    const { username, displayName, image } = user;
    const [modalVisible, setModalVisible] = useState(false);
    const { i18n, t } = useTranslation();

    const pendingApiCall = useApiProgress('delete', `/api/1.0/hoaxes/${id}`, true);

    const onClickDelete = async () => {
        await deleteHoax(id);
        onDeleteHoax(id);
    }

    const onClickCancel = () => {
        setModalVisible(false);
    }

    TimeAgo.setDefaultLocale(i18n.language);
    const timeAgo = new TimeAgo();
    const formatted = timeAgo.format(timestamp);

    const ownedByLoggedInUser = loggedIndUser === username;

    return (
        <>
            <div className='card p-1'>
                <div className='d-flex'>
                    <ProfileImageWithDefault image={image} width='32' height='32' className='rounded-circle m-1' />
                    <div className='flex-fill m-auto pl-2'>
                        <Link to={`/user/${username}`} className='text-dark text-decoration-none'>
                            <h6>{displayName}@{username}</h6>
                            <span>{formatted}</span>
                        </Link>
                    </div>
                    {ownedByLoggedInUser &&
                        (<button className='btn btn-delete-link btn-sm' onClick={() => (setModalVisible(true))}>
                            <span className="material-symbols-outlined">delete</span>
                        </button>)}
                </div>
                <div className='pl-5'> {content}</div>
                {fileAttachment && (
                    <div className='pl-5'>
                        {fileAttachment.fileType.startsWith('image') && (
                            <img className='img-fluid' src={'images/attachments/' + fileAttachment.name} alt={content} />
                        )}
                        {!fileAttachment.fileType.startsWith('image') && (
                            <strong>Hoax has unknown attachment</strong>
                        )}
                    </div>
                )}
            </div>
            <Modal visible={modalVisible}
                onClickCancel={onClickCancel}
                onClickOk={onClickDelete}
                pendingApiCall={pendingApiCall}
                title={t('DeleteHoax')}
                okButton={t('DeleteHoax')}
                message={
                    <div>
                        <div>
                            <strong>{t('AreYouSureToDeleteHoax')}</strong>
                        </div>
                        <span>{content}</span>
                    </div>
                }
            />
        </>
    );
};

export default HoaxView;
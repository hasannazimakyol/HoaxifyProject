import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { useTranslation } from 'react-i18next';
import Input from './Input';
import { deleteUser, updateUser } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';
import { logoutSuccess, updateSuccess } from '../redux/authActions';
import Modal from './Modal';

const ProfileCard = (props) => {

    const [inEditMode, setInEditMode] = useState(false);
    const [updatedDisplayName, setUpdatedDisplayName] = useState();
    const { username: loggedInUsername } = useSelector((store) => ({ username: store.username }));
    const routeParams = useParams();
    const pathUsername = routeParams.username;
    const [user, setUser] = useState({});
    const [editable, setEditable] = useState(false);
    const [newImage, setNewImage] = useState();
    const [validationErrors, setValidationErrors] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        setUser(props.user);
    }, [props.user]);

    useEffect(() => {
        setEditable(pathUsername === loggedInUsername);
    }, [pathUsername, loggedInUsername]);

    useEffect(() => {
        setValidationErrors((previousValidationErrors) => {
            return {
                ...previousValidationErrors,
                displayName: undefined
            }
        });
    }, [updatedDisplayName]);

    useEffect(() => {
        setValidationErrors((previousValidationErrors) => {
            return {
                ...previousValidationErrors,
                image: undefined
            }
        });
    }, [newImage]);

    const { t } = useTranslation();
    // const pathUsername = props.match.params.username;
    // const { user } = props;
    const { username, displayName, image } = user;

    useEffect(() => {
        if (!inEditMode) {
            setUpdatedDisplayName(undefined);
            setNewImage(undefined);
        } else {
            setUpdatedDisplayName(displayName);
        }
    }, [inEditMode, displayName]);

    const onClickSave = async () => {

        let image;
        if (newImage) {
            image = newImage.split(',')[1];
        }

        const body = {
            displayName: updatedDisplayName,
            image
        };

        try {
            const response = await updateUser(username, body);
            setInEditMode(false);
            setUser(response.data);
            dispatch(updateSuccess(response.data));
        } catch (error) {
            if (error.response.data.validationErrors) {
                setValidationErrors(error.response.data.validationErrors);
            }
        }

    }

    const onChangeFile = (event) => {
        if (event.target.files.length < 1) {
            return;
        }
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setNewImage(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    };

    const onClickDeleteUser = async () => {
        try {
            const response = await deleteUser(username);
            setModalVisible(false);
            dispatch(logoutSuccess());
            history.push('/');
        } catch (error) {}
    };

    const onClickCancel = () => {
        setModalVisible(false);
    };

    const pendingApiCall = useApiProgress('put', '/api/1.0/users/' + username);
    const pendingApiCallDeleteUser = useApiProgress('delete', '/api/1.0/users/' + username, true);

    const { displayName: displayNameError, image: imageError } = validationErrors;

    return (
        <>
            <div className='card text-center'>
                <div className='card-header'>
                    <ProfileImageWithDefault className='rounded-circle shadow' width='200' height='200'
                        alt={`${username} profile`} image={image} tempimage={newImage} />
                </div>
                <div className='card-body'>
                    {!inEditMode &&
                        // div ya da aç kapa yaparak react fragment kullanılır
                        (<>
                            <h3>{displayName}@{username}</h3>
                            {editable &&
                                (<>
                                    <button className='btn btn-success d-inline-flex' onClick={() => setInEditMode(true)}>
                                        <span className="material-symbols-outlined pr-2">edit</span>
                                        {t('Edit')}
                                    </button>
                                    <div className='pt-2'>
                                        <button className='btn btn-danger d-inline-flex' onClick={() => setModalVisible(true)}>
                                            <span className="material-symbols-outlined pr-2">person_remove</span>
                                            {t('DeleteMyAccount')}
                                        </button>
                                    </div>
                                </>)
                            }
                        </>)
                    }
                    {inEditMode && (
                        <div>
                            <Input label={t('ChangeDisplayName')} defaultValue={displayName}
                                error={displayNameError}
                                onChange={event => {
                                    setUpdatedDisplayName(event.target.value);
                                }}>
                            </Input>
                            <Input type='file' onChange={onChangeFile} error={imageError} />
                            {/* <div className="container"> */}
                            <ButtonWithProgress className='btn btn-primary d-inline-flex m-2' onClick={onClickSave}
                                disabled={pendingApiCall} pendingApiCall={pendingApiCall}
                                text={<>
                                    <span className="material-symbols-outlined pr-2">save</span>
                                    {t('Save')}
                                </>}>
                            </ButtonWithProgress>
                            <button className='btn btn-primary d-inline-flex m-2'
                                onClick={() => setInEditMode(false)}
                                disabled={pendingApiCall}>
                                <span className="material-symbols-outlined pr-2">backspace</span>
                                {t('Cancel')}
                            </button>
                            {/* </div> */}
                        </div>
                    )}
                </div>

                <Modal
                    visible={modalVisible}
                    onClickCancel={onClickCancel}
                    onClickOk={onClickDeleteUser}
                    pendingApiCall={pendingApiCallDeleteUser}
                    title={t('DeleteMyAccount')}
                    okButton={t('DeleteMyAccount')}
                    message={
                        <div>
                            <div>
                                <strong>{t('AreYouSureToDeleteProfile')}</strong>
                            </div>
                        </div>
                    }
                />
            </div>
        </>
    );
};

export default ProfileCard;
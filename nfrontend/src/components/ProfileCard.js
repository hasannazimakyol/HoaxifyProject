import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { useTranslation } from 'react-i18next';
import Input from './Input';
import { updateUser } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';
import { updateSuccess } from '../redux/authActions';

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
    const dispatch = useDispatch();

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
    }

    const pendingApiCall = useApiProgress('put', '/api/1.0/users/' + username);

    const { displayName: displayNameError, image: imageError } = validationErrors;

    return (
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
                            <button className='btn btn-success d-inline-flex' onClick={() => setInEditMode(true)}>
                                <span className="material-symbols-outlined pr-2">edit</span>
                                {t('Edit')}
                            </button>
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
        </div>
    );
};

export default ProfileCard;
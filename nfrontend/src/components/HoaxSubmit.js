import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { useTranslation } from 'react-i18next';
import { postHoax, postHoaxAttachment } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';
import Input from './Input';
import AutoUploadImage from './AutoUploadImage';

const HoaxSubmit = () => {

    const { image } = useSelector((store) => ({ image: store.image }));
    const [focused, setFocused] = useState(false);
    const [hoax, setHoax] = useState('');
    const [errors, setErrors] = useState({});
    const [newImage, setNewImage] = useState();
    const [attachmentId, setAttachmentId] = useState();
    const { t } = useTranslation();

    useEffect(() => {
        if (!focused) {
            setHoax('');
            setErrors({});
            setNewImage();
            setAttachmentId();
        }
    }, [focused]);

    useEffect(() => {
        setErrors({});
    }, [hoax])

    const pendingApiCall = useApiProgress('post', '/api/1.0/hoaxes', true);
    const pendingFileUpload = useApiProgress('post', '/api/1.0/hoax-attachments', true);

    const onClickHoaxify = async () => {
        const body = {
            content: hoax,
            attachmentId: attachmentId
        }

        try {
            await postHoax(body);
            setFocused(false);
        } catch (error) {
            if (error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors);
            }
        }
    };

    const onChangeFile = (event) => {
        if (event.target.files.length < 1) {
            return;
        }
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setNewImage(fileReader.result);
            uploadFile(file);
        }
        fileReader.readAsDataURL(file);
    };

    const uploadFile = async (file) => {
        const attachment = new FormData();
        attachment.append('file', file);
        const response = await postHoaxAttachment(attachment);
        setAttachmentId(response.data.id);
    }

    let textAreaClass = 'form-control';
    if (errors.content) {
        textAreaClass += ' is-invalid'
    }

    return (
        <div className='card p-1 flex-row'>
            <ProfileImageWithDefault image={image} width='32' height='32' className='rounded-circle m-2' />
            <div className='flex-fill'>
                <textarea
                    className={textAreaClass}
                    rows={focused ? '3' : '1'}
                    onFocus={() => setFocused(true)}
                    onChange={event => setHoax(event.target.value)}
                    value={hoax}
                />
                <div className='invalid-feedback'>{errors.content}</div>
                {focused && (
                    <>
                        {!newImage && <Input type="file" onChange={onChangeFile} />}
                        {newImage && <AutoUploadImage image={newImage} uploading={pendingFileUpload}/>}
                        <div className='text-right mt-1'>
                            <ButtonWithProgress
                                className='btn btn-primary'
                                onClick={onClickHoaxify}
                                disabled={pendingApiCall || pendingFileUpload}
                                pendingApiCall={pendingApiCall}
                                text={t('Hoaxify')} />
                            <button className='btn btn-primary d-inline-flex m-2'
                                onClick={() => setFocused(false)}
                                disabled={pendingApiCall || pendingFileUpload}>
                                <span className="material-symbols-outlined pr-2">backspace</span>
                                {t('Cancel')}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default HoaxSubmit;
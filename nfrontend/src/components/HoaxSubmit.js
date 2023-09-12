import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { useTranslation } from 'react-i18next';
import { postHoax } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';

const HoaxSubmit = () => {

    const { image } = useSelector((store) => ({ image: store.image }));
    const [focused, setFocused] = useState(false);
    const [hoax, setHoax] = useState('');
    const [errors, setErrors] = useState({});
    const { t } = useTranslation();

    useEffect(() => {
        if (!focused) {
            setHoax('');
            setErrors({});
        }
    }, [focused]);

    useEffect(() => {
        setErrors({});
    }, [hoax])

    const onClickHoaxify = async () => {
        const body = {
            content: hoax
        }

        try {
            await postHoax(body);
            setFocused(false);
        } catch (error) {
            if (error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors);
            }
        }
    }

    const pendingApiCall = useApiProgress('post', '/api/1.0/hoaxes');

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
                {focused && (<div className='text-right mt-1'>
                    {/* <button className='btn btn-primary' onClick={onClickHoaxify}>Hoaxify</button> */}
                    <ButtonWithProgress
                        className='btn btn-primary'
                        onClick={onClickHoaxify}
                        disabled={pendingApiCall}
                        pendingApiCall={pendingApiCall}
                        text={t('Hoaxify')} />
                    <button className='btn btn-primary d-inline-flex m-2'
                        onClick={() => setFocused(false)}
                        disabled={pendingApiCall}>
                        <span className="material-symbols-outlined pr-2">backspace</span>
                        {t('Cancel')}
                    </button>
                </div>
                )}
            </div>
        </div>
    );
};

export default HoaxSubmit;
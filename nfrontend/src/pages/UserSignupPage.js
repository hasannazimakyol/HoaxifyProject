import React, { useState } from 'react';
import Input from '../components/Input';
import { useTranslation } from 'react-i18next';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { useApiProgress } from '../shared/ApiProgress';
import { useDispatch } from 'react-redux';
import { signupHandler } from '../redux/authActions';

const UserSignupPage = (props) => {
    const [form, setForm] = useState({
        username: null,
        agreedClicked: false,
        displayName: null,
        password: null,
        passwordRepeat: null,
    });
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const onChange = event => {
        const { name, value } = event.target; // object destruction event.target'taki value ve name property'lerini eşleştiği name value değişkenlerine atar.
        const errorsCopy = { ...errors };
        errorsCopy[name] = undefined;

        // const formCopy = { ...form };
        // formCopy[name] = value;
        // setForm(formCopy); //bu ile alttaki işlem aynı
        setForm((previousForm) => ({ ...previousForm, [name]: value }));

        setErrors((previousError) => ({ ...previousError, [name]: undefined }));
    };

    const onChangeAgree = event => {
        this.setState({
            agreedClicked: event.target.checked
        });
    };

    const onClickSignUp = async event => {
        event.preventDefault();

        const { username, displayName, password } = form;

        const { history } = props
        const { push } = history;

        const body = {
            username,
            displayName,
            password
        };

        try {
            await dispatch(signupHandler(body)); // sync
            push('/');
        } catch (error) {
            if (error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors);
            }
        }
    };
    const { t } = useTranslation();
    const { username: usernameError, displayName: displayNameError, password: passwordError } = errors;
    const pendingApiCallSignup = useApiProgress('post', '/api/1.0/users');
    const pendingApiCallLogin = useApiProgress('post', '/api/1.0/auth');

    const pendingApiCall = pendingApiCallSignup || pendingApiCallLogin;

    let passwordRepeatError;
    if(form.password !== form.passwordRepeat){
        passwordRepeatError = t('Password mismatch');
    }

    return (
        <div className="container">
            <form>
                <h1 className='text-center'>{t('SignUp')}</h1>
                <Input name="username" label={t('Username')} error={usernameError} onChange={onChange}></Input>
                <Input name="displayName" label={t('DisplayName')} error={displayNameError} onChange={onChange}></Input>
                <Input name="password" label={t("Password")} error={passwordError} onChange={onChange} type="password"></Input>
                <Input name="passwordRepeat" label={t("PasswordRepeat")} error={passwordRepeatError} onChange={onChange} type="password"></Input>
                {/* <div className='mb-3'>
                        <label>Password Repeat</label>
                        <input className="form-control" name="passwordRepeat" type="password" onChange={this.onChange} />
                    </div> */}
                <div>
                    <input type="checkbox" onChange={onChangeAgree} /> {t("Agree")}
                </div>
                <div className='text-center'>
                    <ButtonWithProgress
                        onClick={onClickSignUp}
                        disabled={passwordRepeatError !== undefined || pendingApiCall}
                        pendingApiCall={pendingApiCall}
                        text={t('Sign Up')} />
                    {/* <button className='btn btn-primary' onClick={this.onClickSignUp} disabled={pendingApiCall || passwordRepeat != undefined}>
                            {pendingApiCall && <span className='spinner-border spinner-border-sm'></span>}
                            {t('Sign Up')}
                        </button> */}
                </div>
            </form>
        </div>
    );
}

export default UserSignupPage;
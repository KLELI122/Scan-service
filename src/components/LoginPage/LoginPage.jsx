import scss from './LoginPage.module.scss'
import picture from '../../assets/login_picture.svg'
import icon from '../../assets/login_icon.svg'
import googleIcon from '../../assets/google_icon.svg'
import facebookIcon from '../../assets/facebook_icon.svg'
import yandexIcon from '../../assets/yandex_icon.svg'

import { loginRequest } from '../../requests'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { accountLogin } from '../../storage/actions/userActions'
import { useState, useRef, useEffect } from 'react'
import { validateLogin } from '../../validation'

function LoginPage() {
    
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const loginRef = useRef()
    const passwordRef = useRef()

    const [isFocusLogin, setIsFocusLogin] = useState(false)
    const [isErrorLogin, setIsErrorLogin] = useState(false)

    const [isFocusPassword, setIsFocusPassword] = useState(false)
    const [isErrorPassword, setIsErrorPassword] = useState(false)

    const [isDisabledBtn, setIsDisabledBtn] = useState(true)
    
    useEffect(() => {
        loginRef.current.value && passwordRef.current.value && setIsDisabledBtn(false)
      }, []);

    const changeFocusState = (e) => {
        switch (e.target.name) {
            case 'login':
                setIsFocusLogin(true)
            case 'password':
                setIsFocusPassword(true)
            default:
              return;
          }
    }

    const changeValueLogin = () => {
        setIsErrorLogin(validateLogin(loginRef.current.value))
        setIsDisabledBtn(validateLogin(loginRef.current.value))
    }

    const changeValuePassword = () => {
        setIsErrorPassword(validateLogin(passwordRef.current.value))
        setIsDisabledBtn(validateLogin(passwordRef.current.value))
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isDisabledBtn) {
            let data = await loginRequest(loginRef.current.value, passwordRef.current.value)
            if (data.accessToken) {
                dispatch(accountLogin(data.accessToken, data.expire))
                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("expire", data.expire);
                navigate('/')
            } else {
                setIsErrorPassword(true)
            }
        }
    }

    return <main className={scss.loginPage}>
        <h1 className={scss.title}>Для оформления подписки<br/>на тариф, необходимо авторизоваться.</h1>
        <img className={scss.picture} src={picture} alt='login'/>
        <form className={scss.form} onSubmit={handleSubmit}>
            <img className={scss.icon} src={icon} alt='login icon' />
            <ul className={scss.tabs}>
                <li className={scss.signIn}>Войти</li>
                <li className={scss.signUp}>Зарегистрироваться</li>
            </ul>
            <label>Логин или номер телефона:</label>
            <input 
                id="login"
                name="login"
                type="text"
                ref={loginRef}
                className={`${scss.input} ${isFocusLogin && isErrorLogin && scss.inputError}`}
                onFocus={(e) => changeFocusState(e)}
                onBlur={changeValueLogin}
                onChange={changeValueLogin}/>     
            <div className={scss.error}>{isFocusLogin && isErrorLogin && "Введите корректные данные"}</div>
            <label>Логин или номер телефона:</label>
            <input 
                id="password"
                name="password"
                type="password"
                ref={passwordRef}
                className={`${scss.input} ${isFocusPassword && isErrorPassword && scss.inputError}`}
                onFocus={(e) => changeFocusState(e)}
                onBlur={changeValuePassword}
                onChange={changeValuePassword}/>     
            <div className={scss.error}>{isFocusPassword && isErrorPassword && "Неправильный пароль"}</div>
            <button className={`${scss.signInBtn} ${isDisabledBtn && scss.disabled}`}>Войти</button>
            <div className={scss.restoreLink}>Восстановить пароль</div>
            <div className={scss.socials}>
                <div className={scss.title}>Войти через:</div>
                <div className={scss.btnPanel}>
                    <img src={googleIcon} alt='link to google'/>
                    <img src={facebookIcon} alt='link to facebook'/>
                    <img src={yandexIcon} alt='link to yandex'/>
                </div>
            </div>
        </form>
    </main>
}

export default LoginPage;
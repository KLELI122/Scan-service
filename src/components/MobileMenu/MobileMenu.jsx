import scss from './MobileMenu.module.scss'
import logo from '../../assets/mobile_menu_logo.svg'
import mobileMenu from '../../assets/mobile_menu.svg'
import closeMenu from '../../assets/close_menu.svg'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { accountLogout } from '../../storage/actions/userActions'

function MobileMenu() {
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const accessToken = useSelector(state => state.userReducer.account.accessToken)
    const dispatch = useDispatch()

    const changeMenuState = () => {
        setIsOpenMenu(!isOpenMenu)
    }

    return <div className={scss.mobileMenu}>
                <img 
                    src={mobileMenu} 
                    alt='mobile menu'
                    onClick={changeMenuState}/>
                {isOpenMenu &&
                <div className={scss.openMenu}>
                    <div className={scss.header}>
                        <img className={scss.logo} src={logo} alt='scan service logo'/>
                        <img 
                            className={scss.closeImg} 
                            src={closeMenu} 
                            alt='close mobile menu'
                            onClick={changeMenuState}/>
                    </div>
                    <nav className={scss.navigation}>
                        <Link to='/' onClick={changeMenuState}>Главная</Link>
                        <Link to='#'>Тарифы</Link>
                        <Link to='#'>FAQ</Link>
                    </nav>
                    <div className={scss.btnPanel}>
                        {accessToken ? 
                        <Link to='/'>
                            <button onClick={() => {dispatch(accountLogout()); changeMenuState()}}>Выйти</button>
                        </Link> : 
                        <>
                            <a className={scss.signUpBtn}>Зарегистрироваться</a>
                            <Link to='/login'>
                                <button onClick={changeMenuState}>Войти</button>
                            </Link>
                        </>}
                    </div>
                </div>}
            </div>
}

export default MobileMenu;
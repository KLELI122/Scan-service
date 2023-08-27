import scss from './Header.module.scss'
import logo from '../../assets/logo.svg'
import UserPanel from '../UserPanel/UserPanel'
import MobileMenu from '../MobileMenu/MobileMenu'
import {Link} from 'react-router-dom'

function Header() {
    return <header>
                <div>
                    <Link to='/'>
                        <img className={scss.logo} src={logo} alt='scan service logo'/>
                    </Link>
                </div>
                <nav className={scss.navigation}>
                    <Link to='/'>Главная</Link>
                    <Link to='#'>Тарифы</Link>
                    <Link to='#'>FAQ</Link>
                </nav>
                <UserPanel />
                <MobileMenu />
        </header>
}

export default Header;
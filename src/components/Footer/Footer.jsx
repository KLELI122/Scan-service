import scss from './Footer.module.scss'
import logo from '../../assets/footer_logo.svg'
import {Link} from 'react-router-dom'

function Footer() {
    return <footer>
                <Link to='/' className={scss.logo}>
                    <img src={logo} alt='scan service logo'/>
                </Link>
                <div className={scss.info}>
                    <div className={scss.contacts}>
                        г. Москва, Цветной б-р, 40<br/>
                        +7 495 771 21 11<br/>
                        info@skan.ru<br/>
                    </div>
                    <div className={scss.copyright}>
                        Copyright. 2022
                    </div>
                </div>
        </footer>
}

export default Footer;
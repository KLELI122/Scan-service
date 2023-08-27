import scss from './HomePage.module.scss'
import homePicture from '../../assets/home_picture.png'
import carouselPicture from '../../assets/carousel_picture.svg'
import MultiCarousel from '../MultiCarousel/MultiCarousel'
import RatePanel from '../RatePanel/RatePanel'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'

function HomePage() {
    const accessToken = useSelector(state => state.userReducer.account.accessToken)
    
    return  <main className={scss.homePage}>
                <section className={scss.sectionMain}>
                    <div className={scss.content}>
                        <h1 className={scss.title}>сервис по поиску<br/>публикаций<br/>о компании<br/>по его ИНН</h1>
                        <div className={scss.desc} >Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</div>
                        {accessToken && 
                        <Link to='/search'>
                            <button className={scss.requestBtn}>Запросить данные</button>
                        </Link>} 
                    </div>
                    <div className={scss.picture}>
                        <img src={homePicture} alt='home'/>
                    </div>
                </section>
                <section className={scss.sectionCarousel}>
                    <h2 className={scss.subtitle}>Почему именно мы</h2>
                    <div className={scss.carousel}>
                        <MultiCarousel />
                    </div>
                    <img 
                        className={scss.picture} 
                        src={carouselPicture} 
                        alt='carousel'/>
                </section>
                <section className={scss.sectionRates}>
                    <h2 className={scss.subtitle}>наши тарифы</h2>
                    <RatePanel/>
                </section>
            </main>
}

export default HomePage;
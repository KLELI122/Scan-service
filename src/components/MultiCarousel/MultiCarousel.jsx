import scss from './MultiCarousel.module.scss'
import rightArrow from '../../assets/carousel_right_arrow.svg'
import leftArrow from '../../assets/carousel_left_arrow.svg'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { carousel } from '../../data';

function MultiCarousel() {
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1440 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 374, min: 0 },
          items: 1
        }
    };

    const CustomRightArrow = ({ onClick, ...rest }) => {
        return <button className={scss.rightArrow} onClick={() => onClick()}>
                    <img src={rightArrow} alt='right arrow'/>
                </button>;
    };

    const CustomLeftArrow = ({ onClick, ...rest }) => {
        return <button className={scss.leftArrow} onClick={() => onClick()}>
                    <img src={leftArrow} alt='left arrow'/>
               </button>;
      };

    return <Carousel 
                customRightArrow={<CustomRightArrow />}
                customLeftArrow={<CustomLeftArrow />}
                responsive={responsive}
                className={scss.carousel}>

                {carousel.map(item => {
                    return <div 
                                key={item.id}
                                className={scss.card}>
                                <img src={item.icon} alt='card icon'/>
                                <div className={scss.desc}>{item.desc}</div>
                            </div>
                    })}
          </Carousel>;
}

export default MultiCarousel
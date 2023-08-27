import scss from './GeneralSummary.module.scss'
import rightArrow from '../../assets/carousel_right_arrow.svg'
import leftArrow from '../../assets/carousel_left_arrow.svg'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useSelector, useDispatch } from 'react-redux';
import loader from '../../assets/loading.svg'
import { useState, useEffect } from 'react';
import { searchRequest } from '../../requests'
import { initGeneralSummary } from '../../storage/actions/resultActoins'
import { resetData } from '../../storage/actions/searchActions';

function GeneralSummary() {
    const generalSummary = useSelector(state => state.resultReducer.generalSummary)
    const searchData = useSelector(state => state.searchReducer)
    const accessToken = useSelector(state => state.userReducer.account.accessToken)
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false)

    const initCarouselItems = () => {
        if (generalSummary.length >= 8) {
            return 8
        } else {
            return generalSummary.length
        }
    }

    const checkSearchData = () => {
        let result;
        searchData.map((item) => {           
            if (item.required && (!item.focus || item.focus && item.error)) {
                result = true
            }
        });
        return result
    }

    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1440 },
          items: initCarouselItems()
        },
        mobile: {
          breakpoint: { max: 374, min: 0 },
          items: 1
        }
    };

    useEffect(() => {
        const fetchRequest = async () => {
            setIsLoading(true)
            let jsonData = await searchRequest(accessToken, searchData, '/histograms')
            dispatch(initGeneralSummary(jsonData))
            setIsLoading(false)          
        }
        accessToken && !checkSearchData() && fetchRequest()
      }, [accessToken]);

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

    return <div className={scss.generalSummary}>
        <div className={scss.header}>
            <div className={scss.perod}>Период</div>
            <div>Всего</div>
            <div>Риски</div>
        </div>
        {isLoading ? <div className={scss.loader}>
            <img src={loader} alt='loader'/>
            <div className={scss.textLoader}>Загружаем данные</div>
        </div> : 
        <div className={scss.content}>
            <Carousel 
                    customRightArrow={<CustomRightArrow />}
                    customLeftArrow={<CustomLeftArrow />}
                    responsive={responsive}
                    className={scss.carousel}>
                    {generalSummary.map(item => {
                        var date = new Date(Date.parse(item.date))
                        return <div 
                                    key={item.id}
                                    className={scss.carouselItem}>
                                    <div>{date.toLocaleDateString('ru-US')}</div>
                                    <div className={scss.totalDocuments}>{item.totalDocuments}</div>
                                    <div>{item.riskFactors}</div>
                            </div> 
                        })}     
            </Carousel>
        </div>}
    </div>
}

export default GeneralSummary
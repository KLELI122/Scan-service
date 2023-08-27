import scss from './RatePanel.module.scss'
import rateMarker from '../../assets/rate_marker.svg'
import { rates } from '../../data'
import { useSelector } from 'react-redux'

function RatePanel() {
    
    const user = useSelector(state => state.userReducer)

    const initRateType = (type) => {
        switch (type) {
            case "beginner":
                return scss.begginer
            case "pro":
                return scss.pro
            case "business":
                return scss.business
            default:
              return;
          }
    }

    const initActiveRate = (type) => {
        return user.account.accessToken && user.info.rate === type && scss.active
    }

    return <div className={scss.ratePanel}>
                {rates.map(item => {
                    return <div key={item.id} className={`${scss.card} ${initRateType(item.type)} ${initActiveRate(item.type)}`}>
                                <div className={scss.header}>
                                    <div>
                                        <div className={scss.title}>{item.type}</div>
                                        <div className={scss.desc}>{item.desc}</div>
                                    </div>
                                    <img className={scss.icon} src={item.icon} alt='rate icon'/>
                                </div>
                                <div className={scss.content}>
                                    <div className={scss.pricePanel}>
                                        <button className={scss.currentRate}>Текущий тариф</button>
                                        <div className={scss.price}>
                                            <div className={scss.currentPrice}>{item.currentPrice} ₽</div>
                                            <div className={scss.previousPrice}>{item.previousPrice} ₽</div>
                                        </div>
                                        {item.installmentPrice ?
                                        <div className={scss.installmentPrice}>или {item.installmentPrice} ₽/мес. при рассрочке на 24 мес.</div> :
                                        <div className={scss.empty}>&nbsp;</div>}
                                    </div>
                                    <div>
                                        <div className={scss.rateContent}>В тариф входит:</div>
                                        {item.rateContent.map(item => {
                                            return <div key={item.id}
                                                        className={scss.contentItem}>
                                                        <img src={rateMarker} alt='marker'/>
                                                        <div>{item.content}</div>
                                                    </div>})}
                                    </div>
                                    {initActiveRate(item.type) ? 
                                    <button className={scss.personalAreaBtn}>Перейти в личный кабинет</button> :
                                    <button className={scss.moreBtn}>Подробнее</button>}
                                </div>
                            </div>})}     
            </div>  
}

export default RatePanel;
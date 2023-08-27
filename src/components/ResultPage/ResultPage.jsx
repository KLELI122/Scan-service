import scss from './ResultPage.module.scss'
import picture from '../../assets/result_picture.svg'
import GeneralSummary from '../GeneralSummary/GeneralSummary';
import DocumentsList from '../DocumentsList/DocumentsList';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { searchRequest } from '../../requests'
import { initIds } from '../../storage/actions/resultActoins';

function ResultPage() {
    const totalOptions = useSelector(state => state.resultReducer.totalOptions)
    const searchData = useSelector(state => state.searchReducer)
    const accessToken = useSelector(state => state.userReducer.account.accessToken)
    const [isLoadIds, setIsLoadIds] = useState(false)

    const dispatch = useDispatch()

    const checkSearchData = () => {
        let result;
        searchData.map((item) => {           
            if (item.required && (!item.focus || item.focus && item.error)) {
                result = true
            }
        });
        return result
    }

    useEffect(() => {
        const fetchRequest = async () => {
            setIsLoadIds(false)
            let ids = await searchRequest(accessToken, searchData, '')          
            dispatch(initIds(ids))  
            setIsLoadIds(true)
        }
        accessToken && !checkSearchData() && fetchRequest()
        
      }, [accessToken]);

    return <main className={scss.main}>
        <section className={scss.sectionMain}>
            <div>
                <h1 className={scss.title}>Ищем. Скоро<br/>будут результаты</h1>
                <div className={scss.desc}>Поиск может занять некоторое время, <br/>просим сохранять терпение.</div>
            </div>
            <img src={picture} alt='result'/>
        </section>
        <section className={scss.sectionCarousel}>
            <h2 className={scss.subtitle}>Общая сводка</h2>
            <div className={scss.totalOptions}>Найдено {totalOptions} вариантов</div>
            <GeneralSummary />
        </section>
        {isLoadIds && <DocumentsList/>}
        
    </main>
}

export default ResultPage;
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { searchDocumentsRequest } from '../../requests'
import { initDocuments } from '../../storage/actions/resultActoins';
import scss from './DocumentsList.module.scss'
import Document from "../Document/Document";

function DocumentsList() {
    const [isLoadDocuments, setIsLoadDocuments] = useState(false)
    const accessToken = useSelector(state => state.userReducer.account.accessToken)
    const documents = useSelector(state => state.resultReducer.documents)
    const ids = useSelector(state => state.resultReducer.ids)
    const [showMoreBtn, setShowMoreBtn] = useState(false)
    const [count, setCount] = useState(10)
    const dispatch = useDispatch()
    let limit = useSelector(state => state.searchReducer[2].value)
 
    const showMore = async (count, setCount, setShowMoreBtn) => {
        if (count < limit && limit - count >= 10) {
            setShowMoreBtn(false);
            let data = await searchDocumentsRequest(accessToken, ids.slice(count, count + 10));
            console.log(data)
            dispatch(initDocuments(data));
            setShowMoreBtn(true);
            (count + 10) == limit && setShowMoreBtn(false)
            setCount((count) => count + 10)

        } else if (count < limit && limit - count < 10) {
            let data = await searchDocumentsRequest(accessToken, ids.slice(count, limit))
            console.log(data)
            dispatch(initDocuments(data));
            setShowMoreBtn(false)
        } 
    }
    
    useEffect(() => {
        const fetchRequest = async () => {
            setIsLoadDocuments(false)
            let data = await searchDocumentsRequest(accessToken, ids.slice(count - 10, count))
            dispatch(initDocuments(data));
            ids.length > 10 && setShowMoreBtn(true)
            setIsLoadDocuments(true)
        }
        accessToken && fetchRequest()
      }, [accessToken]);

    return <div className={scss.documentsList}>
                <h1 className={scss.title}>Список документов</h1>
                <div className={scss.documents}>
                    {isLoadDocuments && documents.map(item => {
                        return <Document key={item.id} state={item}/>
                    })}
            </div>
            {showMoreBtn && isLoadDocuments && <div className={scss.btnPanel}>
                <button className={scss.showMoreBtn} onClick={() => showMore(count, setCount, setShowMoreBtn)}>Показать больше</button>
            </div>}
    </div>
} 

export default DocumentsList
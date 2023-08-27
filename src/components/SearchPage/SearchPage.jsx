import scss from './SearchPage.module.scss'
import document from '../../assets/document_icon.svg'
import folders from '../../assets/folders_icon.svg'
import picture from '../../assets/request_picture.svg'
import { changeFocusInput, changeBlurInput, changeValueInput } from '../../storage/actions/searchActions'
import { changeFocusDate, changeBlurDate, changeValueDate, resetData } from '../../storage/actions/searchActions'
import { useRef, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

function SearchPage() {
    const searchData = useSelector(state => state.searchReducer)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const startDateRef = useRef()
    const endDateRef = useRef()

    const checkIsError = () => {
        let result;
        searchData.map((item) => {           
            if (item.required && (!item.focus || item.focus && item.error)) {
                result = true
            }
        });
        return result
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        !checkIsError() && navigate('/result')
    }

    useEffect(() => {
       dispatch(resetData())
      }, [resetData]);

    return <main className={scss.main}>
        <section className={scss.sectionContent}>
            <div>
                <h1 className={scss.title}>Найдите необходимые<br/>данные в пару кликов.</h1>
                <div className={scss.desc}>Задайте параметры поиска.<br/>Чем больше заполните, тем точнее поиск</div>
            </div>
            <div className={scss.icons}>
                <img src={document} alt='document icon'/>
                <img src={folders} alt='folders icon' className={scss.folderIcon}/>
            </div>
        </section>
        <section className={scss.sectionForm}>
            <form className={scss.form} onSubmit={handleSubmit}>
                <div className={scss.fieldsPanel}>
                    {searchData.map(item => {
                        if (item.type === 'text' || item.type === 'number') {
                            return <div key={item.name}
                                        className={scss.inputPanel}>
                                        <label>{item.label} 
                                            <span className={`${scss.required} ${item.focus && item.error && scss.requiredError}`}>*</span>
                                        </label>
                                        <input 
                                            id={item.name} 
                                            name={item.name}
                                            type={item.type}
                                            placeholder={item.placeholder}
                                            className={`${scss.input} ${item.focus && item.error && scss.inputError}`}
                                            onFocus={() => dispatch(changeFocusInput(item.name))}
                                            onBlur={() => dispatch(changeBlurInput(item.name))}
                                            onChange={(e) => dispatch(changeValueInput(item.name, e.target.value))}/>
                                        <div className={scss.error}>{item.focus && item.error && item.error}</div>
                                    </div>}
                        if (item.type === 'select') {
                            return <div key={item.name}
                                        className={scss.selectPanel}>
                                        <label>{item.label}</label>
                                        <select 
                                            className={scss.select}
                                            onChange={(e) => dispatch(changeValueInput(item.name, e.target.value))}>
                                            <option value='any'>Любая</option>
                                            <option value='positive'>Позитивная</option>
                                            <option value='negative'>Негативная</option>
                                        </select>
                                    </div>}
                        
                        if (item.type === 'date') {
                            return <div key={item.name}>
                                        <label>
                                            {item.label}
                                            <span className={`${scss.required} ${item.focus && item.focus && item.error && scss.requiredError}`}>*</span>
                                        </label>
                                        <div className={scss.datePanel}>
                                            <input 
                                                required
                                                id={item.startDate.id}
                                                name={item.startDate.name}
                                                type={item.type}
                                                ref={startDateRef}
                                                placeholder={item.startDate.placeholder}
                                                className={`${scss.dateSelect} ${item.focus && item.error && scss.dateSelectError}`}
                                                onFocus={() => dispatch(changeFocusDate())}
                                                onBlur={() => dispatch(changeBlurDate(startDateRef.current.value, endDateRef.current.value))}
                                                onChange={() => dispatch(changeValueDate(startDateRef.current.value, endDateRef.current.value))}/>
                                            <input 
                                                required
                                                id={item.endDate.id}
                                                name={item.endDate.name}
                                                type={item.type}
                                                ref={endDateRef}
                                                placeholder={item.endDate.placeholder}
                                                className={`${scss.dateSelect} ${item.focus && item.error && scss.dateSelectError}`}
                                                onFocus={() => dispatch(changeFocusDate())}
                                                onBlur={() => dispatch(changeBlurDate(startDateRef.current.value, endDateRef.current.value))}
                                                onChange={() => dispatch(changeValueDate(startDateRef.current.value, endDateRef.current.value))}/>
                                        </div>
                                        <div className={scss.error}>{item.focus && item.focus && item.error && item.error}</div>
                                    </div>}})}
                </div>
                <div className={scss.choosePanel}>
                    <div className={scss.checkboxes}>
                        {searchData.map(item => {
                        if (item.type === 'checkbox') {
                            return <div key={item.name} 
                                        onClick={() => dispatch(changeValueInput(item.name, !item.value))}>
                                        <input 
                                            id={item.name}
                                            name={item.name}
                                            type='checkbox'
                                            className={scss.checkbox}/>
                                        <label htmlFor={item.name}>{item.label}</label>
                                    </div>
                        }})}
                    </div>
                    <div className={scss.btnPanel}>
                        <button className={`${scss.searchBtn} ${checkIsError() && scss.disabled}`}>Поиск</button>
                        <div className={scss.requiredFields}>* Обязательные к заполнению поля</div>
                    </div>
                </div>
            </form>
            <img src={picture} alt='request'/>
        </section>
    </main>
}

export default SearchPage;
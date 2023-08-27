import scss from './Document.module.scss'

function Document(props) {
    const {state} = props
    
    return <div className={scss.document}>
        <div className={scss.header}>
            <div>{state.date} </div>
            <a href={state.url} target="_blank">{state.source}</a>
        </div>
        <div className={scss.content}>
            <div className={scss.title}>{state.title}</div>
            <div className={scss.tags}>
                {state.attributes["isTechNews"] && <div className={scss.tag}>Технические новости</div>}
                {state.attributes["isAnnouncement"] && <div className={scss.tag}>Анонсы и события</div>}
                {state.attributes["isDigest"] && <div className={scss.tag}>Сводки новостей</div>}
            </div>
            <div className={scss.picture}>
                <img src={state.img}/>
            </div>
            <div className={scss.text}>{state.content}</div>
        </div>
       
        <div className={scss.source}>
            <a href={state.url} target="_blank">
                <button className={scss.sourceBtn}>Читать в источнике</button>
            </a>
            <div className={scss.wordCount}>{state.wordCount} слов</div>
        </div>
    </div>
}

export default Document;
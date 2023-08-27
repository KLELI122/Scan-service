import scss from './UserPanel.module.scss'
import userAvatar from '../../assets/user_avatar.jpg'
import loading from '../../assets/loading.svg'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfo, accountLogout, checkExpire } from '../../storage/actions/userActions'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { infoRequest } from '../../requests'

function UserPanel() {
    const accessToken = useSelector(state => state.userReducer.account.accessToken)
    const info = useSelector(state => state.userReducer.info)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();
  
    useEffect(() => {
        const fetchRequest = async () => {
            setIsLoading(true)
            const jsonData = await infoRequest(accessToken)
            dispatch(getUserInfo(jsonData.eventFiltersInfo.usedCompanyCount, jsonData.eventFiltersInfo.companyLimit))
            setIsLoading(false)
        }
        dispatch(checkExpire())
        accessToken && fetchRequest()
      }, [accessToken]);
      
    return <div className={scss.userPanel}>
                {accessToken ? 
                <div className={scss.authUser}>
                    <div className={scss.counter}>
                        {isLoading ? 
                        <div className={scss.loading}>
                            <img src={loading} alt='loading' />
                        </div> :
                        <>
                            <div className={scss.counterRow}>
                                <div className={scss.counterTitle}>Использовано компаний </div>
                                <div className={scss.countCompany}>{info.usedCompanyCount}</div>
                            </div>
                            <div className={scss.counterRow}>
                                <div className={scss.counterTitle}>Лимит по компаниям</div>
                                <div className={scss.countLimit}>{info.companyLimit}</div>
                            </div>
                        </>}
                    </div>
                    <div className={scss.userProfile}>
                        <div className={scss.userData}>
                            <div className={scss.userName}>Елизавета К.</div>
                            <button className={scss.signOutBtn} onClick={() => dispatch(accountLogout())}>Выйти</button>
                        </div>
                        <img className={scss.userAvatar} src={userAvatar} alt='user avatar'/>
                    </div>
                </div> :
                <div className={scss.unauthUser}>
                    <button className={scss.signUpBtn}>Зарегистрироваться</button>
                    <div className={scss.delimiter}></div>
                    <Link to='/login'>
                        <button className={scss.signInBtn} >Войти</button>
                    </Link>
                </div>}
            </div>
}

export default UserPanel;
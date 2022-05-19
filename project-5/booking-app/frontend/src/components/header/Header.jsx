
import './head.css'
import Menu from '../Menu/Menu'
import SearchInput from '../features/SearchInput/SearchInput'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
const Header = (props) => {
    const { user } = useContext(AuthContext)
    return (
        <div className="header">
            <div className={props.type === 'list' ? "headerContainer listNode" : "headerContainer"}>
                <Menu />
                {
                    props.type !== 'list' &&
                    <>
                        <h1 className="headerTitle">A lifetime of discounts? It's Genius.</h1>
                        <p className="headDesc">
                            Get rewarded for your travels- unlock instant savings of 10% or more with a free Lamabooking account
                        </p>
                        {!user && <button className="headerBtn">Login / Register</button>}
                        <SearchInput />
                    </>
                }
            </div>
        </div >
    )
}

export default Header
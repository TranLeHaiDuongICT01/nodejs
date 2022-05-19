import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { faBed, faCalendarDays, faPerson } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DateRange } from 'react-date-range'
// import 'react-date-range/dist/styles.css'; // main style file
// import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns'
import { SearchContext } from '../../../context/searchContext'


import './searchInput.css'
const SearchInput = () => {

    const navigate = useNavigate()
    const [destination, setDestination] = useState("")
    const [openDate, setOpenDate] = useState(false)
    const [dates, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        }
    ])
    const [openOptions, setOpenOptions] = useState(false)
    const [options, setOptions] = useState({
        adult: 1,
        children: 1,
        room: 1
    })

    const dateHandler = (ranges) => {
        setDate([ranges.selection])
    }

    const { dispatch } = useContext(SearchContext)

    const handleSearch = () => {
        console.log(dates);
        dispatch({ type: "NEW_SEARCH", payload: { city: destination, dates: dates, options: options } })
        navigate("/hotels", { state: { destination, dates, options } })
    }

    return (
        <div className="headerSearch">
            <div className="headerSearchItem searchPlace">
                <FontAwesomeIcon icon={faBed} className='headerIcon' />
                <input type="text" placeholder='Where are you going'
                    className='headerSearchInput' onChange={(e) => setDestination(e.target.value)} />
            </div>
            <div className="dateAndOp">
                <div className="headerSearchItem">
                    <div className='headerSearchItemContainer' onClick={() => {
                        if (openOptions) {
                            setOpenOptions(false)
                        }
                        setOpenDate(!openDate)
                    }}>
                        <FontAwesomeIcon icon={faCalendarDays} className='headerIcon' />
                        <span className='headerSearchText'>{`${format(dates[0].startDate, "MM/dd/yyyy")}
                            to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
                    </div>
                    {
                        openDate &&
                        <DateRange editableDateInputs={true}
                            onChange={dateHandler}
                            moveRangeOnFirstSelection={false}
                            ranges={dates} className="date"
                            minDate={new Date()} />
                    }
                </div>

                <div className="headerSearchItem">
                    <div className='headerSearchItemContainer' onClick={() => {
                        if (openDate) setOpenDate(false)
                        setOpenOptions(!openOptions)
                    }}>
                        <FontAwesomeIcon icon={faPerson} className='headerIcon' />
                        <span className='headerSearchText'>{`${options.adult} adult. ${options.children} children. ${options.room} rooms`}</span>
                    </div>
                    {openOptions &&
                        <div className="options">
                            <div className="optionItem">
                                <span className='optionText'>Adult</span>
                                <div className='optionCounter'>
                                    <button onClick={() => { if (options.adult === 1) return; setOptions({ ...options, adult: options.adult - 1 }) }} className="optionBtn">-</button>
                                    <span className='optionItemCount'>{options.adult}</span>
                                    <button onClick={() => setOptions({ ...options, adult: options.adult + 1 })} className="optionBtn">+</button>
                                </div>
                            </div>

                            <div className="optionItem">
                                <span className='optionText'>Children</span>
                                <div className='optionCounter'>
                                    <button onClick={() => { if (options.children === 0) return; setOptions({ ...options, children: options.children - 1 }) }} className="optionBtn">-</button>
                                    <span className='optionItemCount'>{options.children}</span>
                                    <button onClick={() => setOptions({ ...options, children: options.children + 1 })} className="optionBtn">+</button>
                                </div>
                            </div>

                            <div className="optionItem">
                                <span className='optionText'>Room</span>
                                <div className='optionCounter'>
                                    <button onClick={() => { if (options.room === 1) return; setOptions({ ...options, room: options.room - 1 }) }} className="optionBtn">-</button>
                                    <span className='optionItemCount'>{options.room}</span>
                                    <button onClick={() => setOptions({ ...options, room: options.room + 1 })} className="optionBtn">+</button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>

            <div className="headerSearchItem headerSearchItemBtn">
                <button className='headerBtn' onClick={handleSearch}>Search</button>
            </div>
        </div>
    )

}

export default SearchInput
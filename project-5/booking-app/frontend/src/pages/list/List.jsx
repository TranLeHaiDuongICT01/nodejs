import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import { DateRange } from 'react-date-range'
import { format } from 'date-fns'
import useFetch from '../../hook/useFetch'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './list.css'
import SearchItem from '../../components/SearchItem/SearchItem'
import { SearchContext } from '../../context/searchContext'
const List = () => {
  const location = useLocation()
  const [openDate, setOpenDate] = useState(false)
  const [destination, setDestination] = useState(location.state.destination)
  const [dates, setDate] = useState(location.state.dates)
  const [options, setOptions] = useState(location.state.options)
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(9999999999)
  const { data, loading, error, reFetch } = useFetch(`/hotel?city=${destination}&min=${min}&max=${max}`)
  const {dispatch} = useContext(SearchContext)
  const dateHandler = (ranges) => {
    setDate([ranges.selection])
  }
  const openHandler = () => {
    if (!openDate) {
      document.getElementById('listSearch').style.width = '80vw'
    } else {
      document.getElementById('listSearch').style.width = '35vw'
    }
    setOpenDate(!openDate)
  }
  const handleClick = () => {
    reFetch()
    dispatch({ type: "NEW_SEARCH", payload: { city: destination, dates: dates, options: options } })
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch" id='listSearch'>
            <h1 className="searchTitle">Search </h1>
            <div className="listSearchItem">
              <label htmlFor="Destination">Destination</label>
              <input type="text" placeholder={destination} />
            </div>

            <div className="listSearchItem">
              <label htmlFor="Check-in Date">Check-in Date</label>
              <span className='dateText' onClick={openHandler}>{`${format(dates[0].startDate, "MM/dd/yyyy")} to 
              ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate &&
                <DateRange className='dateRange' editableDateInputs={true}
                  onChange={dateHandler}
                  moveRangeOnFirstSelection={false}
                  ranges={dates}
                  minDate={new Date()} />
              }
            </div>

            <div className="listSearchItem">
              <label>Options</label>
              <div className="listOptions">

                <div className="listOptionItem">
                  <span className="listOptionText">Min price <small> per night</small></span>
                  <input type="number" onChange={e => setMin(e.target.value)} min={0} className='listOptionInput' />
                </div>

                <div className="listOptionItem">
                  <span className="listOptionText">Max price <small> per night</small></span>
                  <input type="number" onChange={e => setMax(e.target.value)} min={0} className='listOptionInput' />
                </div>

                <div className="listOptionItem">
                  <span className="listOptionText">Adult</span>
                  <input type="number" min={1} placeholder={options.adult} className='listOptionInput' />
                </div>

                <div className="listOptionItem">
                  <span className="listOptionText">Children</span>
                  <input type="number" min={0} placeholder={options.children} className='listOptionInput' />
                </div>

                <div className="listOptionItem">
                  <span className="listOptionText">Room</span>
                  <input type="number" min={1} placeholder={options.room} className='listOptionInput' />
                </div>
              </div>
              <button onClick={handleClick}>Search</button>
            </div>

          </div>
          <div className="listResult" id="listResult">
            {!loading &&

              data.hotel.map((h, i) => (
                <SearchItem item={h} key={h._id} />
              ))

            }

          </div>
        </div>
      </div>
    </div>
  )
}

export default List

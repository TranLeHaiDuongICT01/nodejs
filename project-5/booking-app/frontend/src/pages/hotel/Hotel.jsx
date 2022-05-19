import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import {
  faLocationDot, faCircleXmark, faCircleArrowLeft,
  faCircleArrowRight
} from '@fortawesome/free-solid-svg-icons'


import './hotel.css'
import MailList from '../../components/MailList/MailList'
import Footer from '../../components/footer/Footer'
import useFetch from '../../hook/useFetch'
import { useLocation, useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/searchContext'
import { AuthContext } from '../../context/AuthContext'
import Modal from '../../components/Modal/Modal'
const Hotel = () => {
  const location = useLocation()
  const path = location.pathname.split('/')[2]
  const [slideNumber, setSlideNumber] = useState(0)
  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const { data, loading, error, reFetch } = useFetch(`/hotel/${path}`)
  const { dates, options } = useContext(SearchContext)
  const { user } = useContext(AuthContext)
  const leftHandler = () => {
    if (slideNumber === data.hotel.photos.length - 1) setSlideNumber(0)
    else setSlideNumber(slideNumber + 1)
  }
  const rightHandler = () => {
    if (slideNumber === 0) setSlideNumber(data.hotel.photos.length - 1)
    else setSlideNumber(slideNumber - 1)
  }
  const nav = useNavigate()
  const MILLISECONDS = 1000 * 60 * 60 * 24
  function dayDiff(date1, date2) {
    const timeDiff = Math.abs(date1.getTime() - date2.getTime())
    const dayDifff = Math.ceil(timeDiff / MILLISECONDS)
    return dayDifff
  }
  const days = dayDiff(dates[0].startDate, dates[0].endDate)
  const handleClick = (e) => {
    e.preventDefault()
    if(user) {
      setOpenModal(true)
    }else nav('/login')

  }
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {!loading &&
        <div className="hotelContainer">
          {open &&
            <div className="slideContainer">
              <div className="slider">
                <FontAwesomeIcon icon={faCircleXmark} onClick={() => setOpen(false)} className='close' />
                <FontAwesomeIcon icon={faCircleArrowLeft} onClick={leftHandler} className='arrow' />
                <div className="sliderWrapper">
                  <img src={data.hotel.photos[slideNumber].src} onClick={rightHandler} alt="" className="sliderImg" />
                </div>
                <FontAwesomeIcon icon={faCircleArrowRight} onClick={rightHandler} className='arrow' />
              </div>
            </div>
          }
          <div className="hotelWrapper">
            <button className="bookNow">Reserve or Book Now!</button>
            <h1 className="hotelTitle">{data.hotel.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>Elton St 125 New York</span>
            </div>
            <span className="hotelDistance">
              Excellent location - 500m from center
            </span>
            <span className="hotelPrice">
              Book a stay over ${data.hotel.cheapestPrice} at this property and get a free airport taxi
            </span>
            <div className="hotelImages">
              {data.hotel.photos.map((image, i) => (
                <div className="hotelImageWrapper">
                  <img onClick={() => {
                    setSlideNumber(i)
                    setOpen(true)
                  }} src={image.src} alt="" className="hotelImg" />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotalDetailsText">
                <h1 className="hotelTitle">{data.hotel.title}</h1>
                <p className='hotelDesc'>
                  {data.hotel.desc}
                </p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Krakoww, this property has
                  an excellent location score of 9.8!
                </span>
                <h2>
                  <b>${days * data.hotel.cheapestPrice * options.room}</b> ({days} nights)
                </h2>
                <button onClick={handleClick}>Reverse or Book Now!</button>
              </div>
            </div>
          </div>
          <div className="mailContainers">
            <MailList />
          </div>

          <div className="footerContainers">
            <Footer />
          </div>
        </div>
      }
      {openModal && <Modal setOpenModal={setOpenModal} hotelId={data.hotel._id} />}
    </div>
  )
}

export default Hotel
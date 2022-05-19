import React from 'react'
import useFetch from '../../hook/useFetch'

import './homeGuests.css'
const HomeGuests = () => {
    const { data, loading, error } = useFetch("/hotel?featured=true&limit=4")
    return (
        <div className="homeGuestList">
            {!loading &&
                data.hotel.map((h, i) => (
                    <div className="homeGuestItem" key={i}>
                        <img src={h.photos[0]} alt="" className="homeGuestImg" />
                        <span className="homeGuestName">{h.name}</span>
                        <span className="homeGuestCity">{h.city}</span>
                        <span className="homeGuestPrice">Starting from ${h.cheapestPrice}</span>
                        {h.rating &&
                            <div className="homeGuestRating">
                                <button>{h.rating}</button>
                                <span>Excellent</span>
                            </div>
                        }
                    </div>
                ))

            }
        </div>
    )
}

export default HomeGuests
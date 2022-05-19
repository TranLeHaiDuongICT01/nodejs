import React from 'react'
import { Link } from 'react-router-dom'

import './searchItem.css'
const SearchItem = ({ item }) => {
    return (
        // <div className="searchItemContainer">
        <div className='searchItem'>
            <img src="https://cf.bstatic.com/xdata/images/hotel/square600/225548443.webp?k=10db8d835949eb431934b61afd14e3e890e286f675b35e842b0bdccf34d90c69&o=&s=1" alt="" className="searchItemImg" />
            <div className="searchItemDesc">
                <p className="siTitle">{item.name}</p>
                <span className="siDistance">{item.distance}m from center</span>
                <span className="siTaxiOp">Free airport taxi</span>
                <span className="siSubtitle">Studio Apartment with Air conditioning</span>
                <span className="siFeatures">
                    {item.desc}
                </span>
                <span className="siCancelOp">Free cancellation</span>
                <span className="siCancelOpSubtitle">
                    You can cancel later, so lock in this great price today
                </span>
            </div>
            <div className="searchItemDetails">
                {item.rating &&
                    <div className="stRating">
                        <span>Excellent</span>
                        <button>{item.rating}</button>
                    </div>
                }
                <div className="siDetailText">
                    <span className="siPrice">${item.cheapestPrice}</span>
                    <span className="siTaxOp">Includes taxes and fees</span>
                    <Link to={`/hotel/${item._id}`}>
                        <button className="siCheckBtn">See availability</button>
                    </Link>

                </div>
            </div>
        </div>
        // </div>
    )
}

export default SearchItem
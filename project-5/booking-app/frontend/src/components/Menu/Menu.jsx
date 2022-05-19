import React from 'react'
import { faBed, faCar, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './menu.css'
const Menu = () => {
    return (
        <div className='headList'>
            <div className="headerListItem active">
                <FontAwesomeIcon icon={faBed} />
                <span>Stays</span>
            </div>

            <div className="headerListItem">
                <FontAwesomeIcon icon={faPlane} />
                <span>Flights</span>
            </div>

            <div className="headerListItem">
                <FontAwesomeIcon icon={faCar} />
                <span>Car rentals</span>
            </div>

            <div className="headerListItem">
                <FontAwesomeIcon icon={faBed} />
                <span>Attraction</span>
            </div>

            <div className="headerListItem">
                <FontAwesomeIcon icon={faTaxi} />
                <span>Airport taxis</span>
            </div>
        </div>
    )
}

export default Menu
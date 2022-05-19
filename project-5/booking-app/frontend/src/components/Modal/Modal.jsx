import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

import './modal.css'
const Modal = ({ setOpenModal, hotelId }) => {
    return (
        <div className='reserve'>
            <div className="rContainer">
                <FontAwesomeIcon icon={faCircleXmark}
                className='rClose' onClick={()=>setOpenModal(false)} />
                <span>Select your rooms:</span>
            </div>
        </div>
    )
}

export default Modal
import React, { useEffect } from 'react'
import useFetch from '../../hook/useFetch'

import './features.css'
const Features = () => {
    const { data, loading, error } = useFetch("/hotel/countByCity?cities=Hanoi,London,Marid")
    if (!loading) {
        const datas = data.list
        return (
            <div className='features'>
                <div className="featureItem">
                    <img className='featuredImg' src="https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=" alt="" />
                    <div className="featureTi">
                        <h1>Hanoi</h1>
                        <h2>{datas[0]} properties</h2>
                    </div>
                </div>

                <div className="featureItem">
                    <img className='featuredImg' src="https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=" alt="" />
                    <div className="featureTi">
                        <h1>London</h1>
                        <h2>{data.list[1]} properties</h2>
                    </div>
                </div>

                <div className="featureItem">
                    <img className='featuredImg' src="https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=" alt="" />
                    <div className="featureTi">
                        <h1>Marid</h1>
                        <h2>{data.list[2]} properties</h2>
                    </div>
                </div>
            </div>
        )
    } return (<></>)
}

export default Features



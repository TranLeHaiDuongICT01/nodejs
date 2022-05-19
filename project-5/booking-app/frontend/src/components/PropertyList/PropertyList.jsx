import React from 'react'
import useFetch from '../../hook/useFetch'

import './propertyList.css'
const PropertyList = () => {
    const { data, loading, error } = useFetch("/hotel/countByType")
    const images = [
        "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
        "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
        "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
        "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
        "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg"
    ]
    return (
        <div className='pList'>
            {!loading && (
                <>
                    {data &&
                        images.map((img, i) => (
                            <div className="pListItem" key={i}>
                                <img className='pListImg' src={img} alt="" />
                                <div className="pListTitles">
                                    <h1>{data[i].type}</h1>
                                    <h2>{data[i].count} {data[i].type}{data[i].count>1&&'s'}</h2>
                                </div>
                            </div>
                        ))
                    }
                </>
            )}


        </div>
    )
}

export default PropertyList
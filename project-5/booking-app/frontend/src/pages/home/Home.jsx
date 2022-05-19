import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import Features from '../../components/features/Features'
import PropertyList from '../../components/PropertyList/PropertyList'
import HomeGuests from '../../components/HomeGuests/HomeGuests'
import './home.css'
import MailList from '../../components/MailList/MailList'
import Footer from '../../components/footer/Footer'
const Home = () => {
    return (
        <div className='homeContainer'>
            <div className="mailAndHeadContainer">
                <Navbar />
                <Header />
            </div>
            <div className="featureContainer">
                <Features />
                <h1 className="homeTitle">Browse by property type</h1>
                <PropertyList />
                <h1 className="homeTitle">Home guests love</h1>
                <HomeGuests />

            </div>
            <MailList />
            <div className="footerContainer1">
                <div className="footerContainer2">
                    <Footer />
                </div>
            </div>

        </div>
    )
}

export default Home
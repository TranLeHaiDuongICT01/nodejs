import { useEffect, useState } from 'react'
import axios from 'axios'
const useFetch = (url) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const api = 'http://localhost:5000/api'
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const data = await axios.get(api + '' + url)
                setData(data.data)
                setLoading(false)
            } catch (error) {
                setError(error)
            }
            setLoading(false)
        }
        fetchData()
    }, [url])
    const reFetch = async () => {
        setLoading(true)
        try {
            const data = await axios.get(api + '' + url)
            setData(data.data)
            setLoading(false)
        } catch (error) {
            setError(error)
        }
        setLoading(false)
    }
    return { data, loading, error, reFetch }
}

export default useFetch
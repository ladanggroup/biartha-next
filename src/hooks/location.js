import React, { useState } from 'react'

export default function location() {
    const [province, setProvince] = useState([])
    const [city, setCity] = useState([])
    const [district, setDistrict] = useState([])
    const getPronvince = async () => {
        const res = await axios({
            method: 'GET',
            url: '/api/get/province',
        }).then(res => {
            // console.log(res.data)
            setProvince(res.data)
        })
    }

    const getCity = async id => {
        const res = await axios({
            method: 'GET',
            url: '/api/get/city/' + id,
        }).then(res => {
            setCity(res.data)
        })
    }

    const getDistrict = async id => {
        const res = await axios({
            method: 'GET',
            url: '/api/get/district/' + id,
        }).then(res => {
            setDistrict(res.data)
        })
    }
    return getPronvince, getCity, getDistrict, province, city, district
}

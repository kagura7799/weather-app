import sun from '../../public/images/sun.png'
import search from '../../public/images/search.svg'
import maps from '../../public/images/maps.png'
import axios from 'axios'
import {useEffect, useState} from "react";
import {ChangeEvent} from 'react';

const Weather = () => {
    const [initCityName, setInitCityName] = useState('')
    const [nameCity, setNameCity] = useState('')
    const [data, setData] = useState({
        celcius: ''
    })
    console.log(data)
    const initCity = (e: ChangeEvent<HTMLInputElement>) => {
        setInitCityName(e.target.value)
    }

    const selectCity = () => {
        setNameCity(initCityName)
    }
    const WEATHER_API: string = `https://api.openweathermap.org/data/2.5/weather?q=${nameCity}&appid=16bfa98849718de13b6e8978b87d47b8`

    useEffect(() => {
        axios.get(WEATHER_API)
            .then(res => {
                const celsiusTemp = (res.data.main.temp - 273.15).toFixed(2)
                const temperatureWithSign = parseFloat(celsiusTemp) >= 0 ? `+${celsiusTemp}°` : `${celsiusTemp}°`
                setData({...data, celcius: temperatureWithSign})
                console.log(res.data)
            })
            .catch(err => console.error(err))

    }, [nameCity]);


    return (
        <div
            className='rounded-lg mt-24 bg-cover pb-5 pt-5 text-amber-50'>
            <section className=''>
                <div
                    className='rounded-lg text-center bg-white/20 backdrop-blur-lg backdrop-opacity-50 mx-auto w-1/4'
                >
                    <div className='mx-auto'>
                        <input type="text"
                               className='pl-10 mr-5 mt-10 rounded-lg p-1.5 bg-white/20 bg-opacity-50 outline-none'
                               placeholder='Найти свой город...'
                               onChange={initCity}
                        />
                        <button
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-5 px-10 rounded-full transition active:bg-cyan-950'
                            onClick={selectCity}>
                            <img src={search} alt="search" width='40' className='absolute top-14 right-14 w-6 h-6'/>
                        </button>

                        <img src={sun} alt="sun" width='250' className='mr-auto ml-auto'/>
                        <h1 className='text-5xl'>{data.celcius}</h1>
                        <div className='flex text-center justify-center mt-5 pb-10'>
                            { nameCity !== '' ? <img src={maps} alt="map" width='25'/> : '' }
                            <h3 className='text-1xl my-auto'>{nameCity}</h3>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    );
};

export default Weather;
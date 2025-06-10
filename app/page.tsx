'use client'

import React, {useState, useEffect, ReactNode} from "react";
import {CloudRain, Haze, Thermometer} from "lucide-react";


interface inputProps {
    title: string;
    setter: (e: string) => void;
    val: string;
}

const Input = ({title, setter, val}: inputProps): ReactNode => {
    const [focus, setFocus] = useState(false);
    return <div className={'flex flex-row p-2 gap-2 group '}>
        <div>{title}:</div>
        <div className={'flex flex-col'}>
            <input className='appearance-none focus:ring-0 focus:outline-none'
                   onFocus={() => setFocus(true)}
                   onBlur={() => setFocus(false)}
                   onChange={(e) => {
                       setter(e.target.value)
                   }}
                   value={val}
            />
            <div
                className={`bg-black ${focus ? 'w-full' : 'w-0 group-hover:w-full'} transition-all duration-200 ease-in-out h-1 rounded-xl`}/>
        </div>
    </div>
}

const Home = () => {
    const [weather, setWeather] = useState<Record<string, string>>({}); // creates us a blank object to play with
    const [long, setLong] = useState<string>('');
    const [lat, setLat] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const getWeather = async () => {
            setIsLoading(true);
            try {
                const resp = await fetch(`/api/getweather?long=${long}&lat=${lat}`);
                const json = await resp.json();
                setWeather(json.weather);
            } catch (e) {
                setWeather({})
            }

            setIsLoading(false);
        }
        getWeather().catch((e) => console.error(e))
    }, [long, lat])
    console.log(weather)

    return <div className={'flex items-center justify-center p-10 h-screen'}>
        <div className={'flex flex-col bg-white text-black rounded-xl p-10'}>
            {/*<div>long:<input onChange={(e) => setLong(e.target.value)}/></div>*/}
            <div className={'flex flex-col items-end'}>
                <Input
                    title={'long'}
                    setter={(e: string) => setLong(e)}
                    val={long}
                />
                <Input
                    title={'lat'}
                    setter={(e: string) => setLat(e)}
                    val={lat}
                />
            </div>

            <div className={'h-auto transition-all ease-in-out duration-300'}>
                {isLoading ? <div className={'p-5'}>your weather is loading...</div> :
                    <div className={'flex flex-col space-y-5 p-5 justify-center'}>
                        <p>Your Weather Report</p>
                        <div className={'flex flex-row gap-1 items-center'}><Thermometer/> temp:{weather.temperature_2m}
                        </div>
                        <div className={'flex flex-row gap-1 items-center'}><CloudRain/> % rain
                            :{weather.precipitation_probability}</div>
                        <div className={'flex flex-row gap-1 items-center'}><Haze/> humidity :{weather.temperature_2m}
                        </div>
                    </div>
                }
            </div>
        </div>
    </div>
}
export default Home;
import IPut from 'iput';
import React, { useEffect, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { useDimensions } from './hooks/useDimensions';
import './index.css';
const apiKey = import.meta.env.VITE_API_KEY;
export default function App() {
    const { height } = useDimensions();
    const [ip, setIp] = useState('8.8.8.8');
    const [data, setData] = useState();
    const [position, setPosition] = useState();
    useEffect(() => {
      search()
    }, []);

   
    function search() {
        if (ip && validateIPaddress(ip)) {
           
            const getData = async () => {
                let result = (await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ip}`));
                
                let res = await result.json();
    
                setData(res);
                console.log(res);
                setPosition([res.location.lat, res.location.lng])
            }

            getData()
        }
        
    }
   
    function validateIPaddress(ip) {
        if (
            /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
                ip
            )
        ) {
            return true;
        }
        alert('You have entered an invalid IP address!');
        setIp();
        setPosition();
        return false;
    }

    return (
        <main>
            <header>
                <h1>IP Address Tracker</h1>
                <div className='input-container'>
                    <IPut
                        className='ip-input'
                        onChange={(v) => {
                            setPosition();
                            setIp(v);
                        }}
                    />
                    <button onClick={search}>
                        <FaChevronRight />
                    </button>
                </div>
            </header>
            <section className='info-container'>
                {position && data && (
                    <div>
                        <p className='info-title'>IP ADDRESS</p>
                        <p className='info-data'>{data.ip}</p>
                    </div>
                )}
                {position && data && (
                    <div>
                        <p className='info-title'>LOCATION</p>
                        <p className='info-data'>{`${data.location.city}, ${data.location.region}, ${data.location.country}`}</p>
                    </div>
                )}
                {position && data && (
                    <div>
                        <p className='info-title'>TIMEZONE</p>
                        <p className='info-data'>{data.location.timezone}</p>
                    </div>
                )}
                {position && data && (
                    <div>
                        <p className='info-title'>ISP</p>
                        <p className='info-data'>{data.org || data.isp}</p>
                    </div>
                )}
            </section>

            <section className='map-container'>
                {position && (
                    <div style={{ width: '100%', height: `${height - 200}px` }}>
                        <MapContainer
                            center={position}
                            zoom={9}
                            style={{ width: '100%', height: `100%`, zIndex: '2' }}
                        >
                            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                            <Marker position={position} />
                        </MapContainer>
                    </div>
                )}
            </section>
        </main>
    );
}

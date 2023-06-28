import IPut from 'iput';
import React, { useEffect, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { useDimensions } from './hooks/useDimensions';
import './index.css';

// const defaultData = {
//     status: 'success',
//     country: 'United States',
//     countryCode: 'US',
//     region: 'CA',
//     regionName: 'California',
//     city: 'Rosemead',
//     zip: '91770',
//     lat: 34.0648,
//     lon: -118.086,
//     timezone: 'America/Los_Angeles',
//     isp: 'Southern California Edison',
//     org: 'Southern California Edison',
//     as: 'AS7127 Southern California Edison',
//     query: '192.212.174.101',
// };

export default function App() {
    const { height } = useDimensions();

    const [ip, setIp] = useState();
    const [data, setData] = useState();
    const [position, setPosition] = useState();

    useEffect(() => {
        if (data && data?.status === 'success') {
            console.log(data);
            setPosition([data.lat, data.lon]);
        }
    }, [data]);

    function search() {
        if (ip && validateIPaddress(ip)) {
            console.log('searching for ip: ', ip);
            fetch(`http://ip-api.com/json/${ip}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data?.status === 'success') {
                        setData(data);
                    } else {
                        alert(`${data.status}: ${data.message}`);
                    }
                });
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
                        <p className='info-data'>{data.query}</p>
                    </div>
                )}
                {position && data && (
                    <div>
                        <p className='info-title'>LOCATION</p>
                        <p className='info-data'>{`${data.city}, ${data.region}, ${data.country}`}</p>
                    </div>
                )}
                {position && data && (
                    <div>
                        <p className='info-title'>TIMEZONE</p>
                        <p className='info-data'>{data.timezone}</p>
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

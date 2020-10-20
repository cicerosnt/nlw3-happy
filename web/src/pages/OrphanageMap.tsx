import React, {useEffect, useState} from 'react';

import {Link} from 'react-router-dom';
import {FiPlus, FiArrowRight} from 'react-icons/fi';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import Leaflet from 'leaflet';

import 'leaflet/dist/leaflet.css';

import '../styles/orphanege-map.css';

import mapMarkerImg from '../images/map-marker.svg';
import api from '../services/api';

interface Orphanage{
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
    iconSize:[30, 30],
    iconAnchor: [15,30],
    popupAnchor: [160, 20]
})

function OrphanegeMaps(){
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);


    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        });
    }, []); 


    return(
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg
                } alt=""/>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>

                    <footer>
                        <strong>
                            Catanduva
                        </strong>
                        <span>
                            São Paulo
                        </span>
                    </footer>
                </header>
            </aside>

            <Map 
                center={[-21.132948,-48.976935,]}
                zoom={14}
                style={{width:'100%',height:'100%'}}
            >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                {/*<TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles
                /265/{z}/{x}/{y?@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/>*/}

                {orphanages.map(orphanage => {
                    return (
                        <Marker 
                            position={[orphanage.latitude,orphanage.longitude]}
                            icon={mapIcon}
                            key={orphanage.id}
                        >
                        <Popup 
                            closeButton={false} 
                            minWidth={240} 
                            maxWidth={240}
                            className="map-poupup"
                        >
                            {orphanage.name}
                            <Link to={`/orphanages/${orphanage.id}`}>
                                <FiArrowRight size={20} color="#fff"/>
                            </Link>
                        </Popup>

                        </Marker>
                    );
                })}

            </Map>

            <Link to="/orphanages/create" className="create-orphanege">
                <FiPlus size={32} color="#FFF"/>
            </Link>
        </div>
    );
}

export default OrphanegeMaps;
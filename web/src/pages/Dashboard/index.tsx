import React, { useEffect, useState } from 'react';
import Orphanage from '../../models/Orphanage';
import { loadOrphanages } from '../../services/OrphanageService';
import { Map, Marker, TileLayer, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import pointMapperIcon from '../../assets/icon-point-mapper.svg';
import './styles.css';

export default function DashboardPage() {
  const [orphanges, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    loadOrphanages().then(
      res => setOrphanages(res),
    ).catch( () => { alert('Opss! Maybe we got an error!')})
  }, []);

  return (
    <div id="dashboard-page-container">
      <aside>
        <header>
          <img src={pointMapperIcon} alt="Happy Icon" />
          <h2>Choose an orphanage on the map</h2>
          <p>Many children are waiting for your visit.</p>
        </header>
        <footer>
          <strong>Florianópolis</strong>
          <span>Santa Catarina</span>
        </footer>
      </aside>
      <Map
        zoom={14.5}
        center={{ lat: -27.5768545, lng: -48.5163647 }}
        style={{ width: "100%", height: "100%"}}
      >
        <TileLayer 
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`} 
        />
        {
          orphanges.map( orphanage => (
            <Marker 
              key={orphanage.id}
              position={[orphanage.latitude, orphanage.longitude]}
              icon={Leaflet.icon({ 
                iconUrl: pointMapperIcon, 
                iconAnchor:[29, 68], 
                iconSize:[58, 68],
                popupAnchor: [170, 2]
              })}
            >
              <Popup 
                className="map-popup"
                closeButton={false}
                minWidth={240}
                maxHeight={240}
              >
                {orphanage.name}
                <Link 
                  to={`/orphanage/${orphanage.id}`}
                >
                  <FiArrowRight size={20} color="#FFF" />
                </Link>
              </Popup>
            </Marker>
          ))
        }
      </Map>
      <Link to="/orphanage/create" className="btn-create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
};
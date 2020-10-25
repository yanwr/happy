import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Orphanage from "../../models/Orphanage";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import Leaflet from 'leaflet';
import pointMapperIcon from '../../assets/icon-point-mapper.svg';
import SidebarComponent from "../../components/Sidebar";
import './styles.css';
import { loadOrphanages } from "../../services/OrphanageService";

interface OrphanageParams {
  id: string;
};

export default function OrphanagePage() {
  const { id } = useParams<OrphanageParams>();
  const [orphanage, setOrphanage] = useState<Orphanage>();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    loadOrphanages(id).then(
      res => setOrphanage(res)
    ).catch( () => { alert('Opss! Maybe we got an error!') })
  }, [id]);

  if(!orphanage){
    return <div>Loading ...</div>
  }
  return (
    <div id="orphanage-page-container">
      <SidebarComponent />
      <main>
        <div className="orphanage-details">
          <img src={orphanage.images && orphanage.images[selectedImageIndex].url} alt={orphanage.name} />
          <div className="images">
            { orphanage.images?.map( (orp, index) => (
              <button 
                key={orp.id}
                onClick={() => setSelectedImageIndex(index)}
                className={ selectedImageIndex === index ? "active" : "" } 
                type="button"
              >
                <img src={orp.url} alt={orphanage.name} />
              </button>
              ))
            }
          </div>
          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.descriptions}</p>
            <div className="map-container">
              <Map 
                center={[ orphanage.latitude, orphanage.longitude ]} 
                zoom={50} 
                style={{ width: '100%', height: 280 }}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`}
                />
                <Marker 
                  interactive={false} 
                  position={[ orphanage.latitude, orphanage.longitude ]}
                  icon={Leaflet.icon({
                    iconUrl: pointMapperIcon,
                    iconSize: [58, 68],
                    iconAnchor: [29, 68],
                    popupAnchor: [0, -60]
                  })} 
                />
              </Map>
              <footer>
                <a 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                >
                  See route in Google Maps
                </a>
              </footer>
            </div>
            <hr />
            <h2>Visit instructions</h2>
            <p>{orphanage.instructions}</p>
            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Monday to Friday <br />
                {orphanage.opening_hours}
              </div>
              {
                orphanage.open_on_weekend 
                  ? <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  We attend <br />
                  on weekends
                </div>
                  : <div className="open-on-weekends no-open">
                  <FiInfo size={32} color="#FF669D" />
                  We don't attend <br />
                  on weekends
                </div> 
              }
            </div>
            {/* <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button> */}
          </div>
        </div>
      </main>
    </div>
  );
}
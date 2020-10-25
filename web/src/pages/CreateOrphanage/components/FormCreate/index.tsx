import React, { useState, ChangeEvent } from 'react';
import * as Yup from 'yup';
import OrphanageForm from '../../../../models/OrphanageForm';
import Leaflet, { LeafletMouseEvent } from 'leaflet';
import { Map, Marker, TileLayer } from "react-leaflet";
import { Formik } from 'formik';
import { FiPlus } from "react-icons/fi";
import pointMapperIcon from '../../../../assets/icon-point-mapper.svg';

interface Props {
  createOrphanage: (orphanage:OrphanageForm) => void;
};

const validationSchema  = Yup.object().shape({
  name: Yup.string().required(),
  descriptions: Yup.string().required().max(300, 'Description must have max 300 caracters!'),
  instructions: Yup.string().required(),
  opening_hours: Yup.string().required(),
  open_on_weekend: Yup.boolean().required(),
  images: Yup.array(Yup.object().nullable()).nullable().required()
});

const FormCreateComponent: React.FC<Props> = ({ createOrphanage }) => {
  const initialState = {
    name: '',
    descriptions: '',
    instructions: '',
    opening_hours: '',
    open_on_weekend: false,
    images: []
  };
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  function handleCreateMarker(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    setPosition({ latitude: lat, longitude: lng });
  }

  function handleLoadImages(e: ChangeEvent<HTMLInputElement>, currentSelectedImages:any[]) {
    const images = e.target.files;
    if(!images) return;
    let newSelectedImages = Array.from(images);
    if (currentSelectedImages.length > 0) {
      newSelectedImages = currentSelectedImages.concat(newSelectedImages);
    }
    setPreviewImages(newSelectedImages.map( x => URL.createObjectURL(x)));
    return newSelectedImages;
  }

  function handleSubmit(values:any) {
    const { latitude, longitude } = position;
    createOrphanage({
      ...values,
      latitude,
      longitude,
    });
  }

  return(
    <Formik
      initialValues={initialState}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      { formikProps =>  { 
        return (
          <form 
            className="create-orphanage-form"
            onSubmit={formikProps.handleSubmit}
          >
            <fieldset>
              <legend>Datas</legend>
              <Map 
                center={[-27.4671131,-48.4750216]} 
                style={{ width: '100%', height: 280 }}
                zoom={15}
                onclick={handleCreateMarker}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`}
                />
                { (position.latitude && position.longitude) !== 0 && (
                    <Marker 
                      interactive={false}
                      icon={Leaflet.icon({
                        iconUrl: pointMapperIcon,
                        iconSize: [58, 68],
                        iconAnchor: [29, 68],
                        popupAnchor: [0, -60]
                      })} 
                      position={[position.latitude, position.longitude]} 
                    /> 
                  )
                }
              </Map>
              <div className="input-container">
                <label htmlFor="name">Name</label>
                <input 
                  id="name"
                  type="text"
                  {...formikProps.getFieldProps('name')}
                />
              </div>
              <div className="input-container">
                <label htmlFor="descriptions">Description <span>Max 300 caracters</span></label>
                <textarea 
                  id="descriptions"
                  maxLength={300}
                  {...formikProps.getFieldProps('descriptions')}
                />
              </div>
              <div className="input-container">
                <label htmlFor="images">Pictures</label>
                <div className="images-container">
                  { previewImages.map( x => (<img key={x} src={x} />))}
                  <label htmlFor="image[]" className="new-image">
                    <FiPlus size={24} color="#15b6d6" />
                  </label>
                </div>
                <input 
                  id="image[]" 
                  type="file" 
                  multiple
                  onChange={e => formikProps.setFieldValue('images', handleLoadImages(e, formikProps.values.images))}
                />
              </div>
            </fieldset>
            <fieldset>
              <legend>Visits</legend>
              <div className="input-container">
                <label htmlFor="instructions">Instructions</label>
                <textarea 
                  id="instructions"
                  {...formikProps.getFieldProps('instructions')}
                />
              </div>
              <div className="input-container">
                <label htmlFor="opening_hours">Opening Hours</label>
                <input 
                  id="opening_hours"
                  {...formikProps.getFieldProps('opening_hours')} 
                />
              </div>
              <div className="input-container">
                <label htmlFor="open_on_weekends">Attend on weekends</label>
                <div className="button-select">
                  <button 
                    type="button" 
                    className={formikProps.values.open_on_weekend ? 'active' : ''}
                    onClick={() => formikProps.setFieldValue('open_on_weekend', true)}
                  >Yes</button>
                  <button 
                    type="button"
                    className={!formikProps.values.open_on_weekend ? 'active' : ''}
                    onClick={() => formikProps.setFieldValue('open_on_weekend', false)}
                  >No</button>
                </div>
              </div>
            </fieldset>
            <button className="confirm-button" type="submit">
              Confirm
            </button>
          </form>
        )
      }}
    </Formik>
  );
};

export default FormCreateComponent;
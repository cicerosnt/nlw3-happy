import React, {useState, FormEvent, ChangeEvent} from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';

import '../styles/create-orphanage.css';
import Sidebar from "../components/Sidebar";
import MapIcon from "../utils/mapicon";
import { FiPlus } from "react-icons/fi";
import { LeafletMouseEvent } from "leaflet";
import api from "../services/api";
import { useHistory } from "react-router-dom";


export default function CreateOrphanage() {

  const history = useHistory();

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeninghours] = useState('');
  const [open_on_weekeds, SetOpenonweekds] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previwewImpages, setPreviwewImpages] = useState<string[]>([]);

  const [position, setPosition] = useState({latitude:0,longitude:0});

  function handleMapClick(event: LeafletMouseEvent){
    const {lat, lng} = event.latlng;

    setPosition({ 
      latitude: lat,
      longitude: lng,
    });
  }

  async function handlerSubmit(event: FormEvent){
    event.preventDefault();

    const {latitude, longitude} = position;

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('whatsapp', String(whatsapp));
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekeds', String(open_on_weekeds));

    images.forEach(image => {
      data.append('images', image);
    });

    await api.post('orphanages', data);

    alert('Cadastro realizado com sucesso!');

    history.push('/app');

    {/*console.log(
      name, 
      about, 
      latitude,
      longitude,
      instructions, 
      opening_hours, 
      open_on_weekeds,
      images
    )*/}
  }

  function handlerSelectImages(event: ChangeEvent<HTMLInputElement>){
    if(!event.target.files){
      return;
    }else{
      const selectImages = Array.from(event.target.files);
      setImages(selectImages);

      const selectedPreviewimages = selectImages.map(image =>{
        return URL.createObjectURL(image);
      });

      setPreviwewImpages(selectedPreviewimages);
    }
  }

  return ( 
    <div id="page-create-orphanage">
      <Sidebar/>

      <main>
        <form className="create-orphanage-form" onSubmit={handlerSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-21.1145116,-48.9505258]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
              {/*}
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />*/}

              {position.latitude !== 0 && (
                <Marker 
                  interactive={false} 
                  icon={MapIcon} 
                  position={[position.latitude,position.longitude]} 
                /> 
              )};

              {/*<Marker interactive={false} icon={MapIcon} position={[-27.2092052,-49.6401092]} />*/}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={event => setName(event.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300} value={about} onChange={event => setAbout(event.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input id="whatsapp" value={whatsapp} onChange={event => setWhatsapp(event.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previwewImpages.map(image =>{
                  return(
                    <img key={image} src={image} alt={name} />
                  )
                })}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>

                <input multiple type="file" id="image[]"
                  onChange={handlerSelectImages}/>
              </div>

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={instructions} onChange={event => setInstructions(event.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horario de funcionamiento</label>
              <input id="opening_hours" value={opening_hours} onChange={event => setOpeninghours(event.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                  type="button" 
                  className={open_on_weekeds ? 'active' : ''}
                  onClick={() => SetOpenonweekds(true)}
                >
                    Sim
                </button>
                <button  
                  type="button"
                  className={!open_on_weekeds ? 'active' : ''}
                  onClick={() => SetOpenonweekds(true)}
                > 
                  Não
                  </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;

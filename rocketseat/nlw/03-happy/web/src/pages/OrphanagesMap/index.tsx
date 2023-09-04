import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiPlus } from 'react-icons/fi'
import { Map, Marker, TileLayer, Popup } from 'react-leaflet'
import Leafleft from 'leaflet'

import { api } from '../../services/api'

import markerImg from '../../assets/marker.svg'

import 'leaflet/dist/leaflet.css'
import './styles.scss'

const mapIcon = Leafleft.icon({
  iconUrl: markerImg,
  iconSize: [48, 48],
  iconAnchor: [24, 48],
  popupAnchor: [160, 14],
})

interface Orphanage {
  id: number
  name: string
  latitude: number
  longitude: number
}

export function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([])

  useEffect(() => {
    const getOrphanages = async () => {
      const { data } = await api.get('orphanages')
      setOrphanages(data)
    }

    getOrphanages()
  }, [])

  return (
    <div id="orphanages-map">
      <aside>
        <header>
          <img src={markerImg} alt="Logo Marker" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Viamão</strong>
          <span>Rio Grande do Sul</span>
        </footer>
      </aside>

      <Map
        center={[-30.283130938144534, -51.01727204255742]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${
            import.meta.env.VITE_MAPBOX_TOKEN
          }`}
        />

        {orphanages.map((orphanage) => (
          <Marker
            key={orphanage.id}
            icon={mapIcon}
            position={[orphanage.latitude, orphanage.longitude]}
          >
            <Popup
              closeButton={false}
              minWidth={240}
              maxWidth={240}
              className="map-popup"
            >
              {orphanage.name}
              <Link to={`/orphanages/${orphanage.id}`}>
                <FiArrowRight size={20} color="#fff" />
              </Link>
            </Popup>
          </Marker>
        ))}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus />
      </Link>
    </div>
  )
}

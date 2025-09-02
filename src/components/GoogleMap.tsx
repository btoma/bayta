// components/GoogleMapComponent.tsx
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api'
import { useState } from 'react'

interface Property {
  id: number
  title: string
  price: string
  location: string
  latitude: number
  longitude: number
  image: string
}

interface GoogleMapComponentProps {
  properties: Property[]
  onPropertySelect: (property: Property | null) => void
  selectedProperty: Property | null
}

const containerStyle = {
  width: '100%',
  height: '100%',
}

const center = {
  lat: 34.0522,
  lng: -118.2437,
}

const GoogleMapComponent = ({
  properties,
  onPropertySelect,
  selectedProperty,
}: GoogleMapComponentProps) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  })

  const [activeMarker, setActiveMarker] = useState<number | null>(null)

  if (!isLoaded) return <p>Loading map...</p>

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onClick={() => {
        setActiveMarker(null)
        onPropertySelect(null)
      }}
    >
      {properties.map((property) => (
        <Marker
          key={property.id}
          position={{ lat: property.latitude, lng: property.longitude }}
          onClick={() => {
            setActiveMarker(property.id)
            onPropertySelect(property)
          }}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 7,
            fillColor: activeMarker === property.id ? 'green' : 'red',
            fillOpacity: 1,
            strokeWeight: 1,
            strokeColor: '#ffffff',
          }}
        >
          {activeMarker === property.id && (
            <InfoWindow
              position={{ lat: property.latitude, lng: property.longitude }}
              onCloseClick={() => {
                setActiveMarker(null)
                onPropertySelect(null)
              }}
            >
              <div style={{ maxWidth: 250 }}>
                <img
                  src={property.image}
                  alt={property.title}
                  style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 8 }}
                />
                <h3 style={{ margin: '10px 0', fontWeight: 600 }}>{property.title}</h3>
                <p style={{ margin: 0, color: '#555' }}>{property.location}</p>
                <p style={{ margin: '5px 0', color: '#2563eb', fontWeight: 'bold' }}>{property.price}</p>
              </div>
            </InfoWindow>
          )}
        </Marker>
      ))}
    </GoogleMap>
  )
}

export default GoogleMapComponent

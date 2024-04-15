import React from 'react'
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api'


const Map = ({latitude, longitude}) => {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY
    })
    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) =>{
        mapRef.current = map;
    }, [])
    if (loadError) return "Error";
    if(!isLoaded) return "Maps";



  return (
    <div className='w-full h-full'>
        <GoogleMap
            mapContainerStyle = {{
                height: '100%',
                width: '100%'
            }}
            center={{lat : latitude, lng : longitude}}
            zoom={12}
            onLoad={onMapLoad}
            options={{
                // Customize map controls
                mapTypeControl: true,
                fullscreenControl: false,
                streetViewControl: false,
                zoomControl: true,
                gestureHandling: 'auto',
                mapTypeControlOptions: {
                  position: window.google.maps.ControlPosition.LEFT_BOTTOM // Position type controls to bottom left
                }
              }}
        >
            <MarkerF
                position={{lat : latitude, lng : longitude}}
            />
        </GoogleMap>
    </div>
  )
}

export default Map
import React, { useRef  , useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView , {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlice';
import {GOOGLE_MAPS_APIKEY} from "@env";

const Map = () => {
   //const {origin} = useSelector(selectOrigin);
 const dispatch = useDispatch()
   const origin = useSelector(selectOrigin) ; 
   const destination = useSelector(selectDestination)
   console.log("thi is orging in map " , origin)
    const mapRef = useRef(null);
   
   useEffect(() => {
   if(!origin || !destination) return  ; 

   mapRef.current.fitToSuppliedMarkers(['origin','destination'] , {
     edgePadding:{top:50 ,right:50 , bottom:50 , left:50}
   })
   }, [origin, destination])


   useEffect(() => {
     if(!origin || !destination) return ; 
     const getTravelTime =async()=>{
      const URL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`
      const data = await fetch(URL).then(response => response.json())
      if(data.status !== 'OK') return alert(data.error_message)
      dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
     }
     getTravelTime();
   }, [origin,destination,GOOGLE_MAPS_APIKEY])
   return (
        <MapView
        ref={mapRef}
        style={tw`flex-1`}
        mapType="mutedStandard"
    initialRegion={{
      latitude: origin.location.lat,
      longitude: origin.location.lng,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    }}
  >
  {
    origin && destination && (
   <MapViewDirections
   origin={origin.description}
   destination={destination.description}
   apikey={GOOGLE_MAPS_APIKEY}
strokeWidth={3}
strokeColor="black"
   
   />

    )
  }
  
  
  
  {
    origin?.location && (<Marker 
    coordinate={{
      latitude: origin.location.lat,
      longitude: origin.location.lng,
    }}
    title="Origin"
    description={origin.description}
    identifier="origin"
    
    
    />)
  }

{
    destination?.location && (<Marker 
    coordinate={{
      latitude: destination.location.lat,
      longitude: destination.location.lng,
    }}
    title="Destination"
    description={destination.description}
    identifier="destination"
    
    
    />)
  }



  </MapView>
    )
}

export default Map

const styles = StyleSheet.create({})

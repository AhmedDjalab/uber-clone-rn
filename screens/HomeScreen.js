import React from 'react'
import { SafeAreaView, StyleSheet, Text, View  , Image} from 'react-native'
import tw from "tailwind-react-native-classnames";
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from "@env";
import { useDispatch} from "react-redux";
import {setDestination , setOrigin} from "../slices/navSlice";
import NavFavourite from '../components/NavFavourite';
const HomeScreen = () => {
 const dispatch = useDispatch();
   

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
           <View style={tw`p-5`}>
           <Image 
        style={{
            width: 100, height: 100,
            resizeMode:"contain"
        }}
        
        source={
               {
               
                 uri:"https://links.papareact.com/gzs"
               }
           }
           />    
 <GooglePlacesAutocomplete


returnKeyType={"search"}
styles={{
     container:{
         flex:0
     },
     textInput:{
         fontSize:18,
     }
 }}
 nearbyPlacesAPI="GooglePlacesSearch"
 debounce={400}
 placeholder="Where From?"
 minLength={2}
 enablePoweredByContainer={false}
query={{
    key:GOOGLE_MAPS_APIKEY, 
    language:"en"
}}
fetchDetails={true}
onPress={(data,details = null )=>{
dispatch(setOrigin({
    location:details.geometry.location , 
    description:data.description
}))

dispatch(setDestination(null))
}}

 
 
 
 />
<NavOptions />
<NavFavourite />
           </View> 

        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})

 

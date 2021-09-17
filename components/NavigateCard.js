import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from "@env";
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/core';
const NavigateCard = () => {
 const dispatch = useDispatch();
 const navigation =useNavigation();
 
    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
        <Text
        style={tw`text-center py-5 text-xl`}
        >good morning Ahmed</Text>
        <View style={tw`border-t border-gray-200 flex-shrink`}>
     <View>
         <GooglePlacesAutocomplete
         
         placeholder="Where To ?"
         debounce={400}
         styles={toInputBoxStyles}
         fetchDetails={true}
         enablePoweredByContainer={false}
         query={{
             key:GOOGLE_MAPS_APIKEY ,
             language:"en"
         }}
         nearbyPlacesAPI="GooglePlacesSearch"
          returnKeyType={"search"}
          onPress={
              (data ,details = null  )=>{

              dispatch(setDestination({
                  location :details.geometry.location ,
                  description :data.description
              }));

             navigation.navigate("RideOptionsCard")
              }
          }
        />


     </View>
        </View>
        </SafeAreaView>
    )
}

export default NavigateCard

const toInputBoxStyles = 
StyleSheet.create({
  container:{
      backgroundColor:"white",
      paddingTop:20,
      flex:0,

  },
  textInput :{
  backgroundColor:"#DDDDDF"
  , borderRadius:0 , 
  fontSize:10
  } , 
  textInputContainer:{
      paddingHorizontal:20,
      paddingBottom:0,
  }


})

import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

const NavFavourite = () => {
  const data =[ {
   id:"123",
   icon:"home",
   location:"Home" , 
   destination:"Djelfa , Algeria"
  } , 
  {
      id:"456",
      icon:"briefcase",
      location:"Friends" , 
      destination:"Birine ,Djelfa , Algeria"

  }



] ; 
  
  
  
    return (
        <FlatList />
    )
}

export default NavFavourite

const styles = StyleSheet.create({})

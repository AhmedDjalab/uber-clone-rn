import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const data=[
{
id:"123",
title:"Get a ride", 
image:"https://links.papareact.com/3pn" ,
screen:"MapScreen"
},

{
    id:"456",
    title:"order Food", 
    image:"https://links.papareact.com/28w" ,
    screen:"EatsScreen"
    },
]


const NavOptions = () => {
    return (
       <FlatList 
       keyExtractor={(item)=> item.id}
        data={data}
        horizontal
        renderItem={({item})=>{
         <TouchableOpacity  >
             <Text >{item.title}</Text>
         </TouchableOpacity>

        }}
       
       />
    )
}

export default NavOptions


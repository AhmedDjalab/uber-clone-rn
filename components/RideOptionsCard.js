import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { Alert, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { useSelector } from 'react-redux'
import tw from 'tailwind-react-native-classnames'
import { selectDestination, selectOrigin, selectTravelTimeInformation } from '../slices/navSlice'
const data = [
    {
        id: "Uber-X-123",
        title: "Uber X",
        multiplier: 1,
        image: "https://links.papareact.com/3pn"
    },
    {
        id: "Uber-XL-456",
        title: "Uber XL",
        multiplier: 1.2,
        image: "https://links.papareact.com/5w8"
    },
    {
        id: "Uber-LUX-123",
        title: "Uber LUX",
        multiplier: 1.75,
        image: "https://links.papareact.com/7pf"
    },
]

const SEARCH_CHARGE_RATE = 1.5
const RideOptionsCard = () => {
    const navigation = useNavigation() ;
    
    const [selected, setSelected] = useState(null)
    const travelTimeInformation = useSelector(selectTravelTimeInformation)
    const origin = useSelector(selectOrigin)
    const destination = useSelector(selectDestination)

    useEffect(() =>{
        if(!origin || !destination) navigation.push('NavigateCard')
    }, [origin, destination])

    const travelConst = (item) => {
        return ((travelTimeInformation?.duration?.value * SEARCH_CHARGE_RATE * item?.multiplier) / 100).toFixed(2)
    }

    const onChoose = () =>{
        Alert.alert('configurations!!!', `Car: ${selected.title} \nPrice: $${travelConst(selected)} \nDistence: ${travelTimeInformation?.distance?.text} \n${travelTimeInformation?.duration.text} Travel time`)
    }
    return (
        <SafeAreaView style={tw`bg-white flex-grow`}>
         <View >     
             <TouchableOpacity
             onPress={()=>{
               navigation.navigate("NavigateCard")
             }}
             style={tw`absolute top-3 left-5 p-3 z-50 rounded-full`}>
               <Icon name="chevron-left" type="fontawesome" /> 
            </TouchableOpacity>    
     <Text style={tw`text-center py-3 text-xl`}>Select a Ride - {travelTimeInformation?.distance?.text}</Text>

             </View>
             <View style={tw`flex-1 mt-2`}>
                <FlatList
                    data={data}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={tw`flex-row items-center justify-between px-5 ${selected?.id === item.id && 'bg-gray-100'}`}
                            onPress={() => setSelected(item)}
                        >
                            <Image
                                source={{ uri: item.image }}
                                style={styles.image}
                            />
                            <View style={tw`flex-row items-center justify-between flex-1`}>
                                <View>
                                    <Text style={tw`text-xl font-bold text-black`}>{item.title}</Text>
                                    <Text style={tw`text-gray-600`}>{travelTimeInformation?.duration?.text} Travel time</Text>
                                </View>
                                <Text style={tw`text-gray-800 text-lg`}>
                                    {/* {new Intl.NumberFormat('en-us', {
                                        style: 'currency',
                                        currency: 'USD'
                                    }).format(
                                        travelConst(item)
                                    )} */}
                                    ${travelConst(item)}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <View>
                <TouchableOpacity
                    style={tw`bg-black py-3 m-3 z-50 rounded-lg ${!selected && 'bg-gray-300'}`}
                    disabled={!selected}
                    onPress={onChoose}
                >
                    <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
                </TouchableOpacity>
            </View>
        
        
        
        </SafeAreaView>
    )
}

export default RideOptionsCard

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    }
})

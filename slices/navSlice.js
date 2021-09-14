import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    origin:null ,
    destinatin: null , 
    travelTimeInformation:null , 
}
export const navSlice = createSlice({
    name:'nav',
    initialState,
    reducers:{
        setOrigin:(state , action)=>{
            state.origin = action.payload ;
        },
        setDestination:(state , action)=>{
            state.origin = action.payload ;
        },
        setTravelTimeInformation:(state , action)=>{
            state.origin = action.payload ;
        }
    }

});
export const {
    setDestination , setOrigin , setTravelTimeInformation
} = navSlice.actions;

//selectors 
export const selectOrigin =(state)=>state.nav.origin ;
export const selectDestination =(state)=>state.nav.origin ;
export const selectTravelTimeInfo =(state)=>state.nav.origin ;

export default navSlice.reducer ;
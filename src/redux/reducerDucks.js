import axios from 'axios'

// Constantes
const dataInicial = {
    array : [],
    informacion : {},
    nextPage : '',
    prevPage: '',
    error: false,
    singleChar: [{}, false]
}

// types
const OBTENER_INFO = 'OBTENER_INFO';
const OBTENER_INFO_ERROR = 'OBTENER_INFO_ERROR';
const OBTENER_INFO_SiNGLE_CHAR = 'OBTENER_INFO_SiNGLE_CHAR';

// REDUCER
export default function charReducer( state = dataInicial, action) {
    switch(action.type){
        case OBTENER_INFO:
            return {...state, array: action.payload.array,informacion: action.payload.informacion,nextPage: action.payload.nextPage,prevPage: action.payload.prevPage,error: action.error,singleChar: action.payload.singleChar}
        case OBTENER_INFO_ERROR:
            return {...state, error: action.payload }
        case OBTENER_INFO_SiNGLE_CHAR:
            return {...state, singleChar: [action.payload.singleChar[0], action.payload.singleChar[1]]}
        default:
            return state
    }
}


// actions 
export const getFilteredData = (endPoint) => async ( dispatch, getState ) => {
    console.log(`https://rickandmortyapi.com/api/${endPoint}`);
    try{
        const res = await axios.get(`https://rickandmortyapi.com/api/${endPoint}`);
        console.log(res.data);
        dispatch({ 
            type: OBTENER_INFO,
            payload: {array: res.data.results, informacion: res.data.info, nextPage: res.data.info.next, prevPage: res.data.info.prev, error: false, singleChar: [{}, false]}
        })
    }catch (error){
        dispatch({ 
            type: OBTENER_INFO_ERROR,
            payload: true
        })
    }
}

export const getSingleChardData = (endPoint) => async ( dispatch, getState ) => {
    console.log(endPoint);
    try{
        const res = await axios.get(`https://rickandmortyapi.com/api/${endPoint}`);
        dispatch({ 
            type: OBTENER_INFO_SiNGLE_CHAR,
            payload: {singleChar: [res.data, true]}
        })
    }catch (error){
        dispatch({ 
            type: OBTENER_INFO_ERROR,
            payload: true
        })
    }
}

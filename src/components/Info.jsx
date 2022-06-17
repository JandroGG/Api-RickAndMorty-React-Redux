import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerInfoAction } from '../redux/reducerDucks';

const Info = () =>{
    const dispatch = useDispatch();
    const pokemonList = useSelector( store => store )
    const infoList = pokemonList.chars.informacion

return(
    <div>
        Info de la api
        <button onClick={()=> dispatch(obtenerInfoAction())} >GetInfo</button>

        <div className='info'>
            <p>{`son ${infoList.count} personajes en total`}</p>
            <p>{`en ${infoList.pages} paginas`}</p>
        </div>
    </div>
);
}

export default Info;
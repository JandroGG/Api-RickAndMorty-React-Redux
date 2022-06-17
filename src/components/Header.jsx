import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { getSingleChardData, obtenerDataNextPage, obtenerDataPrevPage, getFilteredData } from '../redux/reducerDucks';

const Header = () =>{

    const dispatch = useDispatch();
    const dataApi = useSelector( store => store )
    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
        let endPoint;
        const checkBoxs = [...document.querySelectorAll(".checkbox")];
        const indexChecked = (checkBoxs.filter( item => item.checked === true))[0].id;
        console.log(indexChecked);
        switch(indexChecked){
            case 'cbox1':
                endPoint = `character/0,${data.filtrar}`;
                dispatch(getFilteredData(endPoint));
                break;
            case 'cbox2':
                endPoint = `character/?name=${data.filtrar}`;
                dispatch(getFilteredData(endPoint));
                break;
            default:
                endPoint = 'character';
        }
        // dispatch(getSingleChardData(endPoint));
       
    }

    return(
        <>
        <div className='header'>
            <button onClick={()=> dispatch(getFilteredData('character'))} >All</button>
            <button onClick={()=> dispatch(getFilteredData('character?status=alive'))} >alive</button>
            <button onClick={()=> dispatch(getFilteredData('character?status=dead'))} >dead</button>
            <button onClick={()=> dispatch(getFilteredData('character?status=unknow'))} >unknow</button>

            <div>
                <p>Buscar por:</p>
                <input type="radio" className="checkbox" id="cbox1" name="buscar" defaultChecked /> <label htmlFor="cbox1">Id</label>
                <input type="radio" className="checkbox" id="cbox2" name="buscar"/> <label htmlFor="cbox2">Name</label>
                <input type="radio" className="checkbox" id="cbox3" name="buscar"/> <label htmlFor="cbox3">Location</label>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input name="filter" placeholder="Buscar por nombre" {...register("filtrar", { required: true })}/>
                <button>Buscar</button>
            </form>
        </div>
        <hr />
        <button onClick={()=> {if(dataApi.chars.prevPage){const endPoint = dataApi.chars.prevPage.split('https://rickandmortyapi.com/api/')[1];dispatch(getFilteredData(endPoint));}}}>Prev</button>
        <button onClick={()=> {if(dataApi.chars.nextPage){const endPoint = dataApi.chars.nextPage.split('https://rickandmortyapi.com/api/')[1];dispatch(getFilteredData(endPoint));}}}>Next</button>
        </>
    );
}

export default Header;
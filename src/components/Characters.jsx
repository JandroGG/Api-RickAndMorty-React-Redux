import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getFilteredData} from '../redux/reducerDucks';
import networkFail from '../icons/networkFail.svg'
import CharDetails from './CharDetails'

const Characters = () =>{

    const [idChar, setIdChar] = useState(1);
    const [isShowDetails, setIsShowDetails] = useState(false);
    const [isReceived, setIsReceived] = useState(false);

    const dispatch = useDispatch();
    const data = useSelector( store => store )

    useEffect( function () {
        dispatch(getFilteredData('character'));
    }, [dispatch])

    const charList = data.chars.array;
    const charError = data.chars.error;

    const statusClassName = (item) => {
        switch(item){case 'Alive': return 'status alive';case 'Dead': return 'status dead';default: return'status unknown'}
    }

    const show = (event) => {
        setIdChar(parseInt(event.target.id));
        if(isShowDetails){
            setIsShowDetails(false)
        }
        else{
            setIsShowDetails(true);
            setIsReceived(false)
        }
    }

    return(
        <div className='info'>
            {charError?
                <div className='network-fail' >
                    <img src={networkFail} alt="network-fail" />
                </div>
                :
                ''
            }
            <CharDetails isShowDetails={isShowDetails} endPoint = {idChar} setIsReceived={setIsReceived} isReceived={isReceived} />

            <div className='pagina' >
                {charList.map( item => {
                    return(
                    <figure className="card" id={item.id} style={{cursor: "pointer"}} key={item.id} onClick={show}>
                        <div className="img-card" alt={"char"} style={{backgroundImage: `url(${item.image})`}}>
                            <div className={statusClassName(item.status)}></div>
                            <div className="id-number">{item.id}</div>
                        </div>
                        <figcaption className='footer-card' >
                            <span className="Nombre">{item.name}</span>
                            <span className="especie">{item.species}</span>
                        </figcaption>
                    </figure>
                    )})}
            </div>
        </div>
    );
}

export default Characters;
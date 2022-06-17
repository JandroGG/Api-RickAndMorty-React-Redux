import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getSingleChardData} from '../redux/reducerDucks';

const CharDetails = ({isShowDetails, endPoint, setIsReceived, isReceived}) =>{
    const dispatch = useDispatch();
    const data = useSelector( store => store )

    const statusClassName = (item) => {
        switch(item){case 'Alive': return 'status alive';case 'Dead': return 'status dead';default: return'status unknown'}
    }

    
    useEffect( function () {
        if(isShowDetails){
            dispatch(getSingleChardData(`character/${endPoint}`));
        }
    }, [dispatch, endPoint, isShowDetails])

    const item = data.chars.singleChar[0];
    setIsReceived(data.chars.singleChar[1]);

    if(isShowDetails){
        return(
            <>
                {isReceived?
                    <div className='card-details'>
                        <div className='left'>
                            <div className="img-card-details" alt={"char"} style={{backgroundImage: `url(${item.image})`}}>
                                <div className={statusClassName(item.status)}></div>
                                <div className="id-number">{item.id}</div>
                            </div>
                            <div className='name-details' >
                                {item.name}
                            </div>
                        </div>
                        <div className='right'>
                            <span> <strong>Specie: </strong> {item.species}</span>
                            <span> <strong>Gender: </strong> {item.gender}</span>
                            <span> <strong>Status: </strong> {item.status}</span>
                            <span> <strong>Origin: </strong> {item.origin.name}</span>
                            <span> <strong>Location: </strong>{item.location.name}</span>
                            <div className='episodes' style={{cursor: "pointer"}} > Episodes </div>
                        </div>
                    </div>
                    :
                    <div className='card-details'>Esperando</div>
                }
            </>
        )
    }
}
export default CharDetails;




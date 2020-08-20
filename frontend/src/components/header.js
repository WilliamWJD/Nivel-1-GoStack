import React, {useEffect} from 'react'

import api from '../services/api'

export default function Header({title, children}){
    useEffect(()=>{
        async function loadRepositories(){
            const response = await api.get('/projects')
            console.log(response.data)
        }
        loadRepositories();
    },[])

    return(
        <header>
            <h1>{title}</h1>
            {children}
        </header>
    )
}
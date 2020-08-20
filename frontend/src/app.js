import React from 'react'

import Header from './components/header';

function App(){
    return(
        <>
            <Header title="HomePage">
                <ul>
                    <li>Home</li>
                    <li>Sobre</li>
                    <li>Serviços</li>
                    <li>Contato</li>
                </ul>
            </Header>
            <h1>Hello Word, welcome to platform react</h1>
        </>
    )
}

export default App;
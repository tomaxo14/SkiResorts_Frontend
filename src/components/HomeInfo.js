import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import '../styles/HomeInfo.css';

const HomeInfo = () => {
    return (
        <div id="zalety">
            <Jumbotron className="jumbotron">
            <h1>Dlaczego warto się zarejestrować w naszej aplikacji?</h1>
            <br></br>
            <ul>
                <li>Zapisz swoje preferencje oraz adres aby uzyskiwać spersonalizowane oferty ośrodków</li>
                <li>Dodawaj ośrodki do ulubionych, aby z łatwością sprawdzać aktualne warunki pogodowe</li>
                <li>Oceniaj ośrodki i pomóż w tworzeniu rakingu najlepszych ośrodków w centralnej Europie</li>
            </ul>
            </Jumbotron>
        </div>
    )
}

export default HomeInfo;
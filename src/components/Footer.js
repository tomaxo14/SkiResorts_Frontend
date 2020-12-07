import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/Footer.css'

const Footer = () => {


    return (
        <div id="footer">
            <Container>
                <Row id="footer-row">
                    <Col id="email-col">
                    <h3>Kontakt</h3>
                    <h6>Napisz do mnie jeśli masz jakieś pytania</h6>
                    <p>e-mail: <a href="mailto:tomasz.a.przybylski@gmail.com" className="link">tomasz.a.przybylski@gmail.com </a></p>
                    </Col>
                    <Col id="maps-col">
                    <div xmlns="http://creativecommons.org/ns#" about="https://skimap.org/"><a className="maps-info" rel="cc:attributionURL" property="cc:attributionName" href="https://skimap.org/">Maps provided by Skimap.org</a> / <a className="maps-info" rel="license" href="http://creativecommons.org/licenses/by-nc-sa/3.0/us/">CC BY-NC-SA 3.0</a></div>
                    </Col>
                    <Col id="github-col">
                    <h3>Twórca</h3>
                    <p>Tomasz Przybylski <a href="https://github.com/tomaxo14" className="link">GitHub</a></p>
                    </Col>
                </Row>
            </Container>
        </div>
    )

}
export default Footer;

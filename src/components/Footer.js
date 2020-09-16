import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/Footer.css'

const Footer = () => {


    return (
        <div id="footer">
            <Container>
                <Row id="footer-row">
                    <Col>
                    <h3>Kontakt</h3>
                    <h6>Napisz do nas jeśli masz jakieś pytania</h6>
                    <p>e-mail: <a href="mailto:tomasz.a.przybylski@gmail.com">tomasz.a.przybylski@gmail.com </a></p>
                    </Col>
                    <Col>
                    <h3>Twórca</h3>
                    <p>Tomasz Przybylski <a href="https://github.com/tomaxo14">GitHub</a></p>
                    </Col>
                </Row>
            </Container>
        </div>
    )

}
export default Footer;

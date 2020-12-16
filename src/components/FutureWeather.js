import React from 'react';
import { WiThermometer, WiThermometerExterior, WiHumidity, WiStrongWind, WiCloudy, WiDust } from 'weather-icons-react';
import Select from 'react-select';
import '../styles/FutureWeather.css';

const FutureWeather = (props) => {


    // const firstDay = weatherData[1];
    // const secondDay = weatherData[2];
    // const thirdDay = weatherData[3];
    // const forthDay = weatherData[4];
    // const fifthDay = weatherData[5];
    // const sixthDay = weatherData[6];
    // const seventhDay = weatherData[7];

    
    var today = new Date();
    var firstDay = String(today.getDate()+1).padStart(2, '0') + "." + String(today.getMonth() + 1).padStart(2, '0');
    var secondDay = String(today.getDate()+2).padStart(2, '0') + "." + String(today.getMonth() + 1).padStart(2, '0');
    var thirdDay = String(today.getDate()+3).padStart(2, '0') + "." + String(today.getMonth() + 1).padStart(2, '0');
    var forthDay = String(today.getDate()+4).padStart(2, '0') + "." + String(today.getMonth() + 1).padStart(2, '0');
    var fifthDay = String(today.getDate()+5).padStart(2, '0') + "." + String(today.getMonth() + 1).padStart(2, '0');
    var sixthDay = String(today.getDate()+6).padStart(2, '0') + "." + String(today.getMonth() + 1).padStart(2, '0');
    var seventhDay = String(today.getDate()+7).padStart(2, '0') + "." + String(today.getMonth() + 1).padStart(2, '0');
    let dates = [
        {value: 1, label: firstDay},
        {value: 2, label: secondDay},
        {value: 3, label: thirdDay},
        {value: 4, label: forthDay},
        {value: 5, label: fifthDay},
        {value: 6, label: sixthDay},
        {value: 7, label: seventhDay}
    ];
    const [choosenDay, setChoosenDay] = React.useState(dates[0].value);
    const [weatherData, setWeatherData] = React.useState(props.weather);
    console.log(weatherData);
    const [choosenDayData, setChoosenDayData] = React.useState(weatherData[1]);
    const [choosenDayDescription, setChoosenDayDescription] = React.useState(choosenDayData.weather);

    function handleChange(e) {
        setChoosenDay(e.value);
        setChoosenDayData(weatherData[choosenDay]);
        setChoosenDayDescription(choosenDayData.weather);
    }

    return (
        <div>
            <h3 id="future-weather-title">Prognoza na najbliższe dni</h3>
            <Select
                defaultValue={dates[0]}
                options={dates}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
                id="select-date"
                />
            <p>
                <WiThermometer size="24" className="weather-icon"></WiThermometer>
                Temperatura: <b>{choosenDayData.temp.day} &#8451; </b>
            </p>
            <p>
                <WiThermometerExterior size="24" className="weather-icon"></WiThermometerExterior>
                Temperatura odczuwalna: <b> {choosenDayData.feels_like.day} &#8451; </b>
            </p>
            <p>
                <WiHumidity size="24" className="weather-icon"></WiHumidity>
                Wilgotność: <b> {choosenDayData.humidity}
                <span>%</span></b>
            </p>
            <p>
                <WiStrongWind size="24" className="weather-icon"></WiStrongWind>
                Prędkość wiatru: <b> {choosenDayData.wind_speed}
                <span>&nbsp;m/s</span></b>
            </p>
            <p>
                <WiCloudy size="24" className="weather-icon"></WiCloudy>
                Chmury: <b> {choosenDayData.clouds}
                <span>%</span></b>
            </p>
            <div>
                <WiDust size="24" className="weather-icon"></WiDust>
                Opis:
                <b>
                    {choosenDayDescription.map(
                        desc => (
                                    <span key={desc.id}>
                                        <span>&nbsp;</span>
                                        {desc.description}
                                        {choosenDayDescription.length > 1 ? (
                                            <span>,</span>
                                        ) : (
                                            <span></span>
                                        )}
                                    </span>

                                )
                    )
                    }
                </b>
            </div>
        </div>
    )
}
export default FutureWeather;
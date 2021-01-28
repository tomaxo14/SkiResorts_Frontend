import React from 'react';
import { WiThermometer, WiThermometerExterior, WiHumidity, WiStrongWind, WiCloudy, WiDust } from 'weather-icons-react';
import Select from 'react-select';
import '../styles/FutureWeather.css';

const FutureWeather = (props) => {

    var tempDay = new Date();
    var dates=[];
    for(var i=0; i<7; i++) {
        tempDay.setDate(tempDay.getDate()+1);
        dates[i] = {value: i+1, label: String(tempDay.getDate()).padStart(2, '0') + "." + String(tempDay.getMonth() + 1).padStart(2, '0')}
    }

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
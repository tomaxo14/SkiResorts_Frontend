import React from 'react'
import ReactMapGL, {Marker} from 'react-map-gl';

class Map extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            viewport: {
                width: 500,
                height: 300,
                latitude: parseFloat(this.props.lat),
                longitude: parseFloat(this.props.lon),
                zoom: 8            
            }
        };
    }


    render() {
        return (
            <ReactMapGL
                mapStyle="mapbox://styles/mapbox/streets-v11"
                maxZoom={12}
                minZoom={7}
                mapboxApiAccessToken="pk.eyJ1IjoidG9tYXhvIiwiYSI6ImNraHJ2eTliNjBuNmEyeHBiOXRhNWhuZTcifQ.Ra13ZFPaEfeoEi_O7osVsw"
                {...this.state.viewport}
                onViewportChange={(viewport) => this.setState({ viewport })}
            >
                <Marker
                latitude={parseFloat(this.props.lat)}
                longitude={parseFloat(this.props.lon)}>
                    <i className="red big map marker alternate icon"></i>
                </Marker>
            </ReactMapGL>

        );
    }
}
export default Map;
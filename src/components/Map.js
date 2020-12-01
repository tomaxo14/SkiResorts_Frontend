import React from 'react'
import ReactMapGL, {Marker} from 'react-map-gl';

class Map extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            // minZoom: this.props.minZoom,
            // maxZoom: this.props.maxZoom,
            // hasLocation: true,
            isLoaded: false,
            viewport: {
                width: 500,
                height: 300,
                latitude: parseFloat(this.props.lat),
                longitude: parseFloat(this.props.lon),
                zoom: 8
            }
        };
    }

    // componentDidMount() {
    //     if(this.state.viewport.latitude === 0.0 && this.state.viewport.longitude === 0.0) {
    //         var viewport = {...this.state.viewport};
    //         viewport.latitude = 52.0;
    //         viewportHelper.longitude = 19.0;
    //         this.setState({viewport});
    //         this.setState({hasLocation:false, isLoaded:true});
    //     } else {
    //         this.setState({isLoaded:true})
    //     }
    // }


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
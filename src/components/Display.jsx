import React from 'react';
import './styles/Display.css';
class Display extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <div className='display'>
                <div className={this.props.loaded === true ? 'display-before' : 'display-after'}>
                    <p className='starting-message'>{this.props.error ? 'please enter correct city name': 'Please choose a city from history or enter a city name'}</p> 
                </div>
                <div className="display-wrapper">
                    <div className='upd-btn-wrapper'>
                        <button onClick={this.props.updateDisplayCard} className='update-btn'><i className="fas fa-sync-alt"></i></button>
                    </div>
                    <div className='display-main'>
                        <div className='main'>
                            <p className='city-name'>{this.props.cityName}</p>
                            <p className='current-date'>{this.props.currentDate}</p>
                            <p className='current-time'>{this.props.currentTime}</p>
                            <p className='weather-desc'>{this.props.weatherDesc}</p>
                            <img alt='weather icon' className='weather-icon' src={this.props.iconLink}></img>
                        </div>
                        <div className='main-temp'>
                            <div className='temp-block'>
                                <div className="temperature-switch">
                                    <button onClick={this.props.convertToCels} className={this.props.tempConvert === false ? 'celcius-switcher' : 'celcius-switcher-after'}><sup>o</sup>C</button>
                                    <button onClick={this.props.convertToFahr} className={this.props.tempConvert === true ? 'fahrenheit-switcher' : 'fahrenheit-switcher-after'}><sup>o</sup>F</button>
                                </div>
                                <span className='temp'>{this.props.temperature}<sup>o</sup></span>
                                <p className='feelslike-temp-wrapper'>Feels like: 
                                    <span className='feelslike_temp'> {this.props.feelsLikeTemp}<sup>o</sup></span>
                                </p>
                            </div>
                            <div className='temp-block-more'>
                                <p className='humidity'>Humidity: {this.props.humidity}</p>
                                <p className='wind-speed'>Wind: {this.props.windSpeed}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};
export default Display;

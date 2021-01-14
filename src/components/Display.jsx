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
                    <p className='starting-message'>{this.props.error ? 'Please enter correct sity name' : 'Please enter your sity name'}</p>
                </div>
                <div className='display-main'>
                    <div className='main'>
                        <p className='sity-name'>{this.props.sityName}</p>
                        <p className='current-date'>{this.props.currentDate}</p>
                        <p className='current-time'>{this.props.currentTime}</p>
                        <p className='weather-desc'>{this.props.weatherDesc}</p>
                        <img className='weather-icon' src={this.props.iconLink}></img>
                    </div>
                    <div className='main-temp'>
                        <div className='temp-block'>
                            <span className='temp'>{this.props.temperature}<sup>o</sup></span>
                            <p className='feelslike-temp-wrapper'>Feels like: <span className='feelslike_temp'>{this.props.feelsLikeTemp}<sup>o</sup></span></p>
                        </div>
                        <div className='temp-block-more'>
                            <p className='humidity'>Humidity: {this.props.humidity}</p>
                            <p className='wind-speed'>Wind: {this.props.windSpeed}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Display;
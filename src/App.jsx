import React from 'react';
import Header from './components/Header';
import Display from './components/Display';
import './App.css'
const APIKEY = 'b0e658f81fbdeeaa452333e7e504314a';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      city: '',
      date: '',
      time: '',
      icon: '',
      description: '',
      temperature: '',
      feelsLikeTemp: '',
      humidity: '',
      wind: '',
      isLoaded: false,
      error: null
    }
    this.fetchData = this.fetchData.bind(this);
    this.getSityName = this.getSityName.bind(this);
    this.fetchDataEnter = this.fetchDataEnter.bind(this);
  }

  fetchData () {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.inputValue}&appid=${APIKEY}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
            throw new Error('Something went wrong ...');
        }
      })
      .then(
        (data) => {
          if(this.state.inputValue !== '') {
            let iconId = data.weather[0].icon;
            let currentIcon = `http://openweathermap.org/img/wn/${iconId}.png`
            let date = new Date();
            let localTime = date.getTime();
            let localOffset = date.getTimezoneOffset() * 60000;
            let utc = localTime + localOffset;
            let сityTime = utc + (1000 * data.timezone);
            let newDate = new Date(сityTime);
            let currentTime = 0;
            newDate.getHours() < 10 ? currentTime = '0' + newDate.getHours() + ':' + newDate.getMinutes()
            : currentTime = newDate.getHours() + ':' + newDate.getMinutes();
            newDate.getMinutes() < 10 ? currentTime = newDate.getHours() + ':' + '0' + newDate.getMinutes()
            : currentTime = newDate.getHours() + ':' + newDate.getMinutes();
            let options = { month: 'long', day: 'numeric'};
            let currentDate = new Intl.DateTimeFormat('en-US', options).format(newDate);
            this.setState({
              isLoaded: true,
              city: data.name,
              date: currentDate,
              time: currentTime,
              temperature: Math.round(data.main.temp - 273.15),
              feelsLikeTemp: Math.round(data.main.feels_like - 273.15),
              description: data.weather[0].description,
              humidity: data.main.humidity + '%',
              wind: data.wind.speed + ' m/s',
              icon: currentIcon,
              inputValue: ''
            });
            console.log(data);
          }
        },
      )
      .catch((error) => {
        this.setState({
          isLoaded: false,
          error 
        });
      })
  };

  fetchDataEnter (e) {
    if(e.keyCode === 13) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.inputValue}&appid=${APIKEY}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
            throw new Error('Something went wrong ...');
        }
      })
      .then(
        (data) => {
          if(this.state.inputValue !== '') {
            let iconId = data.weather[0].icon;
            let currentIcon = `http://openweathermap.org/img/wn/${iconId}.png`
            let date = new Date();
            let localTime = date.getTime();
            let localOffset = date.getTimezoneOffset() * 60000;
            let utc = localTime + localOffset;
            let sityTime = utc + (1000 * data.timezone);
            let newDate = new Date(sityTime);
            let currentTime = 0;
            newDate.getHours() < 10 ? currentTime = '0' + newDate.getHours() + ':' + newDate.getMinutes()
            : currentTime = newDate.getHours() + ':' + newDate.getMinutes();
            newDate.getMinutes() < 10 ? currentTime = newDate.getHours() + ':' + '0' + newDate.getMinutes()
            : currentTime = newDate.getHours() + ':' + newDate.getMinutes();
            let options = { month: 'long', day: 'numeric'};
            let currentDate = new Intl.DateTimeFormat('en-US', options).format(newDate);
            this.setState({
              isLoaded: true,
              city: data.name,
              date: currentDate,
              time: currentTime,
              temperature: Math.round(data.main.temp - 273.15),
              feelsLikeTemp: Math.round(data.main.feels_like - 273.15),
              description: data.weather[0].description,
              humidity: data.main.humidity + '%',
              wind: data.wind.speed + ' m/s',
              icon: currentIcon,
              inputValue: ''
            });
            console.log(data);
          }
        },
      )
      .catch((error) => {
        this.setState({
          isLoaded: false,
          error 
        });
      })
    }
  }

  getSityName (event) {
    this.setState ({
      inputValue: event.target.value
    })
  };

  render () {
    return (
      <div className='app'>
          <Header enterClick={this.fetchDataEnter} getInputValue={this.getSityName} value={this.state.inputValue} 
          showWeather={this.fetchData}/>
          <Display loaded={this.state.isLoaded} error={this.state.error} cityName={this.state.city} currentTime={this.state.time} currentDate={this.state.date} 
           weatherDesc={this.state.description} 
          iconLink={this.state.icon} temperature={this.state.temperature} 
          feelsLikeTemp={this.state.feelsLikeTemp} humidity={this.state.humidity} 
          windSpeed={this.state.wind}/>
      </div>
    )
  }
}
export default App;

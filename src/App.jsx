import React, { useCallback } from 'react';
import Header from './components/Header';
import Display from './components/Display';
import List from './components/List';
import './App.css'
const APIKEY = 'b0e658f81fbdeeaa452333e7e504314a';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      error: null,
      weatherCards: [],
      checkedBtnId: '',
      tempConvert: false
    }
    // initialize our functions
    this.fetchData = this.fetchData.bind(this);
    this.fetchDataEnter = this.fetchDataEnter.bind(this);
    this.moreInfoRequest = this.moreInfoRequest.bind(this);
    this.deleteCards = this.deleteCards.bind(this);
    this.updateCards = this.updateCards.bind(this);
    this.getUpdateTime = this.getUpdateTime.bind(this);
    this.newInterval = this.newInterval.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
    this.convertToCels = this.convertToCels.bind(this);
    this.convertToFahr = this.convertToFahr.bind(this);
  };
  // fucntion to get localStorage data
  componentDidMount () { 
    if(localStorage.getItem('card') !== null) {
      let storage = JSON.parse(localStorage.getItem('card'));
        this.setState({
          isLoaded: storage.isLoaded,
          city: storage.city,
          date: storage.date,
          time: storage.time,
          temperature: storage.temperature,
          feelsLikeTemp: storage.feelsLikeTemp,
          description: storage.description,
          humidity: storage.humidity,
          wind: storage.wind,
          icon: storage.icon,
          weatherCards: storage.weatherCards,
          tempConvert: storage.tempConvert
        });
    }
    if(localStorage.getItem('updatetime') !== null) {
      let storagetime = localStorage.getItem('updatetime');
      let radioButtons = document.querySelectorAll('.radio');
      radioButtons.forEach(item => {
        item.defaultChecked = false
        if(item.value === storagetime) {
          item.defaultChecked = true
        }
      });
      intervalTime = storagetime * 60000;
    }
    else  {
      let radioButtons = document.querySelectorAll('.radio');
      radioButtons.forEach(item => {
        if(item.value === '10') {
          item.defaultChecked = true
          intervalTime = item.value * 60000;
        }
      })
    };
    interval = setInterval(this.updateCards, intervalTime)
  };
  // function to update weather cards in sidebar
  updateCards () {
    if(this.state.weatherCards.length > 0) {
      this.state.weatherCards.map(currCard => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currCard[0]}&appid=${APIKEY}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
              throw new Error('Something went wrong ...');
          }
        })
        .then(
          (data) => {
            let date = new Date();
            let timeNow = 0;
            date.getHours() < 10 ? timeNow = '0' + date.getHours() + ':' + date.getMinutes()
            : timeNow = date.getHours() + ':' + date.getMinutes();
            date.getMinutes() < 10 ? timeNow = date.getHours() + ':' + '0'+ date.getMinutes() 
            : timeNow = date.getHours() + ':' + date.getMinutes();
            currCard[1] = Math.round(data.main.temp - 273.15);
            currCard[2] = timeNow;
            currCard[3] = data.weather[0].description;
          });
        });
        localStorage.setItem("card", JSON.stringify(this.state));
        console.log('cards updated')
        this.updateDisplay();
    }
  };
  // function to make ajax request on click button "show weather"
  fetchData () {
    let input = document.querySelector('.search-input');
    input.blur();
    console.log(input.value)
    if(input.value !== '') {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${APIKEY}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
            throw new Error('Something went wrong ...');
        }
      })
      .then(
        (data) => {
          if (input.value !== '') {
            if(this.state.weatherCards.length >= 1 && this.state.weatherCards.length < 3) {
              let newCards = this.state.weatherCards.filter(item => item[0] !== data.name);
              this.setState({weatherCards: newCards});
            }
            else if(this.state.weatherCards.length > 2) {
              let newCards = this.state.weatherCards.filter(item => item[0] !== data.name);
              this.setState({weatherCards: newCards});
              newCards.length !== 2  ? this.state.weatherCards.pop() : 
              console.log("we shouldn't delete last card");
            }
            let iconId = data.weather[0].icon;
            let currentIcon = `http://openweathermap.org/img/wn/${iconId}.png`
            let date = new Date();
            let timeNow = 0;
            date.getHours() < 10 ? timeNow = '0' + date.getHours() + ':' + date.getMinutes()
            : timeNow = date.getHours() + ':' + date.getMinutes();
            date.getMinutes() < 10 ? timeNow = date.getHours() + ':' + '0'+ date.getMinutes() 
            : timeNow = date.getHours() + ':' + date.getMinutes();
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
              weatherCards: [[data.name, Math.round(data.main.temp - 273.15), timeNow, data.weather[0].description], ...this.state.weatherCards]
            });
            input.value = '';
            let searchbox = document.getElementById('search-list');
            searchbox.classList.remove('cities-list-after');
            searchbox.classList.add('cities-list-before');
            localStorage.setItem("card", JSON.stringify(this.state))
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
  };
  // function to make fetchData() on click "enter"
  fetchDataEnter (e) {
    if(e.keyCode === 13) {
      this.fetchData();
    }
  };
  // fucntion to make ajax request on click on current weather card
  moreInfoRequest (currentData) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentData[0]}&appid=${APIKEY}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
            throw new Error('Something went wrong ...');
        }
      })
      .then(
        (data) => {
            let iconId = data.weather[0].icon;
            let currentIcon = `http://openweathermap.org/img/wn/${iconId}.png`
            let date = new Date();
            let timeNow = 0;
            date.getHours() < 10 ? timeNow = '0' + date.getHours() + ':' + date.getMinutes()
            : timeNow = date.getHours() + ':' + date.getMinutes();
            date.getMinutes() < 10 ? timeNow = date.getHours() + ':' + '0' + date.getMinutes() 
            : timeNow = date.getHours() + ':' + date.getMinutes();
            this.state.weatherCards.map((item) => {
              if (item === currentData) {
                item[3] = data.weather[0].description
                item[2] = timeNow;
                item[1] = Math.round(data.main.temp - 273.15)
              }
            });
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
              weatherCards: this.state.weatherCards,
              tempConvert: false
            });
            localStorage.setItem("card", JSON.stringify(this.state));
        },
      )
      .catch((error) => {
        this.setState({
          isLoaded: false,
          error
        });
      })
  };
  // function to delete current card
  deleteCards (card) {
    let afterDelCards = this.state.weatherCards.filter(item => item !== card)
    this.setState({weatherCards: afterDelCards, isLoaded: false, error: null, inputValue: ''}, 
    () => {
      localStorage.setItem("card", JSON.stringify(this.state))
    });
  };
  // function to get time of automatically updating weather cards
  getUpdateTime (e) {
    console.log(e.target.value)
    this.setState({
      checkedBtnId: e.target.value}, 
      () => {localStorage.setItem("updatetime", this.state.checkedBtnId)
    });
    if(this.state.weatherCards.length > 0) {
      clearInterval(interval);
      intervalTime = e.target.value * 60000;
      this.newInterval()
    }
  };
  // function to start new interval when we click on radio button(10min, 30min, 60min)
  newInterval () {
    interval = setInterval(this.updateCards, intervalTime)
  };
  // function to update display card on click "update button", making ajax request
  updateDisplay () {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${APIKEY}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
            throw new Error('Something went wrong ...');
        }
      })
      .then(
        (data) => {
            let iconId = data.weather[0].icon;
            let currentIcon = `http://openweathermap.org/img/wn/${iconId}.png`
            let date = new Date();
            let timeNow = 0;
            date.getHours() < 10 ? timeNow = '0' + date.getHours() + ':' + date.getMinutes()
            : timeNow = date.getHours() + ':' + date.getMinutes();
            date.getMinutes() < 10 ? timeNow = date.getHours() + ':' + '0' + date.getMinutes() 
            : timeNow = date.getHours() + ':' + date.getMinutes();
            this.state.weatherCards.map((item) => {
              if (item[0] === this.state.city) {
                item[3] = data.weather[0].description
                item[2] = timeNow;
                item[1] = Math.round(data.main.temp - 273.15)
              }
            });
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
              weatherCards: this.state.weatherCards,
              tempConvert: false
            });
            localStorage.setItem("card", JSON.stringify(this.state))
        },
      )
      .catch((error) => {
        this.setState({
          isLoaded: false,
          error
        });
      })
  };

  convertToCels (e) {
    if(this.state.tempConvert === true) {
      let celcius = Math.round((this.state.temperature - 32) / 1.8);
      let feelslike = Math.round((this.state.feelsLikeTemp - 32) / 1.8);
      this.setState({tempConvert: false, temperature: celcius, feelsLikeTemp: feelslike}, () => 
      {localStorage.setItem("card", JSON.stringify(this.state))})
    }
  }

  convertToFahr (e) {
    if(this.state.tempConvert === false) {
      let fahrenheit = Math.round((this.state.temperature * 1.8) + 32);
      let feelslike = Math.round((this.state.feelsLikeTemp * 1.8) + 32);
      this.setState({tempConvert: true, temperature: fahrenheit, feelsLikeTemp: feelslike}, () => 
      {localStorage.setItem("card", JSON.stringify(this.state))})
    }
  }

  render () {
    return (
      <div className='app'>
          <Header 
            enterClick={this.fetchDataEnter} 
            showWeather={this.fetchData}
          />
          <div className='weather-info'>
            <List
              deleteCard={this.deleteCards} 
              moreInfo={this.moreInfoRequest} 
              cards={this.state.weatherCards}
              updateCard={this.updateCards}
              getTimeUpdate={this.getUpdateTime}
            />
            <Display 
              tempConvert={this.state.tempConvert}
              convertToCels={this.convertToCels}
              convertToFahr={this.convertToFahr}
              updateDisplayCard={this.updateDisplay}
              loaded={this.state.isLoaded} 
              error={this.state.error} 
              cityName={this.state.city} 
              currentTime={this.state.time} 
              currentDate={this.state.date} 
              weatherDesc={this.state.description} 
              iconLink={this.state.icon} 
              temperature={this.state.temperature} 
              feelsLikeTemp={this.state.feelsLikeTemp} 
              humidity={this.state.humidity} 
              windSpeed={this.state.wind}
            />
          </div>
      </div>
    )
  };
};
export default App;
let intervalTime = '';
let interval = '';


import React from 'react';
import Header from './components/Header';
import Display from './components/Display';
import List from './components/List';
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
      error: null,
      weatherCards: [],
      checkedBtnId: ''
    }
    this.fetchData = this.fetchData.bind(this);
    this.getSityName = this.getSityName.bind(this);
    this.fetchDataEnter = this.fetchDataEnter.bind(this);
    this.moreInfoRequest = this.moreInfoRequest.bind(this);
    this.deleteCards = this.deleteCards.bind(this);
    this.updateCard = this.updateCard.bind(this);
    this.getUpdateTime = this.getUpdateTime.bind(this);
    this.newInterval = this.newInterval.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
  };

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
        inputValue: storage.inputValue,
        weatherCards: storage.weatherCards
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
      console.log(intervalTime)
      radioButtons.forEach(item => {
        if(item.value === '10') {
          item.defaultChecked = true
          intervalTime = item.value * 60000;
        }
      })
    };
    interval = setInterval(this.updateCard, intervalTime)
  };

  updateCard () {
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
        localStorage.setItem("card", JSON.stringify(this.state))
        this.updateDisplay();
        console.log('second')
    }
  };

  getSityName (event) {
    this.setState ({
      inputValue: event.target.value
    })
  };

  fetchData () {
    if(this.state.inputValue !== '') {
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
          if (this.state.inputValue !== '') {
            if(this.state.weatherCards.length >= 1 && this.state.weatherCards.length < 3) {
              let newCards = this.state.weatherCards.filter(item => item[0] !== data.name);
              this.setState({weatherCards: newCards});
            }
            else if(this.state.weatherCards.length > 2) {
              let newCards = this.state.weatherCards.filter(item => item[0] !== data.name);
              this.setState({weatherCards: newCards});
              newCards.length !== 2 ? this.state.weatherCards.pop() : 
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
              inputValue: '',
              weatherCards: [[data.name, Math.round(data.main.temp - 273.15), timeNow, data.weather[0].description], ...this.state.weatherCards]
            });
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

  fetchDataEnter (e) {
    if(e.keyCode === 13) {
      this.fetchData();
    }
  };

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
              inputValue: '',
              weatherCards: this.state.weatherCards
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

  deleteCards (card) {
    let afterDelCards = this.state.weatherCards.filter(item => item !== card)
    this.setState({weatherCards: afterDelCards, isLoaded: false, error: null, inputValue: ''}, 
    () => {
      localStorage.setItem("card", JSON.stringify(this.state))
    });
  };

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

  newInterval () {
    interval = setInterval(this.updateCard, intervalTime)
  };

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
              weatherCards: this.state.weatherCards
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
  }

  render () {
    return (
      <div className='app'>
          <Header 
            enterClick={this.fetchDataEnter} 
            getInputValue={this.getSityName} 
            value={this.state.inputValue} 
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
  }
}
export default App;
let intervalTime = '';
let interval = '';


import React from 'react';
import Header from './components/Header';
import Display from './components/Display';
import List from './components/List';
import Footer from './components/Footer';
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
      tempConvert: false, 
      globalTempConvert: false
    }
    // initialize our functions
    this.fetchData = this.fetchData.bind(this);
    this.fetchDataEnter = this.fetchDataEnter.bind(this);
    this.moreInfoRequest = this.moreInfoRequest.bind(this);
    this.deleteCards = this.deleteCards.bind(this);
    this.updateCards = this.updateCards.bind(this);
    this.getUpdateTime = this.getUpdateTime.bind(this);
    this.startInterval = this.startInterval.bind(this);
    this.newInterval = this.newInterval.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
    this.convertToCels = this.convertToCels.bind(this);
    this.convertToFahr = this.convertToFahr.bind(this);
    this.cityItemClick = this.cityItemClick.bind(this);
    this.globalChangeToCels = this.globalChangeToCels.bind(this);
    this.globalChangeToFahr = this.globalChangeToFahr.bind(this);
    this.handleOnDragEnd = this.handleOnDragEnd.bind(this);
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
          tempConvert: storage.tempConvert,
          globalTempConvert: storage.globalTempConvert
        }, () => {
          this.startInterval();
        })
      }
      else {
        this.startInterval();
      }
  };
  // start update interval
  startInterval () {
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
      this.updateCards();
      interval = setInterval(this.updateCards, intervalTime);
    }
    else  {
      let radioButtons = document.querySelectorAll('.radio');
      radioButtons.forEach(item => {
        if(item.value === '10') {
          item.defaultChecked = true
          intervalTime = item.value * 60000;
        }
    })
      this.updateCards();
      interval = setInterval(this.updateCards, intervalTime);
    };
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
            date.getMinutes() < 10 ? timeNow = date.getHours() + ':' + '0' + date.getMinutes() 
            : timeNow = date.getHours() + ':' + date.getMinutes();
            if(this.state.globalTempConvert === true) {
              currCard[1] = Math.round((Math.round(data.main.temp - 273.15) * 1.8) + 32);    
            } else {
              currCard[1] = Math.round(data.main.temp - 273.15)
            }
            currCard[2] = timeNow;
            currCard[3] = data.weather[0].description;
          });
        });
        localStorage.setItem("card", JSON.stringify(this.state));
        this.updateDisplay();
    }
  };
  // function to make ajax request on click button "show weather"
  fetchData () {
    let input = document.querySelector('.search-input');
    input.blur();
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
              newCards.length !== 2  ? this.state.weatherCards.pop() : console.log('Hello!')
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
            let tempToWeatherCards = null;
            this.state.globalTempConvert === true ? tempToWeatherCards =  Math.round((Math.round(data.main.temp - 273.15) * 1.8) + 32)   
            : tempToWeatherCards = Math.round(data.main.temp - 273.15);
            let cardId = '';
            cardId = String(data.id)
            this.setState({
              isLoaded: true,
              city: data.name,
              date: currentDate,
              time: currentTime,
              description: data.weather[0].description,
              humidity: data.main.humidity + '%',
              wind: data.wind.speed + ' m/s',
              icon: currentIcon,
              weatherCards: [[data.name, tempToWeatherCards, timeNow, data.weather[0].description, cardId], ...this.state.weatherCards]
            });
            if(this.state.globalTempConvert === true) {
              this.setState({
                temperature: Math.round((Math.round(data.main.temp - 273.15) * 1.8) + 32),
                feelsLikeTemp: Math.round((Math.round(data.main.feels_like - 273.15) * 1.8) + 32)    
              });
            }
            else {
              this.setState({
                temperature: Math.round(data.main.temp - 273.15),
                feelsLikeTemp: Math.round(data.main.feels_like - 273.15)
              })
            }
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
                if(this.state.globalTempConvert === true) {
                  item[1] = Math.round((Math.round(data.main.temp - 273.15) * 1.8) + 32);   
                } else {
                  item[1] = Math.round(data.main.temp - 273.15)
                }
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
              description: data.weather[0].description,
              humidity: data.main.humidity + '%',
              wind: data.wind.speed + ' m/s',
              icon: currentIcon,
              weatherCards: this.state.weatherCards
            });
            if(this.state.globalTempConvert === true) {
              if(this.state.tempConvert === false) {
                this.setState({
                  tempConvert: true
                })
              }
              this.setState({
                temperature: Math.round((Math.round(data.main.temp - 273.15) * 1.8) + 32),
                feelsLikeTemp: Math.round((Math.round(data.main.feels_like - 273.15) * 1.8) + 32)    
              });
            }
            else {
              if(this.state.tempConvert === true) {
                this.setState({
                  tempConvert: false
                })
              }
              this.setState({
                temperature: Math.round(data.main.temp - 273.15),
                feelsLikeTemp: Math.round(data.main.feels_like - 273.15)
              })
            }
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
    if(this.state.weatherCards.indexOf(card) === 2 || this.state.weatherCards.indexOf(card) === 1) {
      let preventCardIndex = this.state.weatherCards.indexOf(card) - 1;
      let preventCard = this.state.weatherCards[preventCardIndex];
      let chosenCardIndex = null;
      this.state.weatherCards.map(item => {
        if(this.state.city === item[0]) {
          chosenCardIndex = this.state.weatherCards.indexOf(item)
        }
      });
      if (chosenCardIndex !== 0) {
        this.setState({city: preventCard[0]},
          () => {
            this.updateDisplay();
          })
      }
    }
    else {
      if (this.state.weatherCards.length > 1) {
          let nextCardIndex = this.state.weatherCards.indexOf(card) + 1;
          let nextCard = this.state.weatherCards[nextCardIndex];
          let chosenCardIndex = null;
          this.state.weatherCards.map(item => {
            if(this.state.city === item[0]) {
              chosenCardIndex = this.state.weatherCards.indexOf(item)
            }
          });
          if (chosenCardIndex !== 2) {
            this.setState({city: nextCard[0]},
            () => {
              this.updateDisplay();
            })
          }
      }
      else {
        this.setState({isLoaded: false, error: false});
      };
    };
    this.setState({weatherCards: afterDelCards}, 
    () => {
      localStorage.setItem("card", JSON.stringify(this.state))
    });
  };
  // function to get time of automatically updating weather cards
  getUpdateTime (e) {
    this.setState({
      checkedBtnId: e.target.value}, 
      () => {localStorage.setItem("updatetime", this.state.checkedBtnId)
    });
    if(this.state.weatherCards.length > 0) {
      this.updateCards();
      clearInterval(interval);
      interval = '';
      intervalTime = e.target.value * 60000;
      this.newInterval()
    };
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
                if(this.state.globalTempConvert === true) {
                  item[1] = Math.round((Math.round(data.main.temp - 273.15) * 1.8) + 32);   
                } else {
                  item[1] = Math.round(data.main.temp - 273.15)
                }
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
              description: data.weather[0].description,
              humidity: data.main.humidity + '%',
              wind: data.wind.speed + ' m/s',
              icon: currentIcon,
              weatherCards: this.state.weatherCards,
            });
            if(this.state.globalTempConvert === true) {
              if(this.state.tempConvert === false) {
                this.setState({
                  tempConvert: true
                })
              }
               this.setState({
                temperature: Math.round((Math.round(data.main.temp - 273.15) * 1.8) + 32),
                feelsLikeTemp: Math.round((Math.round(data.main.feels_like - 273.15) * 1.8) + 32)    
              });
            }
            else {
              if(this.state.tempConvert === true) {
                this.setState({
                  tempConvert: false
                })
              }
              this.setState({
                temperature: Math.round(data.main.temp - 273.15),
                feelsLikeTemp: Math.round(data.main.feels_like - 273.15)
              })
            }
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
  // function to convert temperature from celcius to fahrenheit
  convertToCels (e) {
    if(this.state.tempConvert === true) {
      let celcius = Math.round((this.state.temperature - 32) / 1.8);
      let feelslike = Math.round((this.state.feelsLikeTemp - 32) / 1.8);
      this.setState({tempConvert: false, temperature: celcius, feelsLikeTemp: feelslike}, () => 
      {localStorage.setItem("card", JSON.stringify(this.state))})
    }
  }
  // function to convert temperature from fahrenheit to celcius
  convertToFahr (e) {
    if(this.state.tempConvert === false) {
      let fahrenheit = Math.round((this.state.temperature * 1.8) + 32);
      let feelslike = Math.round((this.state.feelsLikeTemp * 1.8) + 32);
      this.setState({tempConvert: true, temperature: fahrenheit, feelsLikeTemp: feelslike}, () => 
      {localStorage.setItem("card", JSON.stringify(this.state))})
    }
  }
  // click handler in list of cities in Heade.jsx, input, dropdown list
  cityItemClick (currItem) {
    let input = document.querySelector('.search-input');
    input.value = currItem;
    this.fetchData();
    let searchbox = document.getElementById('search-list');
    searchbox.classList.remove('cities-list-after');
    searchbox.classList.add('cities-list-before');
  };
  // global change to celcius
  globalChangeToCels () {
    if(this.state.globalTempConvert === true) {
      this.state.weatherCards.map(item => {
        item[1] = Math.round((item[1] - 32) / 1.8)
      })
      this.setState({
        globalTempConvert: false
      }, () => 
      {localStorage.setItem("card", JSON.stringify(this.state))})
      if(this.state.tempConvert === true) {
        let celcius = Math.round((this.state.temperature - 32) / 1.8);
        let feelslike = Math.round((this.state.feelsLikeTemp - 32) / 1.8);
        this.setState({
          globalTempConvert: false,
          tempConvert: false,
          temperature: celcius, 
          feelsLikeTemp: feelslike
        }, () => 
        {localStorage.setItem("card", JSON.stringify(this.state))})
      }
    }
  };
  // global change to fahrenheit
  globalChangeToFahr () {
    if(this.state.globalTempConvert === false) {
      this.setState({
        globalTempConvert: true
      }, () => 
      {localStorage.setItem("card", JSON.stringify(this.state))})
      this.state.weatherCards.map(item => {
        item[1] = Math.round((item[1] * 1.8) + 32)
      })
      if(this.state.tempConvert !== true) {
        let fahrenheit = Math.round((this.state.temperature * 1.8) + 32);
        let feelslike = Math.round((this.state.feelsLikeTemp * 1.8) + 32);
        this.setState({
          globalTempConvert: true,
          temperature: fahrenheit, 
          tempConvert: true,
          feelsLikeTemp: feelslike
        }, () => 
        {localStorage.setItem("card", JSON.stringify(this.state))})
      }
    }
  };
  // drag and drop cards 
  handleOnDragEnd (result) {
    if (!result.destination) return;
    const items = Array.from(this.state.weatherCards);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    this.setState ({
      weatherCards: items
    }, () => {localStorage.setItem("card", JSON.stringify(this.state))})
  };

  render () {
    return (
      <div className='app'>
          <Header 
            globalTempConvert={this.state.globalTempConvert}
            globalChangeTempCels={this.globalChangeToCels}
            globalChangeTempFahr={this.globalChangeToFahr}
            cityItemClick={this.cityItemClick}
            enterClick={this.fetchDataEnter} 
            showWeather={this.fetchData}
          />
          <div className='weather-info'>
            <List
              handleOnDragEnd={this.handleOnDragEnd}
              deleteCard={this.deleteCards} 
              moreInfo={this.moreInfoRequest} 
              cards={this.state.weatherCards}
              updateCard={this.updateCards}
              getTimeUpdate={this.getUpdateTime}
            />
            <Display 
              cards={this.state.weatherCards}
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
          <Footer/>
      </div>
    )
  };
};
export default App;
let intervalTime = '';
let interval = '';


import React from 'react';
import './styles/Header.css';
class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <header className='header'>
                <h1 className='page-name'>MyWeather</h1>
                <div  className='header-main'>
                    <input onKeyDown={this.props.enterClick} onChange={this.props.getInputValue} value={this.props.value} 
                    placeholder='Enter your sity' className='search-input'></input>
                    <button onClick={this.props.showWeather} className='search-btn'>Show weather</button>
                </div>
            </header>
        )
    }
}
export default Header;
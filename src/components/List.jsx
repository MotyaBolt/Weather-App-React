import React from 'react';
import './styles/List.css';
class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            settings: false
        }
        this.showSettings = this.showSettings.bind(this);
    };
    showSettings () {
        this.state.settings === false ? this.setState({settings: true}) : this.setState({settings: false});
    }
    render () {
        return (
            <div className="list">
                <div className="settings">
                    <h1 className="label">History</h1>
                    <button onClick={this.showSettings} className="update-settigns">Settings</button>
                    <div className={this.state.settings === true ? "settings-block" : 'settings-block-none'}>
                    <h4>Automatic weather update every: </h4>
                      <p><input onChange={this.props.getTimeUpdate} className='radio' type="radio" name='updtime' value='10' defaultChecked></input>10 minutes</p>
                      <p><input onChange={this.props.getTimeUpdate} className='radio' type="radio" name='updtime' value='30'></input>30 minutes</p>
                      <p><input onChange={this.props.getTimeUpdate} className='radio' type="radio" name='updtime' value='60'></input>60 minutes</p>
                    </div>
                </div>
                {this.props.cards.map((item, index) => {
                    return (
                        <div key={index} className='list-item'>
                            <button onClick={() => {this.props.deleteCard(item)}} className='delete-card'>Delete</button>
                            <h2 className='card-name'>{item[0]}</h2>
                            <span className='card-temp'>{item[1]}<sup>o</sup></span>
                            <p className='description-weather'>{item[3]}</p>
                            <p>Last update: {item[2]}</p>
                            <button onClick={() => {this.props.moreInfo(item)}} className='more-info'>Show weather</button>
                        </div>
                    )
                })}
            </div>
        )
    }
}
export default List;
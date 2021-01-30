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
                <div className="settings-wrapper">
                    <div className="settings">
                        <h4 className="label">Last seen</h4>
                        <button onClick={this.showSettings} className="update-settigns"><i className="fas fa-cog"></i></button>
                    </div>
                    <div className={this.state.settings === true ? "settings-block" : 'settings-block-none'}>
                        <h4 className="settings-label">Automatic weather update every: </h4>
                        <p className='radio-text'><input onChange={this.props.getTimeUpdate} className='radio' type="radio" name='updtime' value='10' ></input>10 minutes</p>
                        <p className='radio-text'><input onChange={this.props.getTimeUpdate} className='radio' type="radio" name='updtime' value='30' ></input>30 minutes</p>
                        <p className='radio-text'><input onChange={this.props.getTimeUpdate} className='radio' type="radio" name='updtime' value='60'></input>60 minutes</p>
                    </div>
            </div>
                {this.props.cards.map((item, index) => {
                    return (
                        <div key={index} className='list-item'>
                            <div className='list-item-main'>
                                <div className='main-listitem-block'>
                                    <h2 className='card-name'>{item[0]}</h2>
                                    <p className='description-weather'>{item[3]}</p>
                                </div>
                                <div className='listitem-description'>
                                    <p className='card-temp'>{item[1]}<sup>o</sup></p>
                                    <p className='upd-info'>Last update: {item[2]}</p>
                                </div>
                                <div className='del-btn-block'>
                                    <button onClick={() => {this.props.deleteCard(item)}} className='delete-card'><i className="fas fa-times"></i></button>
                                </div>
                            </div>
                            <button onClick={() => {this.props.moreInfo(item)}} className='more-info'>Show weather</button>
                        </div>
                    )
                })}
            </div>
        )
    }
}
export default List;
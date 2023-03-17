import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import "../../styles/List.css";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.myref = React.createRef();
    this.state = {
      settings: false,
    };
    this.showSettings = this.showSettings.bind(this);
  }
  showSettings() {
    this.state.settings === false
      ? this.setState({ settings: true })
      : this.setState({ settings: false });
  }
  render() {
    return (
      <div className={this.props.cards.length > 0 ? "list" : "list-none"}>
        <div className="list-block">
          <div className="settings-wrapper">
            <div className="settings">
              <h4 className="label">Last seen</h4>
              <button onClick={this.showSettings} className="update-settigns">
                <i className="fas fa-cog"></i>
              </button>
            </div>
            <div
              className={
                this.state.settings === true
                  ? "settings-block"
                  : "settings-block-none"
              }
            >
              <h4 className="settings-label">
                Automatic weather update every:{" "}
              </h4>
              <p className="radio-text">
                <input
                  onChange={this.props.getTimeUpdate}
                  className="radio"
                  id="10min"
                  type="radio"
                  name="updtime"
                  value="10"
                ></input>
                <label htmlFor="10min">10 minutes</label>
              </p>
              <p className="radio-text">
                <input
                  onChange={this.props.getTimeUpdate}
                  className="radio"
                  id="30min"
                  type="radio"
                  name="updtime"
                  value="30"
                ></input>
                <label htmlFor="30min">30 minutes</label>
              </p>
              <p className="radio-text">
                <input
                  onChange={this.props.getTimeUpdate}
                  className="radio"
                  id="60min"
                  type="radio"
                  name="updtime"
                  value="60"
                ></input>
                <label htmlFor="60min">60 minutes</label>
              </p>
            </div>
          </div>
          <DragDropContext onDragEnd={this.props.handleOnDragEnd}>
            <Droppable droppableId="cards">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="list-app"
                >
                  <TransitionGroup>
                    {this.props.cards.map((item, index) => {
                      return (
                        <CSSTransition
                          timeout={450}
                          classNames="item"
                          key={index}
                        >
                          <Draggable
                            draggableId={item[4]}
                            index={index}
                            key={item[4]}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                key={item[4]}
                                className="list-item"
                              >
                                <div className="list-item-main">
                                  <div className="main-listitem-block">
                                    <h2 className="card-name">{item[0]}</h2>
                                    <p className="description-weather">
                                      {item[3]}
                                    </p>
                                  </div>
                                  <div className="listitem-description">
                                    <p className="card-temp">
                                      {item[1]}
                                      <sup>o</sup>
                                    </p>
                                    <p className="upd-info">
                                      Last update: {item[2]}
                                    </p>
                                  </div>
                                  <div className="del-btn-block">
                                    <button
                                      onClick={() => {
                                        this.props.deleteCard(item);
                                      }}
                                      className="delete-card"
                                    >
                                      <i className="fas fa-times"></i>
                                    </button>
                                  </div>
                                </div>
                                <button
                                  onClick={() => {
                                    this.props.moreInfo(item);
                                  }}
                                  className="more-info"
                                >
                                  Details
                                </button>
                                {provided.placeholder}
                              </div>
                            )}
                          </Draggable>
                        </CSSTransition>
                      );
                    })}
                  </TransitionGroup>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    );
  }
}
export default List;

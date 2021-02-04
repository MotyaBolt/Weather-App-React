import React, { useState, useCallback } from "react";
import debounce from "lodash.debounce";
import "./styles/Header.css";
let searchValue = "";
function Header (props) {
    const [citylist, changeList] = useState("")
    const debouncedSave = useCallback(
        debounce(() => {
        if(searchValue !== "") {
           fetch("https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json")
           .then(response => {
                if (response.ok) {
                return response.json();
                } else {
                    throw new Error("Something went wrong ...");
                }
            })
            .then((data) => {
                let citiesData = data;
                let filteredCities = citiesData.filter(item => {
                    let regex = new RegExp(`^${searchValue}`, "gi")
                    return item.name.match(regex);
                })
                changeList(filteredCities)
            })
        }
        else {
            changeList("")
        }}, 250)
    
    );
    
    const handleKeyUp = (e) => {
        searchValue = e.target.value;
        let searchbox = document.getElementById("search-list");
        if(e.target.value !== "") {
            searchbox.classList.remove("cities-list-before");
            searchbox.classList.add("cities-list-after");
        }
        else {
            searchbox.classList.remove("cities-list-after");
            searchbox.classList.add("cities-list-before");
        }
            debouncedSave();
    };

        
    const inputBlur = (e) => {
        let searchbox = document.getElementById("search-list");
        if (!e.relatedTarget) {
            searchbox.classList.remove("cities-list-after");
            searchbox.classList.add("cities-list-before");
        }
        else if(e.relatedTarget && e.relatedTarget.id === "search-list" || e.relatedTarget.className === "search-item") {
            e.preventDefault();
        }
        else {
            searchbox.classList.remove("cities-list-after");
            searchbox.classList.add("cities-list-before");
        }
    }

        return (
            <header  className="header">
                <h1 className="page-name">MyWeather</h1>
                <div  className="header-main">
                    <div className="search-block">
                        <input onBlur={inputBlur} onKeyUp={handleKeyUp} onKeyDown={props.enterClick} 
                        placeholder="Enter city" className="search-input"></input>
                        <div tabIndex="1" id="search-list" className="cities-list-before">
                       {citylist !== "" ? citylist.map((item, index) => {
                           return (
                               <li tabIndex="1" onClick={() => {props.cityItemClick(item.name)}} key={index} className="search-item">{item.name} ({item.country })</li>
                           )
                       }) : ""}
                        </div>
                    </div>
                    <button onClick={props.showWeather} className="search-btn">Show weather</button>
                </div>
                <div className="page-settings">
                    <div className="cels-fahr-selector">
                        <div onClick={props.globalChangeTempCels} className={props.globalTempConvert === false ? "cels-block" : "cels-block-after"}><span className="temp-item"><sup>o</sup>C</span></div>
                        <div onClick={props.globalChangeTempFahr} className={props.globalTempConvert === true ? "fahr-block" : "fahr-block-after"}><span className="temp-item"><sup>o</sup>F</span></div>
                    </div>
                </div>
            </header>
        )
}
export default Header;

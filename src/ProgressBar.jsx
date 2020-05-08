import React from 'react';
import './App.css';

const emojiList =["⚪","⭐","🌞"];
const getId =  (str)=>  '_' + getHash(str) + Math.random().toString(36).substr(2, 16);
const getHash= (str) =>{
    var hash = 0, i, chr;
    if (str.length !== 0) {
        for (i = 0; i < str.length; i++) {
            chr   = str.charCodeAt(i);
            hash  = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
    }
    return hash;
  };


function ProgressBar ({value, skillName, onProgressClick,onInputChange}){
    let idSkill = getId(skillName);
    return(
        <div className = "progressBar">
            <progress max="2" onClick = {onProgressClick} value = {value[0]}>
            </progress>
            <span>{emojiList[value[0]]}</span>
            {value[0]!==2 && (<>
                <input type="checkbox" id={idSkill} checked={value[1]===1} value="1" onChange = {onInputChange}/>
                <label for={idSkill}>
                    Хочу изучить
                </label>
                </>
            )}
            
        </div>
    );
}

 
export default ProgressBar;
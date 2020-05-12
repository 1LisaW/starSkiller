import React from 'react';
import './Header.css';


function FilterElements({roleNames,onInputChange}){
    return(
        <header>
        <div className="filterElem">
            {Object.keys(roleNames).map((currRole)=>{
                return(
                    
                    <label htmlFor={currRole} className={(roleNames[currRole]["role"] ? roleNames[currRole]["tagName"]: "switchedOff")}>
                        <input type="checkbox" id={currRole} onChange = {()=>onInputChange(currRole)}  checked={roleNames[currRole]["role"]}></input>
                        {currRole}
                    </label>
                )})
            }
        </div>
        </header>
    )
}


export default FilterElements;
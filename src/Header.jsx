import React from 'react';
import './Header.css';


function FilterElements({roleNames,onInputChange}){
    return(
        <header>
        <div key={"filterElem"} className="filterElem">
            {Object.keys(roleNames).map((currRole)=>{
                return(
                    
                    <label key={currRole} htmlFor={currRole} className={(roleNames[currRole]["role"] ? roleNames[currRole]["tagName"]: "switchedOff")}>
                        <input key={currRole} type="checkbox" id={currRole} onChange = {()=>onInputChange(currRole)}  checked={roleNames[currRole]["role"]}></input>
                        {currRole}
                    </label>
                )})
            }
        </div>
        </header>
    )
}


export default FilterElements;
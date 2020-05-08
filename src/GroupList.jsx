import React from 'react';
import './App.css';
import ProgressBar from './ProgressBar.jsx';

function GroupList ({obj, onPointChange,onLearnChange}) {

    return (
      <ul className="skillGroup">
          {Object.keys(obj).map(cur => {
            return (
              <li key={cur}>
                <h2>{cur}</h2>
                <ul className="skillElement">
                  {Object.keys(obj[cur]["skills"]).map( key=>{
                    return (<li key={key}><span>{key}</span>
                              <ProgressBar value={obj[cur]["skills"][key]} skillName ={key} 
                                onProgressClick={()=> onPointChange(cur,key)} 
                                onInputChange ={()=> onLearnChange(cur,key)}
                              ></ProgressBar>
                           </li>)
                  })}
                </ul>
              </li>
            );
          })}
      </ul>
    );
  };

  export default GroupList;
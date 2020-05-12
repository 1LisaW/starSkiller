import React from 'react';
import './App.css';
import ProgressBar from './ProgressBar.jsx';
import roleList from './roles.json';

function GroupList ({obj,roles,onPointChange,onLearnChange}) {

  function getStyle (currentFilteredRoles){
    let result ={};
    const array = Object.keys(roleList).filter(item => 
      (currentFilteredRoles.includes(roleList[item]["tagName"])&&(roleList[item]["color"]))
    ).map((skill) => roleList[skill]["color"]);
    if (array.length>1){
       result ={"background":"linear-gradient(120deg,"+array.join(",")+")"}
    } else
       result ={"backgroundColor":array[0]};
     return result
  }

    return (
      <ul key={"skillGroup"} className="skillGroup">
          {Object.keys(obj).map(cur => {
            const skillGroupFilterRoles = roles.filter(role => obj[cur]["roles"].includes(role));
            
            return (
              <React.Fragment key={cur}>
              { skillGroupFilterRoles.length>0 &&
              (<li key={cur} style={getStyle(skillGroupFilterRoles)}>
                <h2>{cur}</h2>
                <ul key={cur} className="skillElement">
                  {Object.keys(obj[cur]["skills"]).map( key=>{
                    return (<li key={key}><span>{key}</span>
                              <ProgressBar value={obj[cur]["skills"][key]} skillName ={key} 
                                onProgressClick={()=> onPointChange(cur,key)} 
                                onInputChange ={()=> onLearnChange(cur,key)}
                              ></ProgressBar>
                           </li>)
                  })}
                </ul>
              </li>)
              }
              </React.Fragment>
            );
          })}
      </ul>
    );
  };

  export default GroupList;
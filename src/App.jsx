import React,{useState} from 'react';
import './App.css';
import './progress-bar.css';

import GroupList from './GroupList.jsx';
import competence from './competence.json';

function App() {
  const skillValue ={...competence};
  for (let key in skillValue){
    const array = skillValue[key];
    skillValue[key]={};
    array.map((item)=> skillValue[key][item]=[0,0]);
  };
  const [currentSkillValue, setSkillValue] = useState(skillValue);

  
  function handlePoints(groupName,skillName){
    const obj = {...currentSkillValue};
    obj[groupName][skillName][0]=(obj[groupName][skillName][0]+1)%3;
    if(obj[groupName][skillName][0]===2){ 
      obj[groupName][skillName][1]=0
    };
    setSkillValue(obj);
  }
  function handleLearn(groupName,skillName){
    const obj = {...currentSkillValue};
    obj[groupName][skillName][1]=(obj[groupName][skillName][1]+1)%2;
    setSkillValue(obj);
    console.log(skillName,obj[groupName][skillName][1])
  }

  return (
    <div >
      <GroupList obj ={currentSkillValue} onPointChange ={handlePoints} onLearnChange={handleLearn}/>     
    </div>
    
  );
}


export default App;

import React,{useState} from 'react';
import './App.css';
import './progress-bar.css';

import GroupList from './GroupList.jsx';
import FilterElements from './Header';
import competence from './competence.json';
import roles from './roles.json';

function App() {
  // let url = new URL(window.location.href);
  // let params = new URLSearchParams(url.search.slice(1));
  // params.set('size', 'L') 
  // console.log(params);
  
  // declaration - role state repository {rolesMap}
  const rolesMap =JSON.parse(JSON.stringify(roles));
 

  // writing default value  {rolesMap}
  Object.keys(rolesMap).map((item) => {
      rolesMap[item]["role"]="true";
  });
  
  const [currentRolesMap,setRolesMap]= useState(rolesMap);
   // declaration - array of selected tags [currentRoles]
  const currentRoles = Object.keys(currentRolesMap).filter((item)=>currentRolesMap[item]["role"]).map(item=>currentRolesMap[item]["tagName"]);
  // callback for changing filters
  function handleFilterClick(roleName){
    const newRolesMap ={...currentRolesMap};
    newRolesMap[roleName]["role"]=!newRolesMap[roleName]["role"];
    if (roleName==="ALL SKILLS"){
      Object.keys(newRolesMap).map((item) => {
        newRolesMap[item]["role"] = newRolesMap[roleName]["role"];
      });
    }
    // currentRoles = Object.keys(newRolesMap).filter((item)=>newRolesMap[item]["role"]).map(item=>newRolesMap[item]["tagName"]);
   
    setRolesMap(newRolesMap);
    
  }

  //declaration - skill state repository {skillValue}
  const skillValue =JSON.parse(JSON.stringify(competence));
    // writing default value  {skillValue}
  for (let key in skillValue){
    if (skillValue[key]["roles"].length===0){
      skillValue[key]["roles"] ="no_tag";
    }
    const array = skillValue[key]["skills"];
    skillValue[key]["skills"]={};
    array.map((item)=> skillValue[key]["skills"][item]=[0,0]);
  };
  const [currentSkillValue, setSkillValue] = useState(skillValue);

  
  function handlePoints(groupName,skillName){
    const obj = {...currentSkillValue};
    obj[groupName]["skills"][skillName][0]=(obj[groupName]["skills"][skillName][0]+1)%3;
    if(obj[groupName]["skills"][skillName][0]===2){ obj[groupName]["skills"][skillName][1]=0};
    setSkillValue(obj);
  }
  function handleLearn(groupName,skillName){
    const obj = {...currentSkillValue};
    obj[groupName]["skills"][skillName][1]=(obj[groupName]["skills"][skillName][1]+1)%2;
    setSkillValue(obj);
  }


  return (
    <>
     <FilterElements roleNames ={currentRolesMap} onInputChange={handleFilterClick}></FilterElements>
    <div >
      <GroupList obj ={currentSkillValue} roles ={currentRoles} onPointChange ={handlePoints} onLearnChange={handleLearn}/>     
    </div>
    </>
  );
}


export default App;

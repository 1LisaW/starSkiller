import React,{useState} from 'react';
import './App.css';
import './progress-bar.css';

import GroupList from './GroupList.jsx';
import FilterElements from './Header';
import competence from './competence.json';
import roles from './roles.json';

function App() {

  const url = new URL(window.location);
  const params = url.search.substring(1).split("&"),
    keyPairs = {};
    for (var i = params.length - 1; i >= 0; i--) {
      keyPairs[params[i].split('=')[0]]=decodeURIComponent([params[i].split('=')[1]].join("")).trim();
      
  };
  const incomingFilters = keyPairs["tags"].split(",");

  // declaration - role state repository {rolesMap}
  const rolesMap =JSON.parse(JSON.stringify(roles));
  

  // writing default value  {rolesMap}
  const crossFilters = Object.keys(rolesMap).filter(item=>incomingFilters.includes(rolesMap[item]["tagName"])).map(item=>rolesMap[item]["tagName"]);
 
  Object.keys(rolesMap).forEach((item) =>{
    rolesMap[item]["role"]= !crossFilters.length || crossFilters.includes(rolesMap[item]["tagName"]);
  });

 
  
  const [currentRolesMap,setRolesMap]= useState(rolesMap);

   // declaration - array of selected tags [currentRoles]
  const currentRoles = Object.keys(currentRolesMap).filter((item)=>currentRolesMap[item]["role"]).map(item=>currentRolesMap[item]["tagName"]);
  // callback for changing filters
  function handleFilterClick(roleName){
    const newRolesMap ={...currentRolesMap};
    newRolesMap[roleName]["role"]=!newRolesMap[roleName]["role"];
    if (roleName==="ALL SKILLS"){
      Object.keys(newRolesMap).map((item) => 
        newRolesMap[item]["role"] = newRolesMap[roleName]["role"]
      );
    }
   
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
     <FilterElements key={"filterElements"} roleNames ={currentRolesMap} onInputChange={handleFilterClick}></FilterElements>
  <h1>Привет {(keyPairs.username)&&(keyPairs.username.length>0)&&", "+ keyPairs.username+"!"}</h1>
    <div key={"groupList"}>
      <GroupList obj ={currentSkillValue} roles ={currentRoles} onPointChange ={handlePoints} onLearnChange={handleLearn}/>     
    </div>
    </>
  );
}


export default App;

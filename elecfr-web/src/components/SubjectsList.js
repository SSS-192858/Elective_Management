import React from 'react';
import { useEffect, useState } from 'react';
import { getSubjects } from '../services/user_services';
import SubjectListItem from '../common/SubjectListItem';

function SubjectsList() {
  const [subjects, setSubjects] = useState([]);

  const getSubjectsComp = async () => {
    const response = await getSubjects();
    setSubjects(response)
  }

  useEffect(() => {
    getSubjectsComp()
  },[])
    
  return (
    <>
      { (subjects.length === 0) ? <div className='container'>
        <header className='jumbotron'> 
          Nothing to show
        </header>
        
      </div>
        : null
      } 
    <ul id="remove">
      {subjects.map((data) => (
        <li id="space" key= {data.bookCode}><SubjectListItem subject={data}/></li>
      ))}
    </ul>
    </>
  );
}

export default SubjectsList;
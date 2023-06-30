import React from 'react';
import { useEffect, useState } from 'react';
import { getSubjects, getSubjectByInstructorId } from '../services/user_services';
import SubjectListItem from '../common/SubjectListItem';
import { getInstructorFromStorage } from '../services/localStorage_services';

function SubjectsList({choice}) {
  const [subjects, setSubjects] = useState([]);

  const getSubjectsComp = async () => {
    if (choice === 1){
      const response = await getSubjects();
      setSubjects(response)
    }else if (choice === 2){
      const instructor = getInstructorFromStorage();
      const response = await getSubjectByInstructorId(instructor.id);
      setSubjects(response);
    }
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
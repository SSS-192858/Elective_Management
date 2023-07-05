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
    { (subjects.length === 0) ? <div className='container banner'>
      <header className='jumbotron banner'> 
        <h5>Nothing to show</h5>
      </header>
      
    </div>
      : null
    } 
    <div className='container'>
      <div className='row'>

      {subjects.map((data) => (
        <div id="space" key= {data.subjectCode} className='col-lg-4 col-sm-12 col-md-6'><SubjectListItem subject={data}/></div>
      ))}
      </div>
    </div>
    </>
  );
}

export default SubjectsList;
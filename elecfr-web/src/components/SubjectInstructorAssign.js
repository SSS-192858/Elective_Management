import React, { useEffect, useState } from 'react'
import { getInstructors } from '../services/user_services'
import { getSubjectFromStorage } from '../services/localStorage_services'
import SubjectInstructorAssignItem from '../common/SubjectInstructorAssignItem'

const SubjectInstructorAssign = () => {

    const [subject,setSubject] = useState(()=>{
      const response = getSubjectFromStorage();
      return response;
    })
    
    const [instructors,setInstructors] = useState([]);

    const getInstructorsOnStart=async()=>{
        const response = await getInstructors();
        setInstructors(response);
    }
    useEffect(()=>{
        getInstructorsOnStart();
    },[])

    return (
        <>
        <div className='container'>
            <header className='jumbotron'>
                <h3>
                    Pick Instructor to assign to this course
                </h3>
            </header>
        </div>
        <ul id="remove">
          {instructors.map((data) => (
            <li id="space" key= {data.id}><SubjectInstructorAssignItem instructor={data} subject={subject}/></li>
          ))}
        </ul>
      </>
  )
}

export default SubjectInstructorAssign;
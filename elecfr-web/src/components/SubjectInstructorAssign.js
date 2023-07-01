import React, { useEffect, useState } from 'react'
import { getInstructors } from '../services/user_services'
import { getSubjectFromStorage } from '../services/localStorage_services'

const SubjectInstructorAssign = () => {
    const [subject,setSubject] = useState(()=>{
      const response = getSubjectFromStorage();
      return response;
    })
    const [instructors,setInstructors] = useState([]);

    const getInstructorsOnStart=()=>{
        const response = getInstructors();
        setInstructors(response);
    }
    useEffect(()=>{
        getInstructorsOnStart();
    },[])

    return (
        <>
        { (instructors.length === 0) ? <div className='container'>
                <header className='jumbotron'> 
                    Nothing to show
                </header>
            </div>
                : null
        }
        <ul id="remove">
          {instructors.map((data) => (
            <li id="space" key= {data.id}><SubjectInstructorAssignItem instructor={data} subject={subject}/></li>
          ))}
        </ul>
      </>
  )
}

export default SubjectInstructorAssign;
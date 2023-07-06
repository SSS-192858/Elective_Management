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

        <div className='container'>
          <div className='row'>

          {instructors.map((data) => (
            <div id="space" key= {data.id} className='col-lg-4 col-sm-12 col-md-6'><SubjectInstructorAssignItem data={data} subject={subject}/></div>
          ))}
          </div>
        </div>
      </>
  )
}

export default SubjectInstructorAssign;
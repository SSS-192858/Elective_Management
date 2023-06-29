import React, {useState, useEffect} from 'react'
import { getStudents } from '../services/user_services';
import InstructorListItem from "../common/InstructorListItem";

function InstructorList(){

    const [instructors, setInstructors] = useState([]);

  const getInstructorComp = async () => {
    const response = await getStudents();
    setInstructors(response);
  }

  useEffect(() => {
    getInstructorComp();
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
          <li id="space" key= {data.id}><InstructorListItem instructor={data}/></li>
        ))}
      </ul>
    </>
  );
}

export default InstructorList;
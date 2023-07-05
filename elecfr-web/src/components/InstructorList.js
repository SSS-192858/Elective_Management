import React, {useState, useEffect} from 'react'
import { getInstructors } from '../services/user_services';
import InstructorListItem from "../common/InstructorListItem";

function InstructorList(){

    const [instructors, setInstructors] = useState([]);

  const getInstructorComp = async () => {
    const response = await getInstructors();
    setInstructors(response);
  }

  useEffect(() => {
    getInstructorComp();
  },[])
  
  return (
    <>
    { (instructors.length === 0) ? <div className='container banner'>
            <header className='jumbotron banner'> 
              <h5>Nothing to show</h5>
            </header>
        </div>
            : null
    }
    <div className='container'>
      <div className='row'>
        {instructors.map((data) => (
          <div key= {data.id} className='col-lg-4 col-sm-12 col-md-6'><InstructorListItem instructor={data}/></div>
        ))}
      </div>
    </div>
    </>
  );
}

export default InstructorList;
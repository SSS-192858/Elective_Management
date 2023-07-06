import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";

const Home = ({currentUser}) => {
    const navigate = useNavigate();

    useEffect(() => {
        const func = () => {
            if (currentUser){
                navigate("/subjects")
            }else{
                navigate("/login")
            }
        }
        func();
    }, [])

    return (
        <> 
        </>
    );  
}

export default Home;
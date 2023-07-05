import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const func = () => {
            if (currentUser){
                navigate("/books")
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
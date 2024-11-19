import { useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({children}){

    const navigate = useNavigate()
    const {isAuthenticate} = useAuth()

    useEffect(function(){
        if(!isAuthenticate){
            navigate('/login')
        }
    },[isAuthenticate,navigate])

    return isAuthenticate ? children : ''

}

export default ProtectedRoute;
import { createContext, useContext, useReducer } from "react";

const FAKE_USER = {
    name: "Sedhu",
    email: "sedhu@example.com",
    password: "test1234",
    avatar: "https://i.pinimg.com/736x/6c/20/1b/6c201b8f181f03c69630ddd5765c8e81.jpg",
  };


const AuthContext = createContext()

const initialState ={
    userData : null,
    isAuthenticate : false,
    error:''
}

function reducer(state,action){
    switch(action.type){
        case 'auth/login':
            return {...state, userData: {name:FAKE_USER.name, avatar:"https://i.pinimg.com/736x/c3/b5/98/c3b59893284323836c2e2e7a27d802c1.jpg"}, isAuthenticate:true}
        case 'auth/logout':
            return {...state, userData: null, isAuthenticate:false}
        default:
            return {...state, error:'sorry you are not loggedin!'}
    }
}

function Authenticate({children}){
    const [{userData,isAuthenticate}, dispatch] = useReducer(reducer,initialState)

    function Login(user){
        if(user.email === FAKE_USER.email && user.password === FAKE_USER.password){
            dispatch({type:'auth/login'})
        }
    }

    function LogOut(){
        dispatch({type:'auth/logout'})

    }
    return(
        <AuthContext.Provider value={{Login ,LogOut, userData, isAuthenticate}}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext)
    return context
}

export {Authenticate, useAuth}
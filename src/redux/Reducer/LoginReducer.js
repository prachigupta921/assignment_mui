import { LOGIN_ACTION } from "../Action/Login";

const InitialState={
    loginAction:[],
}

const LoginReducer=(state=InitialState,action)=>{
    switch(action.type){
        case LOGIN_ACTION:{
            return{
                ...state,
                loginAction: action.payload,
            }
        }
       
        default:{
            return{
                ...state,
            };
        }
    }
}

export default LoginReducer
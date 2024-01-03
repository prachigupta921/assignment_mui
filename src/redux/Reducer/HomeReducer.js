import { HOME_ACTION } from "../Action/HomeAction";
const InitialState={
    homeAction:[],
}

const HomeReducer=(state=InitialState,action)=>{
    switch(action.type){
        case HOME_ACTION:{
            return{
                ...state,
                homeAction: action.payload,
            }
        }

       
        default:{
            return{
                ...state,
            };
        }
    }
}

export default HomeReducer
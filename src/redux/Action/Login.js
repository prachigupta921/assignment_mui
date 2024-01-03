import axios from "axios";
import { HeaderToken } from "../../Utils/HeaderToken";

export const LOGIN_ACTION = "LOGIN_ACTION";

export const LoginAction = (userObj,navigate) => {
    return async (dispatch) => {
      return axios
        .post(`https://scorenodeapi.cloudd.live/signin`, userObj)
        .then((res) => {
          console.log(res, "response...........");
          dispatch({ type: LOGIN_ACTION, payload: res.data });
          localStorage.setItem("token","Bearer "+res.data.result.token)
          navigate("/token")
        })
        .catch((err) => {
          console.log("err", err);
          // throw Error(err);
        });
    };
  };
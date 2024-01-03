import axios from "axios";
import { HeaderToken } from "../../Utils/HeaderToken";
export const HOME_ACTION="HOME_ACTION";


// export const HomeAction = () => {
//     return async (dispatch) => {
//        // axios.defaults.headers.get['Content-Type'] = 'multipart/form-data';
//         await axios.post(`https://scorenodeapi.cloudd.live/admin/tabs`, HeaderToken())
//             .then((res) => {
//                 console.log(res, "res")
//                 // dispatch({ type: HOME_ACTION, payload: res.data});
//             }).catch(error => {
//                 console.log(error);
//             })
//     }
// }


export const HomeAction = (userObj) => {
    return async (dispatch) => {
      return axios
        .post(`https://scorenodeapi.cloudd.live/admin/tabs`, userObj,HeaderToken())
        .then((res) => {
          console.log(res.data, "hhresponse...........");
          dispatch({ type: HOME_ACTION, payload: res.data.result });
        })
        .catch((err) => {
          console.log("err", err);
          // throw Error(err);
        });
    };
  };
import axios from "axios"
import { Navigate } from "react-router-dom";
import { useAsync } from "react-use";



export const LogOut = () =>{

 


    console.log("i m here");
    const url = "https://localhost:44321/auth/logout";
    const GetOut = async () => {
      await axios
        .post(url,{ withCredentials: true })
        .catch((err) => {
          console.log(err);
        });


    };
    let state = useAsync(GetOut,[]);
    if(state.loading) {return <div>Loading</div> }
    return <Navigate to='/login' />
}
export default LogOut;
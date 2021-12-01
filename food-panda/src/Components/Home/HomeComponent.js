
import axios from 'axios';
import { useState } from 'react';



const HomeComponent = () => {
 
    const [name,SetName] = useState('');
  axios.get("https://localhost:5001/restaurants/getall")
        .then( res =>{
            SetName(res.data);
            console.log(res.data);
        })
        .catch(error =>{
            console.log(error);
        })


    return <div>{name}</div>
};

export default HomeComponent;
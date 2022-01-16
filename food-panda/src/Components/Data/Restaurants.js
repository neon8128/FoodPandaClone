import { useAsync } from "react-use";
import { useEffect, useState } from "react";
import CardComponent from "../Card/CardComponent";



export const Restaurants=() =>
{
    const getData = async() =>{
        await fetch("https://localhost:44321/restaurants/getall")
       .then(response => response.json())
       .then(jsonResponse => {
        return  SetRestaurants([jsonResponse.data][0]);
      });
    }
   const [restaurants, SetRestaurants] = useState([]);
    
    useEffect( async() => {
        await getData();
        
    }, [])

     
    return(
        <>
        {restaurants.map(restaurant => 
            <CardComponent 
            key={restaurant.key}
            item={restaurant}
            />
            )}
        <div>Hello from restaurants 
             </div>
        </>
    );
}
export default Restaurants;
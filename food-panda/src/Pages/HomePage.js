
import { useEffect, useState } from "react";
import CardList from "../Components/Card/CardList";
import Navbar from "../Components/Navbar/MainNavigation";
import SearchBar from "../Components/Search/SearchBar";

const HomePage = () => {
   const [data, setData] = useState([]);
    const [results, setResults] = useState([]);
    const getData = async() =>{
        await fetch("https://localhost:44321/restaurants/getall")
       .then(response => response.json())
       .then(jsonResponse => {
           
        setData([jsonResponse.data][0]);
      });
    }
     
    useEffect( async() => {
        await getData();
    }, [])
    const SearchData =  (text) =>{
        if(text !== ""){
            const filtered = data.filter((item)=>{
                return item.name.toLowerCase().includes(text.toLowerCase());
            })
            setResults(filtered);
        }
        else{
            setResults(data);
        } 
    }

    const handleInput = (e) =>{
        console.log(e.target.value);
        SearchData(e.target.value);
    }

  

    return (
    <>
    <SearchBar handleInput={handleInput}/>
    <CardList results={results}/>  
    </>);
};

export default HomePage;

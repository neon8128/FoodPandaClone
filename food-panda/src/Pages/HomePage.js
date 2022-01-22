
import { useEffect, useState } from "react";
import { useAsync } from "react-use";
import CardList from "../Components/Card/CardList";
import Navbar from "../Components/Navbar/MainNavigation";


const HomePage = () => {
   const [data, setData] = useState([]);
    const [results, setResults] = useState(data);
    const [text, setText] = useState("");

    
    useEffect(()=>{
       
        SearchData();
    },[text,data])
    const getData = async() =>{
        await fetch("https://localhost:44321/restaurants/getall")
       .then(response => response.json())
       .then(jsonResponse => {
        setData([jsonResponse.data][0]);
      });
    }

    const SearchData =  () =>{
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
     
    const state= useAsync(getData,[]);

  if(state.loading) {return <div>Loading Data</div> }


    const handleInput = (e) =>{
        setText(e.target.value.toLowerCase());
       
    }

    

    return (
    <>
    <Navbar handleInput={handleInput}/>
    <CardList results={results}/>  
    </>);
};

export default HomePage;

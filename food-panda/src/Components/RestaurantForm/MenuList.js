
import { useEffect, useState } from 'react';
import Item from "./Item";
import './style.css';
import Swal from 'sweetalert2'

        
export const MenuList = (props) =>{
    
    const {restaurant, token} = props;

    const [menuList, setMenuList] = useState([])
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [created,setCreated] = useState(false);
    const [updated,setUpdated] = useState(false);
   
    const Refresh = async() =>{
    
        if(restaurant == null) return null;
    
        try {
            const url = `https://localhost:44321/products/getall?Id=${restaurant.id}`;
            await fetch(url, {
              method: "get",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then((response) => response.json())
              .then((jsonResponse) => {
                setMenuList([jsonResponse.data][0]);
               // console.log([jsonResponse.data][0]);
              });
            // console.log(response);
           } catch (err) {
             console.log(err);
           }
    }
    useEffect(async()=>{
        await Refresh();

    },[])

   

      const  updateRequest = async(formData) =>{
        const url = `https://localhost:44321/products/update/${recordForEdit.id}`;

        console.log(JSON.stringify(Object.fromEntries(formData)));
        try {
            await fetch(url, {
              method: "put",
              body: formData,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then((response) => response.json())
              .then((jsonResponse) => {
                setUpdated(true);
              });

           } catch (err) {
             console.log(err);
          
           }
       }
       const sendRequest = async(formData) =>{
        const url = "https://localhost:44321/Products/Create";
        try {
           await fetch(url, {
             method: "post",
             body: formData,
             headers: {
               Authorization: `Bearer ${token}`,
             },
           })
             .then((response) => response.json())
             .then((jsonResponse) => {
               setCreated(true);
             });
           // console.log(response);
          } catch (err) {
            console.log(err);

          }
      }
    const addOrEdit = async (formData, onSuccess) => {
 
          if (recordForEdit?.id){
              //update record
              onSuccess();
              await updateRequest(formData);
              await Refresh();
              if(updated){
                Swal.fire("Great Job!","The item was successfully updated","success");
                setUpdated(false);
                
              }             
              
          }
          else{
              //create record
              await sendRequest(formData);
              await Refresh();
              if(created){
                Swal.fire("Great Job!","The item was successfully created","success");
                setCreated(false);
                
              }
 
          }
           
    }
    
    const showRecordDetails = data => {
        setRecordForEdit(data)
    }
    
    const onDelete = async(e, id) => {
        e.stopPropagation();
        if (window.confirm('Are you sure to delete this record?'))
        {
            const url = `https://localhost:44321/products/delete/${id}`
            await fetch(url,{
                method:"delete",
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
            })
                 .then( async res =>{
                   await  Refresh();
                   Swal.fire("Great Job!","The item was successfully deleted","success");
                 } )
                 .catch(err => {
                    Swal.fire({
                        title: 'Error!',
                        text: "Something happened",
                        icon: 'error',
                        confirmButtonText: 'Cool'
                      })
                 }) 
        }
    
    }
    const imageCard = data => (
        <div className="card" onClick={() => { showRecordDetails(data) }}>
            <img src={data.imagePath} className="card-img-top rounded-circle" />
            <div className="card-body">
                <h5>{data.item}</h5>
                <span>{data.price +" RON"}</span> <br />
                <button className="btn btn-light delete-button" onClick={e => onDelete(e, data.id)}>
                    <i className="far fa-trash-alt"></i>
                </button>
            </div>
        </div>
    )



    
    return (
       restaurant ?
       <div className="row">
       <div className="col-md-12">
           <div className="jumbotron jumbotron-fluid py-4">
   
           </div>
       </div>
       <div className="col-md-4">
                <Item
                    addOrEdit={addOrEdit}
                    recordForEdit={recordForEdit}
                   id={restaurant.id}
                   token={token}
                />
            </div>
            <div className="col-md-8">
                <table>
                    <tbody>
                        {
                            menuList ?
                            [...Array(Math.ceil(menuList.length / 3))].map((e, i) =>
                                <tr key={i}>
                                    <td>{imageCard(menuList[3 * i])}</td>
                                    <td>{menuList[3 * i + 1] ? imageCard(menuList[3 * i + 1]) : null}</td>
                                    <td>{menuList[3 * i + 2] ? imageCard(menuList[3  * i + 2]) : null}</td> 
                                   
                                </tr>
                            )
                            : <div></div>
                        }
                    </tbody>
                </table>
            </div>
        </div>
        
        :
        <div>Not found  
        </div>
    )
}
export default MenuList;
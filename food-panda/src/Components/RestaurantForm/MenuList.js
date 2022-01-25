
import { useEffect, useState } from 'react';
import Item from "./Item";
import './style.css';


        
export const MenuList = (props) =>{
    
    const {restaurant, token} = props;

    const [menuList, setMenuList] = useState([])
    const [recordForEdit, setRecordForEdit] = useState(null)


   
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
       // console.log(menuList);
    },[])

    const addOrEdit = async (formData, onSuccess) => {
        // if (formData.get('employeeID') == "0")
        //     employeeAPI().create(formData)
        //         .then(res => {
        //             onSuccess();
        //           //  refreshEmployeeList();
        //         })
        //         .catch(err => console.log(err))
        // else
            // employeeAPI().update(formData.get('Name'), formData)
            //     .then(res => {
            //         onSuccess();
            //         refresh();
            //     })
            //     .catch(err => console.log(err))
            await Refresh();
    
    }
    
    const showRecordDetails = data => {
        setRecordForEdit(data)
    }
    
    const onDelete = (e, id) => {
        e.stopPropagation();
        if (window.confirm('Are you sure to delete this record?'))
        {
            // employeeAPI().delete(id)
            //     .then(res => refreshEmployeeList())
            //     .catch(err => console.log(err)) 
        }
    
    }
    const imageCard = data => (
        <div className="card" onClick={() => { showRecordDetails(data) }}>
            <img src={data.imagePath} className="card-img-top rounded-circle" />
            <div className="card-body">
                <h5>{data.item}</h5>
                <span>{data.price}</span> <br />
                <button className="btn btn-light delete-button" onClick={e => onDelete(e, parseInt(data.employeeID))}>
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
                                    <td>{imageCard(menuList[2 * i])}</td>
                                    <td>{menuList[2 * i + 1] ? imageCard(menuList[2 * i + 1]) : null}</td>
                                    <td>{menuList[2 * i + 2] ? imageCard(menuList[2 * i + 2]) : null}</td> 
                                   
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
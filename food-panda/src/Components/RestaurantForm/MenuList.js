
import './style.css';
import Item from "./Item";
import AuthContext from '../../Context/auth-context';
import { useContext, useState,useEffect } from 'react';


        
export const MenuList = (props) =>{
    
    const {restaurant, token} = props;

    const [menuList, setMenuList] = useState([])
    const [recordForEdit, setRecordForEdit] = useState(null)



   
    const Refresh = async() =>{
    
        const url = "https://localhost:44321/products/getall";
    
        try {
            await fetch(url, {
              method: "get",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then((response) => response.json())
              .then((jsonResponse) => {
                setMenuList([jsonResponse.data][0]);
              });
            // console.log(response);
           } catch (err) {
             console.log(err);
           }
    }
    useEffect(async()=>{
        await Refresh();
    },[menuList])

    const addOrEdit = (formData, onSuccess) => {
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



    //{...props.restaurant}
    return (
        <div className="row">
            <div className="col-md-12">
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
                            
                            [...Array(Math.ceil(menuList.length / 3))].map((e, i) =>
                                <tr key={i}>
                                    <td>{imageCard(menuList[3 * i])}</td>
                                    <td>{menuList[3 * i + 1] ? imageCard(menuList[3 * i + 1]) : null}</td>
                                    <td>{menuList[3 * i + 2] ? imageCard(menuList[3 * i + 2]) : null}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default MenuList;
import React, { useState, useEffect, useContext } from 'react'
const defaultImageSrc = '/img/image_placeholder.png'

const initialFieldValues = {
    Item: '',
    Price: '',
    Description:'',
    Categories:'',
    imagePath: defaultImageSrc,
    imageFile: null
}

export default function Item(props) {

    const { addOrEdit, recordForEdit,token } = props

    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})


    useEffect(() => {
        if (recordForEdit != null)
            setValues(recordForEdit);
            
    }, [recordForEdit])

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    const showPreview = e => {
        if (e.target.files && e.target.files[0]) {
            let imageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                setValues({
                    ...values,
                    imageFile,
                    imageSrc: x.target.result
                })
            }
            reader.readAsDataURL(imageFile)
        }
        else {
            setValues({
                ...values,
                imageFile: null,
                imageSrc: defaultImageSrc
            })
        }
    }

    const validate = () => {
        let temp = {}
        temp.employeeName = values.employeeName == "" ? false : true;
        temp.imageSrc = values.imageSrc == defaultImageSrc ? false : true;
        setErrors(temp)
        return Object.values(temp).every(x => x == true)
    }

    const resetForm = () => {
        setValues(initialFieldValues)
        document.getElementById('image-uploader').value = null;
        setErrors({})
    }

    const sendRequest = async(formData) =>{
        const url = "https://localhost:44321/products/create";
       
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
              // console.log(jsonResponse);
             });
           // console.log(response);
          } catch (err) {
            console.log(err);
            
          }
      }

    const handleFormSubmit = async e => {
        e.preventDefault()
        if (validate()) {
            const formData = new FormData();
            formData.append('Item',values.Item);
            formData.append('Price',values.Price);
            formData.append('Description',values.Description);
            formData.append('Categories',values.Categories);
            formData.append('imageFile', values.imageFile);
            formData.append('RestaurantId',props.id);

            await sendRequest(formData);
            addOrEdit(formData, resetForm);
        }
    }

    const applyErrorClass = field => ((field in errors && errors[field] == false) ? ' invalid-field' : '')

    return (
        <>
        
            <div className="container text-center">
                {/* <p className="lead">An Employee</p> */}
            </div>
            <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
                <div className="card">
                    <img src={values.imagePath} className="card-img-top" />
                    <div className="card-body">
                        <div className="form-group">
                            <input type="file" accept="image/*" className={"form-control-file" + applyErrorClass('imageSrc')}
                                onChange={showPreview} id="image-uploader"
                                 />
                        </div>
                        <div className="form-group">
                            <input className={"form-control" + applyErrorClass('Name')} placeholder="Name" name="Item"
                                value={values.item}
                                onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <input className="form-control" placeholder="Price" name="Price"
                                value={values.price}
                                onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <input className="form-control" placeholder="Description" name="Description"
                                value={values.description}
                                onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <input className="form-control" placeholder="Categories" name="Categories"
                                value={values.categories}
                                onChange={handleInputChange} />
                        </div>
                        <div className="form-group text-center">
                            <button type="submit" className="btn btn-light">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
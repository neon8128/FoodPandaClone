import React, { useState, useEffect, useContext } from 'react'
const defaultImageSrc = '/img/image_placeholder.png'

const initialFieldValues = {
    item: '', 
    price: '',
    description:'',
    categories:'',
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
                    imagePath: x.target.result
                })
            }
            reader.readAsDataURL(imageFile)
        }
        else {
            setValues({
                ...values,
                imageFile: null,
                imagePath: defaultImageSrc
            })
        }
    }

    const validate = () => {
        let temp = {}
        temp.item = values.Item == "" ? false : true;
        temp.imageSrc = values.imageSrc == defaultImageSrc ? false : true;
        setErrors(temp)
        return Object.values(temp).every(x => x == true)
    }

    const resetForm = () => {
        setValues(initialFieldValues)
        document.getElementById('image-uploader').value = null;
        setErrors({})
    }

    

    const handleFormSubmit = async e => {
        e.preventDefault()
        if (validate()) {
            const formData = new FormData();
            formData.append('Item',values.item);
            formData.append('Price',values.price);
            formData.append('Description',values.description);
            formData.append('Categories',values.categories);
            formData.append('imageFile', values.imageFile);
            formData.append('RestaurantId',props.id);

            if(values.imageFile == null){
                formData.delete('imageFile');
            }
           // await sendRequest(formData);
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
                            <input className={"form-control" + applyErrorClass('Name')} placeholder="Name" name="item"
                                value={values.item}
                                onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <input className="form-control" placeholder="Price" name="price"
                                value={values.price}
                                onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <input className="form-control" placeholder="Description" name="description"
                                value={values.description}
                                onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <input className="form-control" placeholder="Categories" name="categories"
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
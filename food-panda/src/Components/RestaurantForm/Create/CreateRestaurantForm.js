import axios from "axios";
import { useEffect, useState,useContext } from "react";
import "./mine.css";
import AuthContext from "../../../Context/auth-context"
import Swal from 'sweetalert2'
const defaultImageSrc = "/img/image_placeholder.png";

const initialFieldValues = {
  Name: "",
  Address: "",
  imageName: "",
  imageSrc: defaultImageSrc,
  imageFile: null,
};

export const CreateRestaurantForm = (props) => {
  const { addOrEdit, recordForEdit } = props;

  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});

 

  const context = useContext(AuthContext);
  const email = context.user;
  console.log(context);

  useEffect(() => {
    if (recordForEdit != null) setValues(recordForEdit);
  }, [recordForEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };


  const showPreview = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const temp = e.target.files[0];

      try {
        const imageFile = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (x) => {
          setValues({
            ...values,
            imageFile,
            imageSrc: x.target.result,
          });
        };
        reader.readAsDataURL(imageFile);
      } catch (e) {
        console.log(e);
        setValues({
          ...values,
          imageFile: null,
          imageSrc: defaultImageSrc,
        });
      }
    } else {
      setValues({
        ...values,
        imageFile: null,
        imageSrc: defaultImageSrc,
      });
    }
  };

  const validate = () => {
    let temp = {};
    temp.RestaurantName = values.RestaurantName === "" ? false : true;
    temp.imageSrc = values.imageSrc === defaultImageSrc ? false : true;
    setErrors(temp);
    return Object.values(temp).every((x) => x === true);
  };

  const resetForm = () => {
    setValues(initialFieldValues);
    document.getElementById("image-uploader").value = null;
    setErrors({});
  };
  const sendRequest = async() =>{
    const url = "https://localhost:44321/restaurants/Create";
    const formData = new FormData();
    formData.append('Name',values.Name);
    formData.append('Address',values.Address);
    //formData.append('imageName', values.imageName);
    formData.append('imageFile', values.imageFile);
    formData.append('usermanager',email)
    
    try {
        const response = await axios.post(url,formData,{withCredentials:true}          
        );
        if(response.status == 200){
          Swal.fire("Great Job!","The item was successfully added","success")
        }

      } catch (err) {
        Swal.fire({
          title: 'Error!',
          text: "Something happened",
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      await  sendRequest();
      
    }
    resetForm();    
  };

  const applyErrorClass = (field) =>
    field in errors && errors[field] === false ? " invalid-field" : "";

  return (
    <>
      <div className="row">
        <div className="component-a">
       <div className="col-md-12">
      <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
        <div className="card">
          <img src={values.imageSrc} className="card-img-top" />
          <div className="card-body">
            <div className="form-group">
              <input
                type="file"
                accept="image/*"
                className={"form-control-file" + applyErrorClass("imageSrc")}
                onChange={showPreview}
                id="image-uploader"
              />
            </div>
            <div className="form-group">
              <input
                className={"form-control" + applyErrorClass("Name")}
                placeholder="Restaurant Name"
                name="Name"
                value={values.Name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                className={"form-control" + applyErrorClass("Address")}
                placeholder="Address"
                name="Address"
                value={values.Address}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group text-center">
              <button type="submit" className="btn btn-light">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
      </div>
      </div>
      </div>
    </>
  );
};

export default CreateRestaurantForm;

import axios from "axios";
import { useEffect, useState } from "react";
import Resizer from "react-image-file-resizer";

const defaultImageSrc = "/img/image_placeholder.png";

const initialFieldValues = {
  Name: "",
  Address: "",
  imageName: "",
  imageSrc: defaultImageSrc,
  imageFile: null,
};

const CreateRestaurant = (props) => {
  const { addOrEdit, recordForEdit } = props;

  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});

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

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "JPEG",
        100,
        0,
        (uri) => {
          console.log(uri);
          resolve(uri);
        },
        "blob"
      );
    });

  const showPreview = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const temp = e.target.files[0];

      try {
        const imageFile = /*await resizeFile(temp);*/e.target.files[0];
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
    
    try {
        const response = await axios.post(url,formData,
            
        );
        console.log(response);
      } catch (err) {
        console.log(err);
      }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      await  sendRequest();
      
    }
  };

  const applyErrorClass = (field) =>
    field in errors && errors[field] === false ? " invalid-field" : "";

  return (
    <>
      <div className="container text-center">
        <p className="lead">An Employee</p>
      </div>
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
    </>
  );
};

export default CreateRestaurant;

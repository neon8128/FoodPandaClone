

import { useContext,useState } from 'react';
import { useNavigate } from 'react-router';

import AuthContext from '../../Context/auth-context';



const LoginForm = () =>{

  const authContext=useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console

    const url = "https://localhost:5001/auth/login";

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        username: data.get('username'),
        password: data.get('password'),
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication failed!';
            // if (data && data.error && data.error.message) {
            //   errorMessage = data.error.message;
            // }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authContext.login(data.idToken);
        console.log(data);
        navigate('/')
      })
      .catch((err) => {
        alert(err.message);
      });
  };


}

export default LoginForm;
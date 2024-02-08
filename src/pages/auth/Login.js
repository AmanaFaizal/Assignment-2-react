 import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }
 
    const handleLogin = async (event) => {
        event.preventDefault();

        const data = {
            "username": username,
            "password": password,
        }

        const response = await axios.post("http://localhost:8081/auth/login",data);

        if(response.status === 200) {
            
            localStorage.setItem("token",response.data);

            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;

            navigate("/");

        } else {
            console.log("Login error");
        }
    } 

    return (
        <div className="wrapper">
            <div className="container">
            <div class="mx-auto p-2">
            <div className="login-box">
                <h1>User Login</h1>
            <form onSubmit={handleLogin}>
            <div className="form-group ">
                    <input type="text" className="form-control" onChange={handleUsername} placeholder="Username" required />
                    </div>

                <div className="form-group ">
                    <input type="password" className="form-control" onChange={handlePassword} placeholder="Password" required />
                    </div>

                <button type="submit" className="btn-primary">Login</button>
            </form>
            <div className="register-link">
                <p>Don't have an Accont?
                <Link to={`/register`} className="register-link" >  Register</Link>
                </p>
            </div>
            </div>
            </div>
            </div>
            </div>
    )
}

export default Login; 
import axios from "axios";
import { useState } from "react"; 
import { useNavigate } from "react-router-dom";


const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleRegister = async (event) => {

        event.preventDefault();

        const data = {
            "username": username,
            "password": password,
            "email": email,
        }

        const response = await axios.post("http://localhost:8081/auth/register",data);

        if(response.status === 200) {
            navigate("/login");
        } else {
            console.log("error");
        }

    }

    return (
        <div className="wrapper">
            <div className="container">  
            <div class="mx-auto p-2">        
            <div className="login-box">
                <h1>User Register</h1>
            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <input type="text" className="form-control" onChange={handleUsername} placeholder="Username" required />
                </div>

                <div className="form-group">
                    <input type="password" className="form-control" onChange={handlePassword} placeholder="Password" required />
                </div>

                <div className="form-group">
                    <input type="email" className="form-control" onChange={handleEmail} placeholder="Email Address" required />
                </div>

                <button type="submit" className="btn-primary">Register</button>
            </form>
        </div>
        </div>
        </div>
        </div>  
    )

}

export default Register; 
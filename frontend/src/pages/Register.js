import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const api_url = "http://localhost:5000/api/auth";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async(e) => {
        e.preventDefault();

        const response = await axios.post(`${api_url}/register`, {
            username, email, password    
        });

        const data = response.data;
        if(data.success){
            alert("Registration Successful! Please login.");
            navigate("/");
        }
        else{
            alert(data.error);
        }
    };

    return (
        <div className="register-container">
        <div className="container  rounded register d-flex flex-column justify-content-center align-items-center">
            <div className="container register-header p-2 d-flex flex-column justify-content-center align-items-center">
            <h2>Register</h2>
            </div>
            <div className="register-form-container rounded container p-3">
            <form onSubmit={handleRegister}>
                <div className="mb-3">
                    <label>Username:</label>
                    <input type="text" className="form-control"
                    value={username} onChange={(e) => setUsername(e.target.value.trim())}
                    required />
                </div>
                <div className="mb-3">
                    <label>Email:</label>
                    <input type="email" className="form-control"
                    value={email} onChange={(e) => setEmail(e.target.value.trim())}
                    required />
                </div>
                <div className="mb-3">
                    <label>Password:</label>
                    <input type="password" className="form-control"
                    value={password} onChange={(e) => setPassword(e.target.value.trim())}
                    required />
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center">
                <button type="submit" className="btn btn-primary">Register</button>
                
                </div>
                
                 </form>
            </div>
            </div>
            
            
        </div>
    );
};

export default Register;
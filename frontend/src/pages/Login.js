import React, {useState} from "react";
import { Await, useNavigate} from "react-router-dom";
import axios from "axios";
const api_url = "http://localhost:5000/api/auth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${api_url}/login`, {
                email, password
            });

            const data = response.data; // ✅ No need for .json()
            
            if (data.auth) {
                localStorage.setItem("token", data.token);
                //console.log(localStorage.getItem("token"));
                navigate("/dashboard");
            } else {
                alert("Invalid Credentials");
            }
        } catch (error) {
            console.error("Login Error:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="login-container">
        <div className="container  rounded login d-flex flex-column justify-content-center align-items-center">
            <div className="container login-header p-2 d-flex flex-column justify-content-center align-items-center">
            <h2>Login</h2>
            </div>
            <div className="login-form-container rounded container p-3">
            <form className="login-form" onSubmit={handleLogin} >
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
                <button type="submit" className="btn btn-primary mb-1">Login</button>
                <p>Don't have an account? <span onClick={(e) => {navigate("/register")}}>Register here</span></p>
            
                </div>
                </form>
            </div>
        </div></div>
    );
};

export default Login;
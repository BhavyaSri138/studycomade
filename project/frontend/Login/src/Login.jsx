import { useState } from "react";
import './Login.css';
import { useNavigate } from "react-router-dom";  // Correct import of useNavigate

function Login() {
    const [username, SetUsername] = useState('');
    const [password, SetPassword] = useState('');
    const navigate = useNavigate();  // Correct use of useNavigate here

    console.log(username, 'username');
    console.log(password, 'password');

    const handleSubmit = async (event) => {
        event.preventDefault();  // Prevent form submission default behavior

        if (username === '' || password === '') {
            alert('Please fill in both fields');
            return;
        }

        // Perform login action (send data to server)
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            console.error("Failed to login", response.statusText);
            return;
        }

        const data = await response.json();

        if (data.token) {
            navigate('/products');  // Navigate to '/products' after successful login
        } else {
            navigate('/register');  // Navigate to '/register' if login fails
        }

        console.log("login successfully", data);
    };

    const handleUserName = (e) => {
        SetUsername(e.target.value);  // Update username state on input change
    };

    return (
        <div className="d-flex flex-row align-items-center">
            <div>
                <img src="4957136.jpg" alt="" className="image" />
            </div>
            <div className="div">
                <h1>LOGIN</h1>
                <br /><br />
                <form onSubmit={handleSubmit}>  {/* Use onSubmit here to trigger handleSubmit */}
                    <div>
                        <label id="img">
                            <img src="logo.jpg" className="img" alt="logo" />
                        </label>
                        <input 
                            type="text" 
                            name="img" 
                            id="user"  
                            placeholder="enter the username"
                            onChange={handleUserName}  // Correct event handler for username
                        />
                        <br /><br />
                        <label id="password">
                            <img src="password.png" alt="password" className="img" />
                        </label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="enter password"
                            onChange={(e) => SetPassword(e.target.value)}  // Password field handler
                        />
                        <br /><br />
                        <button type="submit" className="btn border">Submit</button>  {/* Changed from <a> to <button> */}
                        <br /><br />
                        <p>Don't have an account? <a href="http://localhost:5173/register">Signup</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;

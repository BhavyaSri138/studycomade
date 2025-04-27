import './Register.css';
import { useState } from "react";

function Register() {

    const [username, SetUsername] = useState('');
    const [password, SetPassword] = useState('');
    
    console.log(password, 'password');
    
    function HandleEmail(e) {
        SetUsername(e.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
    
        // Perform validation
        if (username === '' || password === '') {
            alert('Please fill in both fields');
            return;
        }
    
        console.log("Submitting:", { username, password });
    
        try {
            // Perform registration action (e.g., send data to server)
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });
    
            if (!response.ok) {
                console.error("Failed to register", response.statusText);
                alert("Registration failed. Please try again.");
                return;
            }
    
            const data = await response.json();
            console.log("Registered successfully", data);
            alert("Registration successful!");
    
        } catch (error) {
            console.error("Error connecting to the server:", error);
            alert("Error connecting to the server. Please try again later.");
        }
    };
    return (
        <div className="d-flex flex-row align-items-center">
            <div>
                <img src="730_generated.jpg" className="image" />
            </div>
            <div className="div">
                <h1>SIGNUP</h1>
                <br /><br />
                <form onSubmit={handleSubmit}>
                    <div>
                        <label id="img">
                            <big className='p-2'>@</big>
                        </label>
                        <input type="text" name="img" id="user" placeholder="Enter your email"
                            onChange={HandleEmail} />
                        <br /><br />
                        <label id="password">
                            <img src="password.png" className="img" />
                        </label>
                        <input type="password" name="password" id="password" placeholder="Create password"
                            onChange={(e) => SetPassword(e.target.value)} />
                        <br /><br />
                        <button type="submit" className="btn border">Sign Up</button>
                        <br /><br />
                        <p>Already have an account? <a href="http://localhost:5173/">Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
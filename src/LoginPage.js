import React, { useState } from 'react';
// import axios from 'axios';
import homeIcon from './homeicon.png';
function LoginPage({ setIsAuthenticated }) {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send a POST request to the authentication endpoint
            // const response = await axios.post(
            //     'http://192.168.1.196:8000/api-token-auth/',
            //     {
            //         username: formData.username,
            //         password: formData.password,
            //     }
            // );

            // Extract the token from the response data
            // const { token } = response.data;
            //
            // // Store the token in local storage
            // localStorage.setItem('token', token);
            //
            // console.log('Token stored in local storage:', token);

            // Update the authentication status
            setIsAuthenticated(true);

            // Clear error message
            setError('');
        } catch (error) {
            if (error.response) {
                // The request was made, but the server responded with an error
                console.error('Server Error:', error.response.data);
                setError('Wrong username or password. Please try again.'); // Set error message
            } else if (error.request) {
                // The request was made, but no response was received
                console.error('No Response:', error.request);
                setError('No response from the server. Please try again later.'); // Set error message
            } else {
                // Something else went wrong
                console.error('Error:', error.message);
                setError('An error occurred. Please try again.'); // Set error message
            }
        }
    };

    return (

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center', height: '70vh' }}>
            <img src={homeIcon} alt=",.Your Image" style={{ width: '100px', marginBottom: '200px',marginTop: '200px' }} />
            <form  onSubmit={handleSubmit} style={{width:'calc(100% - 25px)', textAlign: 'center'}}>
                <div>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        style={{ marginBottom:'15px', paddingLeft:'18px', fontFamily: 'Helvetica', width:'calc(100% - 25px)', height: '40px',background:'#efefef',border:'1px solid #ccc',fontSize:'18px',borderRadius: '11px',}}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        style={{ marginBottom:'15px', paddingLeft:'18px', fontFamily: 'Helvetica', width:'calc(100% - 25px)', height: '40px',background:'#efefef',border:'1px solid #ccc',fontSize:'18px',borderRadius: '11px',}}
                    />
                </div>
                <button type="submit"
                        style={{ color:'#fff', fontFamily: 'Helvetica', width: '100%', height: '40px',background:'#000',border:'1px solid #ccc',fontSize:'18px',borderRadius: '50px',}}
                >Log In</button>
            </form>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
}

export default LoginPage;
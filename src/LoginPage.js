import React, { useState } from 'react';
// import axios from 'axios';
import homeIcon from './homeicon.png';
function LoginPage({ setIsAuthenticated }) {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [signupData, setSignupData] = useState({
        email: '',
        firstname: '',
        lastname: '',
        password: '',
        confirmpassword: '',
    });

    const [error, setError] = useState('');
    const [isSignup, setIsSignup] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSignupChange = (e) => {
        const { name, value } = e.target;
        setSignupData({
            ...signupData,
            [name]: value,
        });
    };

    const handleTabChange = (isSignup) => {
        setIsSignup(isSignup);
    };



    const handleLoginSubmit = async (e) => {
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

    const handleSignupSubmit = async (e) => {
        e.preventDefault();

        try {
            // Check if password and confirm password match
            if (signupData.password !== signupData.confirmpassword) {
                setError('Passwords do not match. Please try again.');
                return;
            }

            // Send a POST request to the authentication endpoint for signup...
            // Update the authentication status
            setIsAuthenticated(true);
            // Clear error message
            setError('');
        } catch (error) {
            // Handle errors here...
        }
    };


    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center',  }} >
            <img src={homeIcon} style={{ width: '100px', marginBottom: '110px',marginTop: '90px' }} />
            <div style={{position:'relative', top:'-20px',  }}>
                <button style={{marginRight: '20px', fontSize: '15px', borderRadius: '8px',fontFamily: 'Helvetica' , border:'0px', height: '35px', width:'100px',backgroundColor: isSignup ? '' : '#000', color: isSignup ? '' : 'white', }} onClick={() => handleTabChange(false)}><b>Log In</b></button>
                <button style={{ fontSize: '15px', borderRadius: '8px', fontFamily: 'Helvetica' , border:'0px', height: '35px', width:'100px',backgroundColor: isSignup ? '#000' : '', color: isSignup ? 'white' : '', }} onClick={() => handleTabChange(true)}><b>Sign Up</b></button>
            </div>

            {isSignup ? (
                <form onSubmit={handleSignupSubmit} style={{ width: 'calc(100% - 25px)', textAlign: 'center',}}>
                    <div>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={signupData.email}
                            onChange={handleSignupChange}
                            style={{
                                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.9)',
                                marginBottom: '15px',
                                paddingLeft: '18px',
                                fontFamily: 'Helvetica',
                                width: 'calc(100% - 25px)',
                                height: '40px',
                                background: '#efefef', // Transparent background
                                border: '1px solid #ccc',
                                fontSize: '18px',
                                borderRadius: '11px',
                            }}
                            pattern="^[a-zA-Z0-9._%+-]+@(rvce.edu.in|rvu.edu.in)$"
                            title="Please enter a valid email address ending with @rvce.edu.in or @rvu.edu.in"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="firstname"
                            placeholder="First name"
                            value={signupData.firstname}
                            onChange={handleSignupChange}
                            style={{
                                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.9)',
                                marginBottom: '15px',
                                paddingLeft: '18px',
                                fontFamily: 'Helvetica',
                                width: 'calc(100% - 25px)',
                                height: '40px',
                                background: '#efefef', // Transparent background
                                border: '1px solid #ccc',
                                fontSize: '18px',
                                borderRadius: '11px',

                            }}
                        />

                    </div>
                    <div>
                        <input
                            type="text"
                            name="lastname"
                            placeholder="Last name"
                            value={signupData.lastname}
                            onChange={handleSignupChange}
                            style={{
                                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.9)',
                                marginBottom: '15px',
                                paddingLeft: '18px',
                                fontFamily: 'Helvetica',
                                width: 'calc(100% - 25px)',
                                height: '40px',
                                background: '#efefef', // Transparent background
                                border: '1px solid #ccc',
                                fontSize: '18px',
                                borderRadius: '11px',

                            }}
                        />

                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={signupData.password}
                            onChange={handleSignupChange}
                            style={{
                                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.9)',
                                marginBottom: '15px',
                                paddingLeft: '18px',
                                fontFamily: 'Helvetica',
                                width: 'calc(100% - 25px)',
                                height: '40px',
                                background: '#efefef', // Transparent background
                                border: '1px solid #ccc',
                                fontSize: '18px',
                                borderRadius: '11px',

                            }}
                        />

                    </div>
                    <div>
                        <input
                            type="text"
                            name="confirmpassword"
                            placeholder="Confirm password"
                            value={signupData.confirmpassword}
                            onChange={handleSignupChange}
                            style={{
                                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.9)',
                                marginBottom: '15px',
                                paddingLeft: '18px',
                                fontFamily: 'Helvetica',
                                width: 'calc(100% - 25px)',
                                height: '40px',
                                background: '#efefef', // Transparent background
                                border: '1px solid #ccc',
                                fontSize: '18px',
                                borderRadius: '11px',

                            }}
                        />

                    </div>


                    <button type="submit" style={{
                        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.9)',
                        color: '#fff',
                        fontFamily: 'Helvetica',
                        width: '100%',
                        height: '40px',
                        background: '#000',
                        border: '1px solid #ccc',
                        fontSize: '18px',
                        borderRadius: '50px',
                    }}>
                        Sign Up
                    </button>
                </form>
            ) : (

            <form  onSubmit={handleLoginSubmit} style={{width:'calc(100% - 25px)', textAlign: 'center'}}>
                <div>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        style={{  boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.9)',marginBottom:'15px', paddingLeft:'18px', fontFamily: 'Helvetica', width:'calc(100% - 25px)', height: '40px',background: '#efefef',border:'1px solid #ccc',fontSize:'18px',borderRadius: '11px',}}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        style={{  boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.9)',marginBottom:'15px', paddingLeft:'18px', fontFamily: 'Helvetica', width:'calc(100% - 25px)', height: '40px',background:'#efefef',border:'1px solid #ccc',fontSize:'18px',borderRadius: '11px',}}
                    />
                </div>
                <button type="submit"
                        style={{  boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.9)',color:'#fff', fontFamily: 'Helvetica', width: '100%', height: '40px',background:'#000',border:'1px solid #ccc',fontSize:'18px',borderRadius: '50px',}}
                >Log In</button>
            </form>
            )}

            {error && <div style={{ color: 'red' }}>{error}</div>}

        </div>

    );
}


export default LoginPage;
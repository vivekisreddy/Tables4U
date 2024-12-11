'use client'; 
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; 

export default function ManagerLogin() {
    const [name, setName] = React.useState('');
    const [ID, setID] = React.useState('');
    const [message, setMessage] = React.useState('');
    const router = useRouter(); 

    const instance = axios.create({
        baseURL: 'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial',
    });


    function managerLogIn() {
        if (name && ID) {
            instance
                .post('/managerLogIn', { "resName": name, "resID": ID }) ////hgy
                .then(function (response) {
                    console.log('raw response:', response);
                    let status = response.data.statusCode;
                    let result = response.data.body;

                    console.log('response status:', status);

                    if (status == 200) {
                        console.log('Manager successfully logged in');
                        setMessage('Successfully logging in');
                        router.push('/managerHomePage');
                    } else {
                        //setMessage('Incorrect Log In Information');
                        alert('Error logging in:' + result);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        // } else {
        //     setMessage('Please complete all fields');
        // }
    }

    const handleLogIn = (and: any) => {
        and.preventDefault();
        managerLogIn();
    };

    function createAccount() {
        router.push('/createRes')
    }

    return (
        <div className="manager-login-container">
            <h1 className="page-title">Manager Log In</h1>
            <div className="input-container">
                <label className="label">
                    Restaurant Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input"
                    />
                </label>
                <label className="label">
                    Restaurant ID:
                    
                    <input
                        type="text"
                        value={ID}
                        onChange={(e) => setID(e.target.value)}
                        className="input"
                    />
                </label>

                <div className="input-container">
                <button onClick={handleLogIn} className="button-info">
                    Log In
                </button>
            </div>
                
            </div>
            
            <h3>Don't Have An Account? Create a Restaurant Now!</h3>
            <div className="input-container">
                <button className="button-info" onClick={() => createAccount()}>
                    Create Restaurant
                </button>
            </div>
            {message && <p className="message">{message}</p>}

        </div>
    );
}
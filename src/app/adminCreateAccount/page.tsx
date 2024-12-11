'use client'  // directive to clarify client-side. Place at top of ALL .tsx files
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Import useRouter from next/router

export default function Home() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const instance = axios.create({
      baseURL: 'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial'
    });

    function adminCreateAccount() {
        if (email && password) {
            // Access the REST-based API and in response (on a 200 or 400) process.
            instance.post('/adminCreateAccount', { "adminID": email, "password": password })
                .then(function (response) {
                    console.log("raw response:", response);
                    let status = response.data.statusCode;
                    let result = response.data.body;

                    if (status === 200) {
                        console.log("Admin account successfully created");
                        router.push('/adminLogIn');
                    } else {
                        console.log("Error creating admin account:", result);
                        alert("Error creating admin account: " + result);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    alert("An unexpected error occurred.");
                });
        }
    }

    const handleCreate = (and: any) => {
        and.preventDefault();
        adminCreateAccount();
    }

    // below is where the GUI for the admin create account page is drawn
    return (
        <div className="admin-container">
            <label className="adminCreateAccountMessage">{"Create an Admin Account:"}</label>
                <form className="handleCreate" onSubmit={handleCreate}>
                    <label className="label" htmlFor="email">Email:</label>
                    <input type="text" style={{ color: 'black' }} id="email" name="email" value={email} placeholder="Enter an email address" required onChange={(and) => setEmail(and.target.value)} className="input" />
                    <br />
                    <br />
                    <label className="label" htmlFor="password">Password:</label>
                    <input type="password" style={{ color: 'black' }} id="password" name="password" value={password} placeholder="Create a password" required onChange={(and) => setPassword(and.target.value)} className="input" />
                    <br />
                    <button type="submit" className="createAdminAccount">Create</button>
                </form>
        </div>
    )
}
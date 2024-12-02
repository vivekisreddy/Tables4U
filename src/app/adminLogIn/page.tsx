'use client'; // directive to clarify client-side. Place at top of ALL .tsx files

import React from 'react';
import axios from 'axios';

export default function Home() {
    // initial instantiation for admin log in page
    const [redraw, forceRedraw] = React.useState(0)

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [message, setMessage] = React.useState('')

    const instance = axios.create({
      baseURL: 'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial'
    });

    // helper function that forces React app to redraw whenever this is called.
    function andRefreshDisplay() {
        forceRedraw(redraw + 1)
    }

    function adminLogIn() {
        if (email && password) {
            instance.post('/jessAdminLog', {"adminID":email, "password":password})
            .then(function (response) {
                console.log("raw response:", response)
                let status = response.data.statusCode
                let result = response.data.body

                console.log("response status:", status)

                if (status == 200) {
                    console.log("response status:", status)
                    console.log("Admin successfully logged in")
                    window.location.replace('/adminHomePage')
                    andRefreshDisplay()
                } else {
                    console.log("Error logging in:", result);
                    alert("Error logging in: " + result);
                }
            })
            .catch(function (error) {
                console.log(error);
                alert("An unexpected error occurred.");
            })
        }
    }

    const handleLogIn = (and:any) => {
        and.preventDefault()
        adminLogIn()
    }

    function createAccount() {
        window.location.replace("/adminCreateAccount")
        andRefreshDisplay()
    }

    // below is where the GUI for the admin log in page is drawn
    return (
        <div className="admin-logIn-container">
            <h1 className="title">Admin Log In</h1>
            <div className="login-form-box">
                <form className="handleLogIn" onSubmit={handleLogIn}>
                    <label className="label" htmlFor="email">Email:</label>
                    <input
                        type="text"
                        style={{ color: 'black' }}
                        id="email"
                        name="email"
                        value={email}
                        onChange={(and) => setEmail(and.target.value)}
                        className="input"
                    />
                    <br /><br />
                    <label className="label" htmlFor="password">Password:</label>
                    <input
                        type="password"
                        style={{ color: 'black' }}
                        id="password"
                        name="password"
                        value={password}
                        onChange={(and) => setPassword(and.target.value)}
                        className="input"
                    />
                    <br /><br />
                    <button type="submit" className="adminLogInButton">Log In</button>
                </form>

                <div className="create-account-container">
                    <label className="account">{"Don't have an account? Create one now!"}</label>
                    <button className="createAdminLogIn" onClick={(e) => createAccount()}>Create Account</button>
                </div>
            </div>
        </div>
    )
}

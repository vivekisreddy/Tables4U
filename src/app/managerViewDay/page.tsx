'use client'                                              // directive to clarify client-side. Place at top of ALL .tsx files
import React from 'react';
import axios from 'axios';

export default function Home() {
    // initial instantiation for admin log in page
    const [redraw, forceRedraw] = React.useState(0)

    const [availability, setAvailability] = React.useState('')
    const [date, setDate] = React.useState('')
    const [ID, setID] = React.useState('')
    const [message, setMessage] = React.useState('');

    const instance = axios.create({
      baseURL: 'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial'
    });

    function andRefreshDisplay() {
      forceRedraw(redraw + 1)
    }

    function closeDate() {
        if (date && ID) {
            instance.post('/managerCloseDate', {"restaurantID":ID, "closedDate":date})
            .then(function (response) {
                console.log("raw response:", response)
                let status = response.data.statusCode
                let result = response.data.body

                console.log("response status:", status)

                if (status == 200) {
                console.log("response status:", status)
                console.log("Successfully closed Date")
                setMessage("Successfully closed Date")
                window.location.replace('/managerHomePage')
                andRefreshDisplay()
                } else {
                setMessage("Invalid Information")
                console.log("Error closing date:", result)
                }
            })
            .catch(function (error) {
                console.log(error)
            })
        } else {
        setMessage("Please verify input information")
        }
    }

    function openDate() {
        if (date && ID) {
          instance.post('/managerCloseDate', {"restaurantID":ID, "openDate":date})
          .then(function (response) {
            console.log("raw response:", response)
            let status = response.data.statusCode
            let result = response.data.body
    
            console.log("response status:", status)
    
            if (status == 200) {
              console.log("response status:", status)
              console.log("Successfully opened Date")
              setMessage("Successfully opened Date")
              window.location.replace('/managerHomePage')
              andRefreshDisplay()
            } else {
              setMessage("Invalid Information")
              console.log("Error opening date:", result)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
        } else {
          setMessage("Please verify input information")
        }
    }

    function viewAvailability() {
        if (date) {
          instance.post('/managerCloseDate', {"restaurantID":ID, "openDate":date})
          .then(function (response) {
            console.log("raw response:", response)
            let status = response.data.statusCode
            let result = response.data.body
    
            console.log("response status:", status)
    
            if (status == 200) {
              console.log("response status:", status)
              console.log("Successfully opened Date")
              setMessage("Successfully opened Date")
              window.location.replace('/managerHomePage')
              andRefreshDisplay()
            } else {
              setMessage("Invalid Information")
              console.log("Error opening date:", result)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
        } else {
          setMessage("Please verify input information")
        }
    }

    const handleCloseDate = (and:any) => {
        and.preventDefault()
        closeDate()
    }

    const handleOpenDate = (and:any) => {
        and.preventDefault()
        openDate()
    }

    const handleSetAvailability = (and:any) => {
        and.preventDefault()
        viewAvailability()
    }

  // below is where the GUI for the manager log in page is drawn
  return (
    <div className="container">
      <h1 className="title">Manager Log In</h1>
      <label className="label">
          Day Availability
          <input
              type="string"
              value={availability}
              onChange={(e) => handleSetAvailability(e.target.value)}
              className="input"
          />
      </label>
      <label className="label">
          Restaurant ID:
          <input
              type="string"
              value={ID}
              onChange={(e) => setID(e.target.value)}
              className="input"
          />
      </label>
      <label className="label">
          Enter Date:
          <input
              type="string"
              value={ID}
              onChange={(e) => setDate(e.target.value)}
              className="input"
          />
      </label>
      <div className="button-container">
          <button onClick={handleCloseDate} className="button-logIn">
              Close Date
          </button>
      </div>
      <div className="button-container">
          <button onClick={handleOpenDate} className="button-logIn">
              Open Date
          </button>
      </div>

      {message && <p className="message">{message}</p>}

    </div>
  )
}
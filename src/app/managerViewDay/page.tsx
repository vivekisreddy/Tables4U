'use client'                                              // directive to clarify client-side. Place at top of ALL .tsx files
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Import useRouter from next/router

export default function Home() {

    const [availability, setAvailability] = React.useState('')
    const [date, setDate] = React.useState('')
    const [ID, setID] = React.useState('')
    const [message, setMessage] = React.useState('');

    const router = useRouter(); 


    const instance = axios.create({
      baseURL: 'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial'
    });


    function closeDate() {
        if (date && ID) {
            instance.post('/managerCloseDate', {"resID":ID, "dateToClose":date})
            .then(function (response) {
                console.log("raw response:", response)
                let status = response.data.statusCode
                let result = response.data.body

                console.log("response status:", status)

                if (status == 200) {
                    console.log("response status:", status)
                    console.log("Successfully closed Date")
                    setMessage("Successfully closed Date")
                } else {
                    setMessage("Invalid Information")
                    console.log("Error closing date:", result)
                }
            }) .catch(function (error) {
                console.log(error)
            })
        } else {
            setMessage("Please verify input information")
        }
    }

    function openDate() {
        if (date && ID) {
          instance.post('/managerOpenDate', {"resID":ID, "dateToClose":date})
          .then(function (response) {
            console.log("raw response:", response)
            let status = response.data.statusCode
            let result = response.data.body
    
            console.log("response status:", status)
    
            if (status == 200) {
              console.log("response status:", status)
              console.log("Successfully opened Date")
              setMessage("Successfully opened Date")
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
          instance.post('/managerViewDay', {"resID":ID, "date":date})
          .then(function (response) {
            console.log("raw response:", response)
            let status = response.data.statusCode
            let result = response.data.body
    
            console.log("response status:", status)
            let availabilityInfo = result;
    
            if (status == 200) {
                setAvailability(availabilityInfo)
                console.log("response status:", status)
                console.log("Showing Day Availability")
                setMessage("Showing Day Availability")
            } else {
                setMessage("Invalid Information")
                console.log("Error Showing Availability:", result)
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

    const handleHome = async() => {
        router.push('/managerHomePage')
    }

  // below is where the GUI for the manager log in page is drawn
  return (
    <div className="container">
      <h1 className="title">Manager Log In</h1>
      <label className="label">
          Enter Date (format: YYYY-MM-DD):
          <input
              type="string"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input"
          />
      </label>
      <div className="button-container">
        <button onClick={(e) => handleSetAvailability(e)} className={"button-logIn"}>
            View Availability
            </button>
      </div>
      <label className="label">
          Restaurant ID:
          <input
              type="string"
              value={ID}
              onChange={(e) => setID(e.target.value)}
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
      <div className="button-container">
          <button onClick={handleHome} className="button-logIn">
              Back To Home Page
          </button>
      </div>

      {message && <p className="message">{message}</p>}

    </div>
  )
}
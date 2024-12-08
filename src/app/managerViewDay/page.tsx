'use client'                                              // directive to clarify client-side. Place at top of ALL .tsx files
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Import useRouter from next/router

interface Reservation {
    restaurantID: string;
    tableID: string;
    reservationDate: Date;
    reservationTime: number;
    partySize: number;
    consumerEmail: string;
    confirmationCode:number
}

interface Tables {
    tableID: string;
    seats: number; 
    restaurantID: string;
    tables: number
}

export default function Home() {
    const [date, setDate] = React.useState('')
    const [ID, setID] = React.useState('')
    const [message, setMessage] = React.useState('');
    let tableNames : string[] = [];
    let hourList :number[] = [];
    let hourNames : string[] = [];
    let organizedInformation: string[][] = [[]];
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

    function createTable(hourList:any[], tableInfoList:any[], reservationList:any[]) {
        let finished: Boolean = false;
        let count: number = 1;
        for (let hour = 0; hour < hourList.length; hour ++) {
            let row : string[] = [];
            for (let table = 0; table < tableInfoList.length; table ++) {
                let number: number = 0;
                for (let res = 0; res < reservationList.length; res ++) {
                    if (hourList[hour] == reservationList[res].reservationTime && tableInfoList[table].tableID == reservationList[res].tableID) {
                        finished = true;
                        number = res;
                    }
                    if (finished) {
                        break;
                    }
                }
                if (finished === true) {
                    row.push(reservationList[number].consumerEmail);
                    finished = false;
                }else {
                    row.push(" ")
                }
            }
            organizedInformation.push(row);
            count = count +1;
        }
        console.log("organizedInformation:", organizedInformation)
    }

    function viewAvailability() {
        organizedInformation = [];
        hourNames = [];
        if (date) {
          instance.post('/managerViewDayAvailability', {"resID":ID, "date":date})
          .then(function (response) {
            console.log("raw response:", response)
            let status = response.data.statusCode
            let result = JSON.parse(response.data.body);
            tableNames = result.tables;
            hourList = result.hours;
            console.log("tableNames:", tableNames)
            console.log("hourList:", hourList)


            if (status == 200) {
                for (let i = 0; i < hourList.length; i ++) {
                    let formattedString = `${hourList[i]}:00`;
                    hourNames.push(formattedString)
                }
                console.log("hourNames", hourNames)
                createTable(result.hours, result.tableInformation, result.reservationsSorted)
                setMessage("Showing Day Availability")
            } else {
                setMessage("Invalid Information")
                console.log("Error Showing Availability:", status)
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
      <h1 className="title">View Day Availability</h1>
  
      <label className="label">
          Enter Date (format: YYYY-MM-DD):
          <input
              type="string"
              value={date}
              onChange={(e) => setDate(e.target.value)}
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

      <div className="button-container">
        <button onClick={(e) => handleSetAvailability(e)} className={"button-logIn"}>
            View Availability
            </button>
      </div>
      <div className="button-container">
          <button onClick={handleCloseDate} className="button-logIn">
              Close Date
          </button>
          <button onClick={handleOpenDate} className="button-logIn">
              Open Date
          </button>
      </div>

      {message && <p className="message">{message}</p>}

        {hourList.length > 0 ? (
            <table className="report-table">
                <thead>
                    <tr>
                        <th>Hour</th> {/* First column for row names */}
                        {tableNames.map((tableName, index) => (
                        <th key={index}>{tableName}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {hourNames.map((hour, rowIndex) => (
                        <tr key={rowIndex}>
                            <td>{hour}</td>  {/* Row name from hours */}
                            {organizedInformation[rowIndex].map((cell, cellIndex) => (
                                <td key={cellIndex}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        ):(
            <p>No availability found.</p>
        )}

    </div>
  )
}
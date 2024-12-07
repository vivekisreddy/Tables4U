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

    const [availability, setAvailability] = React.useState<Reservation[]>([]);
    const [tableNames, setTables] = React.useState<string[]>([]);
    const [tableInfo, setInfo] = React.useState<Tables[]>([]);
    const [hours, setHours] = React.useState<number[]>([]);
    const [date, setDate] = React.useState('')
    const [ID, setID] = React.useState('')
    const [message, setMessage] = React.useState('');
    const [loading, setLoading] = React.useState<boolean>(false); // For loading state
    const [organizedInformation, setOrganized] = React.useState<any[]>([]);

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

    function createTable() {
        const tableData: any[][]= [];
        let row : string[] = [];
        for (let hour = 0; hour < hours.length; hour ++) {
            for (let table = 0; table < tableInfo.length; table ++) {
                for (let res = 0; res < availability.length; hour ++) {
                    if (hours[hour] == availability[res].reservationTime && tableInfo[table].tableID == availability[res].tableID) {
                        row.push(availability[res].consumerEmail);
                    }
                    else {
                        row.push("")
                    }
                }
            }
            tableData.push(row);
        }
        setOrganized(tableData);
    }

    function viewAvailability() {
        setLoading(true);
        if (date) {
          instance.post('/managerViewDayAvailability', {"resID":ID, "date":date})
          .then(function (response) {
            console.log("raw response:", response)
            let status = response.data.statusCode

            
            
            if (status == 200) {
                let result = JSON.parse(response.data.body);
                console.log("response status:", result.hours)

                setHours(result.hours)
                setTables(result.tables)
                setInfo(result.tableInformation)
                let reservations = result.reservationsSorted
                setAvailability(reservations)
                createTable()
                console.log("response status:", status)
                console.log("Showing Day Availability")
                setMessage("Showing Day Availability")
            } else {
                setMessage("Invalid Information")
                console.log("Error Showing Availability:", status)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
          .finally(() => {
            setLoading(false); // Set loading to false after the request completes
            });
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

        {!loading && hours.length > 0 && tableNames.length > 0 && availability.length > 0 ? (
        <table className="restaurant-table">
            <thead>
                <tr>
                    <th>Tables</th>
                    {tableNames.map((name, index) => (
                        <th key={index}>{name}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr>
                    {organizedInformation.map((row, index) => (
                        <td>key={row}{index}</td>
                    ))}
                </tr>
            </tbody>
        </table>
    ) : !loading && hours.length === 0 ? (
        <p>No availability found.</p>
    ) : null}
      
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

    </div>
  )
}
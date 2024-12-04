'use client'                                              // directive to clarify client-side. Place at top of ALL .tsx files
import React, {useState} from 'react'
import axios from 'axios'

export default function Home() {
    // initial instantiation for admin log in page
    const [redraw, forceRedraw] = React.useState(0)

    const [restaurant, setRestaurant] = useState('')
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')

    const instance = axios.create({
      baseURL: 'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial'
    });

    // helper function that forces React app to redraw whenever this is called.
    function andRefreshDisplay() {
    forceRedraw(redraw + 1)
  }

  function generateReport() {
    if (restaurant && start && end) {
        // Access the REST-based API and in response (on a 200 or 400) process.
        instance.post('/adminAvailabilityReport', { "resID":restaurant, "startDate":start, "endDate": end })
            .then(function (response) {
                console.log("raw response:", response);
                let status = response.data.statusCode;
                let result = response.data.body;

                if (status === 200) {
                  // TO DO: display report information
                    andRefreshDisplay();
                } else {
                    // console.log("Error generating availability report:", result);
                    alert("Error generating availability report: " + result);
                }
            })
            .catch(function (error) {
                console.log(error);
                alert("An unexpected error occurred.");
            });
    }
}

  const handleGenerate = (and:any) => {
    and.preventDefault();
    if (restaurant == '') {
      alert("Please enter the restaurant ID.")
    }
    // TO DO: make sure start date is not in the future
    if (start == '') {
      alert("Please input a start date for the report.")
    }
    // TO DO: make sure end date is not in the future & not before the start date
    if (end == '') {
      alert("Please input an end date for the report.")
    }
    else {
      generateReport()
    }
    andRefreshDisplay()
  }

  // below is where the GUI for the admin generate availability report is drawn
  return (
    <div>
      <label className="generateReportMessage">{"Generate Availability Report:"}</label>

      <form className="handleGenerate" onSubmit={handleGenerate}>
        <label className="label" htmlFor="restaurant">Restaurant ID:</label>
        <input type="text" style={{ color: 'black' }} id="restaurant" name="restaurant" value={restaurant} onChange={(and) => setRestaurant(and.target.value)}/>
        <br></br>
        <br></br>
        <label className="dateFormat">{"Date Format: YYYY-MM-DD"}</label>
        <br></br>
        <label className="label" htmlFor="start">Start Date:</label>
        <input type="text" style={{ color: 'black' }} id="start" name="start" value={start} onChange={(and) => setStart(and.target.value)}/>
        <br></br>
        <br></br>
        <label className="label" htmlFor="end">End Date:</label>
        <input type="text" style={{ color: 'black' }} id="end" name="end" value={end} onChange={(and) => setEnd(and.target.value)}/>
        <button type="submit" className="generateReportButton">Generate</button>
      </form>
    </div>
  )
}
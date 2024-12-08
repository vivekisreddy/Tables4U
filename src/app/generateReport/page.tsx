'use client'                                              // directive to clarify client-side. Place at top of ALL .tsx files
import React, {useEffect, useState} from 'react'
import axios from 'axios'

interface Report {
  date: string;
  time: number;
  utilization: number;
  availability: number;
}

const GenerateReportPage = () => {
    //const currentDate = new Date();
    //const currentDateString = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`

    const [restaurant, setRestaurant] = useState('');
    const [startString, setStartString] = useState('');
    const [endString, setEndString] = useState('');
    const [reportList, setReportList] = useState<Report[]>([]);

    const instance = axios.create({
      baseURL: 'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial'
    });

  function generateReport() {
    if (restaurant && startString && endString) {
        instance.post('/adminAvailabilityReport', { "resID":restaurant, "startDate":startString, "endDate": endString })
            .then(function (response) {
                console.log("raw response:", response);
                let status = response.data.statusCode;
                let result = response.data.body;

                if (status === 200) {
                  let reportData = JSON.parse(result)
                  console.log("reportData: ", reportData)
                  setReportList(reportData)
                  console.log("reportList: ", reportList)
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

  useEffect(() => {
    generateReport();
  }, []);

  const handleGenerate = (and:any) => {
    and.preventDefault();

    //const today = new Date(currentDateString)
    const startDate = new Date(startString)
    const endDate = new Date(endString)

    if (restaurant == '') {
      alert("Please enter the restaurant ID.")
    }
    if (startString == '') {
      alert("Please input a start date for the report.")
    }
    if (endString == '') {
      alert("Please input an end date for the report.")
    }
    if (endDate < startDate) {
      alert("End date cannot be before the start date.")
    }
    else {
      generateReport()
    }
  }

  return (
    <div>
      <label className="generateReportMessage">{"Generate Availability Report:"}</label>

      <form className="handleGenerate" onSubmit={handleGenerate}>
        <label className="label" htmlFor="restaurant">Restaurant ID:</label>
        <input type="text" style={{ color: 'black' }} id="restaurant" name="restaurant" value={restaurant} onChange={(and) => setRestaurant(and.target.value)}/>
        <br></br>
        <br></br>
        <label className="dateFormat">{"Date Format: YYYY-MM-DD"}</label>
        <label className="dateMessage">{"If the month or day is only one digit, just enter that digit. (i.e., for March 1, 2025 input 2025-3-1 NOT 2025-03-01)"}</label>
        <br></br>
        <label className="label" htmlFor="start">Start Date:</label>
        <input type="text" style={{ color: 'black' }} id="start" name="start" value={startString} onChange={(and) => setStartString(and.target.value)}/>
        <br></br>
        <br></br>
        <label className="label" htmlFor="end">End Date:</label>
        <input type="text" style={{ color: 'black' }} id="end" name="end" value={endString} onChange={(and) => setEndString(and.target.value)}/>
        <button type="submit" className="generateReportButton">Generate</button>
      </form>
      
      {/* Display availability report */}
      {reportList.length > 0 ? (
        <table className='report-table'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Utilization(%)</th>
            <th>Availability(%)</th>
          </tr>
        </thead>
        <tbody>
           {reportList.map((report, index) => (
            <tr key={index}>
              <th>{report.date}</th>
              <th>{report.time}</th>
              <th>{report.utilization}</th>
              <th>{report.availability}</th>
            </tr>
            ))}
        </tbody>
      </table>
      ) : (
        <p>No availability report available.</p>
      )}
      </div>
      );
    };

export default GenerateReportPage;
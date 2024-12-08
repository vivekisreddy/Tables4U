'use client'; // directive to clarify client-side. Place at top of ALL .tsx files
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Report {
  date: string;
  time: number;
  utilization: number;
  availability: number;
}

const GenerateReportPage = () => {
  const [restaurant, setRestaurant] = useState('');
  const [startString, setStartString] = useState('');
  const [endString, setEndString] = useState('');
  const [reportList, setReportList] = useState<Report[]>([]);

  const instance = axios.create({
    baseURL: 'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial',
  });

  function generateReport() {
    if (restaurant && startString && endString) {
      instance
        .post('/adminAvailabilityReport', {
          resID: restaurant,
          startDate: startString,
          endDate: endString,
        })
        .then(function (response) {
          console.log('raw response:', response);
          const status = response.data.statusCode;
          const result = response.data.body;

          if (status === 200) {
            const reportData: [string, number, number, number][] = JSON.parse(result);
            console.log('reportData: ', reportData);
            // Map the raw data into your report structure
            const mappedData = reportData.map(([date, time, utilization, availability]) => ({
              date,
              time,
              utilization,
              availability,
            }));
            setReportList(mappedData);
            console.log('mapped reportList: ', mappedData);
          } else {
            alert('Error generating availability report: ' + result);
          }
        })
        .catch(function (error) {
          console.log(error);
          alert('An unexpected error occurred.');
        });
    }
  }

  useEffect(() => {
    generateReport();
  }, []);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const startDate = new Date(startString);
    const endDate = new Date(endString);

    if (restaurant === '') {
      alert('Please enter the restaurant ID.');
    } else if (startString === '') {
      alert('Please input a start date for the report.');
    } else if (endString === '') {
      alert('Please input an end date for the report.');
    } else if (endDate < startDate) {
      alert('End date cannot be before the start date.');
    } else {
      generateReport();
    }
  };

  return (
    <div>
      <label className="generateReportMessage">Generate Availability Report:</label>
      <form className="handleGenerate" onSubmit={handleGenerate}>
        <label className="label" htmlFor="restaurant">
          Restaurant ID:
        </label>
        <input
          type="text"
          style={{ color: 'black' }}
          id="restaurant"
          name="restaurant"
          value={restaurant}
          onChange={(e) => setRestaurant(e.target.value)}
        />
        <br />
        <br />
        <label className="dateFormat">Date Format: YYYY-MM-DD</label>
        <label className="dateMessage">
          If the month or day is only one digit, just enter that digit. (i.e., for March 1, 2025 input 2025-3-1 NOT 2025-03-01)
        </label>
        <br />
        <label className="label" htmlFor="start">
          Start Date:
        </label>
        <input
          type="text"
          style={{ color: 'black' }}
          id="start"
          name="start"
          value={startString}
          onChange={(e) => setStartString(e.target.value)}
        />
        <br />
        <br />
        <label className="label" htmlFor="end">
          End Date:
        </label>
        <input
          type="text"
          style={{ color: 'black' }}
          id="end"
          name="end"
          value={endString}
          onChange={(e) => setEndString(e.target.value)}
        />
        <button type="submit" className="generateReportButton">
          Generate
        </button>
      </form>

      {/* Display availability report */}
      {reportList.length > 0 ? (
        <table className="report-table">
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
                <td>{report.date}</td>
                <td>{report.time}</td>
                <td>{report.utilization}</td>
                <td>{report.availability}</td>
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
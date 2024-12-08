'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Report {
  date: string;
  time: number;
  utilization: number;
  availability: number;
}

const GenerateReportPage = () => {
  const currentDate = new Date();
  const currentDateString = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;

  const [restaurant, setRestaurant] = useState('');
  const [startString, setStartString] = useState('');
  const [endString, setEndString] = useState('');
  const [reportList, setReportList] = useState<Report[]>([]);

  const instance = axios.create({
    baseURL: 'https://cy11llfdh5.execute-api.us-east-1.amazonaws.com/Initial/adminAvailabilityReport',
  });

  const generateReport = () => {
    if (restaurant && startString && endString) {
      instance
        .post('/adminAvailabilityReport', {
          resID: restaurant,
          startDate: startString,
          endDate: endString,
        })
        .then((response) => {
          console.log('Raw response:', response);
          const { statusCode, body } = response.data.body;

          if (statusCode === 200) {
            const reportData = JSON.parse(body);
            setReportList(reportData);
          } else {
            alert('Error generating availability report: ' + body);
          }
        })
        .catch((error) => {
          console.error(error);
          alert('An unexpected error occurred.');
        });
    }
  };

  const handleGenerate = (event: React.FormEvent) => {
    event.preventDefault();

    const startDate = new Date(startString);
    const endDate = new Date(endString);

    if (!restaurant) {
      return alert('Please enter the restaurant ID.');
    }
    if (!startString) {
      return alert('Please input a start date for the report.');
    }
    if (!endString) {
      return alert('Please input an end date for the report.');
    }
    if (endDate < startDate) {
      return alert('End date cannot be before the start date.');
    }

    generateReport();
  };

  return (
    <div>
      <label className="generateReportMessage">{'Generate Availability Report:'}</label>

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
          onChange={(event) => setRestaurant(event.target.value)}
        />
        <br />
        <br />
        <label className="dateFormat">{'Date Format: YYYY-MM-DD'}</label>
        <label className="dateMessage">
          {
            'If the month or day is only one digit, just enter that digit. (i.e., for March 1, 2025 input 2025-3-1 NOT 2025-03-01)'
          }
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
          onChange={(event) => setStartString(event.target.value)}
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
          onChange={(event) => setEndString(event.target.value)}
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
              <th>Utilization (%)</th>
              <th>Availability (%)</th>
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

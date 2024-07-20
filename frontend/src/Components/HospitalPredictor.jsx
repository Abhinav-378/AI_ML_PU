import React, { useState } from 'react';
import axios from 'axios';

const HospitalPredictor = () => {
  const [symptoms, setSymptoms] = useState('');
  const [hospitalGroups, setHospitalGroups] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchHospitals = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://justdial-jd-unofficial.p.rapidapi.com/search', {
        params: {
          query: 'hospitals',
          city: 'vadodara'
        },
        headers: {
          'X-RapidAPI-Host': 'justdial-jd-unofficial.p.rapidapi.com',
          'X-RapidAPI-Key': 'bf6dc4b8bcmsh8d5aff566cd9472p14231fjsn8f3f7bae8e58'
        }
      });
  
      const hospitals = response.data.results; // Adjust this based on the actual response structure
  
      const groupedHospitals = hospitals.reduce((acc, hospital) => {
        const type = hospital.category; // Adjust based on the actual response structure
        if (!acc[type]) {
          acc[type] = [];
        }
        acc[type].push(hospital);
        return acc;
      }, {});
  
      setHospitalGroups(groupedHospitals);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    }
    setLoading(false);
  };
  

  const handleSearch = async () => {
    await fetchHospitals();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h1 className="text-2xl font-bold mb-4">Find Nearby Hospitals Based on Symptoms</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="symptoms" className="block text-left mb-2">Enter your symptoms:</label>
          <input
            type="text"
            id="symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            required
          />
          <button
            type="button"
            onClick={handleSearch}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full"
          >
            {loading ? 'Loading...' : 'Find Hospitals'}
          </button>
        </form>
        <div id="result" className="mt-6">
          {Object.keys(hospitalGroups).length > 0 && (
            <>
              <h2 className="text-xl font-bold">Hospitals near you:</h2>
              {Object.entries(hospitalGroups).map(([type, hospitals]) => (
                <div key={type}>
                  <h3 className="text-lg font-semibold mt-4">{type} Hospitals:</h3>
                  <ul className="list-disc list-inside">
                    {hospitals.map((hospital, index) => (
                      <li key={index}>
                        {hospital.name} - {hospital.address}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HospitalPredictor;

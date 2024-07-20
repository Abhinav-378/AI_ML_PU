import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function EmergencyList() {
  const [sosRequests, setSOSRequests] = useState([]);

  useEffect(() => {
    const fetchSOSRequests = async () => {
      try {
        const response = await axios.get("http://localhost:3000/emergency");
        setSOSRequests(response.data);
      } catch (error) {
        console.error("Error fetching SOS requests:", error);
      }
    };
    fetchSOSRequests();
  }, []);
  let count = 1;
  const [position, setPosition] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);
  return (
    <div>
        <h1 className="text-4xl text-red-500 text-center mt-24 my-8 font-semibold">Emergency requests</h1>
      <table style={{ width: "100vw" }} className="text-2xl">
        <thead className="text-white">
          <tr>
            <th>S No.</th>
            <th>Name</th>
            <th>Health Issue</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {sosRequests.map((req) => (
            <tr key={req.id} className="text-center">
              <td>{count++}</td>
              <td>{req.name}</td>
              <td>{req.healthIssue}</td>
              <td>{req.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
      {/* <h2>My Current Location</h2>
      {position.latitude && position.longitude ? (
        <p>
          Latitude: {position.latitude}, Longitude: {position.longitude}
        </p>
      ) : (
        <p>Loading...</p>
      )} */}
    </div>
    </div>
  );
}

export default EmergencyList;

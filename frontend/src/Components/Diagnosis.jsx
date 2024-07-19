import React from "react";
import { useState } from 'react'
import axios from 'axios'

function Diagnosis() {
    const [answer, setAnswer] = useState('');
      const generateAnswer = async () => {
        
        try {
          setAnswer('Loading...');
          const response = await axios.post(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCSw0S9Y6tVpAdq0_OxTpwlg_bcD19mRRs',
            {
              contents: [{
                parts: [{
                    // symptomps, medicalHistory, duration,severity
                  text: `I have been experiencing ${formData.symptomps} for the last ${formData.duration}.I have a medical History of ${formData.medicalHistory}. the symptoms are of ${formData.severity}.Based on this information, please provide some suggestions about what potential diseases or conditions I might have and how I can manage or treat them at home. If my condition is serious, please recommend seeking medical attention. The response should be around 150-200 words.`
                }]
              }]
            }
          );
          if (response.data && response.data.candidates && response.data.candidates[0] && response.data.candidates[0].content && response.data.candidates[0].content.parts) {
            setAnswer(response.data.candidates[0].content.parts[0].text);
          } else {
            setAnswer('Error: Unable to generate answer. Please try again.');
          }
        } catch (error) {
          console.error('Error generating answer:', error);
          setAnswer('Error: Unable to generate answer. Please try again.');
        }
      };
    const [formData, setFormData] = useState({
        symptomps: '',
        medicalHistory: '',
        duration: '',
        severity: ''
      });
      const handleChange = (e)=>{
        const {name, value} = e.target
        setFormData({
            ...formData, [name]:value
        })
      }
      const handleSubmit = async ()=>{
        const {symptomps, medicalHistory, duration,severity} = formData;
        
        if(!symptomps || !medicalHistory || !duration || !severity){
            console.log("Fill all details");
            return;
        }
        generateAnswer();
        
        
      }
      const formatAnswer = (text) => {
        const lines = text.split('\n');
        return lines.map((line, index) => {
          if (line.startsWith('**')) {
            return <h3 key={index} className="font-bold text-lg">{line.replace(/\*\*/g, '')}</h3>;
          } else if (line.startsWith('*')) {
            return <li key={index} className="ml-4 list-disc">{line.replace(/\*/g, '')}</li>;
          } else {
            return <p key={index}>{line}</p>;
          }
        });
      };
  return (
    <div>
      <div className="flex justify-center items-center">
        {/* form */}
        <div className="w-[50vw] h-[70vh] flex flex-col justify-center items-center gap-10 p-5">
          <h1 className="text-white text-4xl font-bold ">Symptoms Input Form: </h1>
          {/* <h2>SOS request sent Successfully</h2> */}
          <div>
            <div>
              <label htmlFor="symptomps" className="text-xl text-white">Symptomps: </label>
              <br />
              <input
                type="text"
                name="symptomps"
                id="symptomps"
                value={formData.symptomps}
                onChange={handleChange}
                className="bg-gray-500 text-white rounded-md text-xl py-1 px-2 w-[40vw] mt-3 mb-5 "
              />
            </div>
            <div>
              <label htmlFor="medicalHistory" className="text-xl text-white">Medical History: </label>
              <input
                type="text"
                name="medicalHistory"
                id="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleChange}
                className="bg-gray-500 text-white rounded-md text-xl py-1 px-2 w-[40vw] mt-3 mb-5 "
              />
            </div>
            <div>
              <label htmlFor="duration" className="text-xl text-white">Duration: </label>
              <br />
              <input
                type="text"
                name="duration"
                id="duration"
                value={formData.duration}
                onChange={handleChange}
                className="bg-gray-500 text-white rounded-md text-xl py-1 px-2 w-[40vw] mt-3 mb-5 "
              />
            </div>
            <div>
              <label htmlFor="severity" className="text-xl text-white">Severity: </label>
              <br />
              <input
                type="text"
                name="severity"
                id="severity"
                value={formData.severity}
                onChange={handleChange}
                className="bg-gray-500 text-white rounded-md text-xl py-1 px-2 w-[40vw] mt-3 mb-5 "
              />
            </div>
            <button onClick={handleSubmit} className="font-semibold text-2xl   py-2 px-4 rounded-lg text-white border-red-500 border-2 bg-red-600">Submit</button>
          </div>
        </div>
        <div className="w-[50vw] h-[70vh] bg-slate-800 p-5 border-2 border-slate-600 rounded-md">
          {/* suggestions */}
          <h1 className="text-2xl font-bold text-green-400 mb-3 ">Diagnosis and management advice: </h1>
          <p className="text-white">{answer && formatAnswer(answer)}</p>
        </div>
      </div>
    </div>
  )
}

export default Diagnosis

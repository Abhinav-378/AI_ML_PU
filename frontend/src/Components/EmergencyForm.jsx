import React from "react";
import { useState } from 'react'
import axios from 'axios'

function EmergencyForm() {
  const [answer, setAnswer] = useState('');
      const generateAnswer = async () => {
        
        try {
          setAnswer('Loading...');
          const response = await axios.post(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCSw0S9Y6tVpAdq0_OxTpwlg_bcD19mRRs',
            {
              contents: [{
                parts: [{
                  text: `I have 30 minutes left for the ambulance to come. Could you please guide me in detail on what steps I should follow to reduce pain or get some relief? I have this problem: ${formData.healthIssue}. It's severe, and don't mention calling an ambulance or 911, as we have already done that and it will come after 30 mins.Write in around 150-200 words `
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
        name: '',
        healthIssue: '',
        contact: '',
      });
      const handleChange = (e)=>{
        const {name, value} = e.target
        setFormData({
            ...formData, [name]:value
        })
      }
      const handleSubmit = async ()=>{
        const {name, healthIssue, contact} = formData;
        
        if(!name || !healthIssue || !contact){
            console.log("Fill all details");
            return;
        }
        
        const data = {...formData}
        try {
            await axios.post('http://localhost:3000/emergency', data);
            console.log('SOS request sent successfully!');
            setFormData({
                name: '',
                healthIssue: '',
                contact: '',
            });
            generateAnswer();
          } catch (error) {
            console.error('Error sending SOS request', error);
          }
      }
      const formatAnswer = (text) => {
        const lines = text.split('\n');
        return lines.map((line, index) => {
          if (line.startsWith('**')) {
            // Handle bold headings
            return <h3 key={index} className="font-bold">{line.replace(/\*\*/g, '')}</h3>;
          } else if (line.match(/^\d+\./)) {
            // Handle numbered lists
            return <li key={index} className="ml-4 list-decimal">{line.replace(/^\d+\.\s*/, '')}</li>;
          } else if (line.startsWith('*')) {
            // Handle bullet points
            return <li key={index} className="ml-4 list-disc">{line.replace(/\*/g, '')}</li>;
          } else {
            // Handle regular paragraphs
            return <p key={index}>{line}</p>;
          }
        });
      };
      
      // html code
  return (
    <div>
      <div className="flex justify-center items-center">
        {/* form */}
        <div className="w-[50vw] h-[70vh] flex flex-col justify-center items-center gap-10">
          <h1 className="text-red-600 text-4xl font-bold ">Emergency SOS request</h1>
          {/* <h2>SOS request sent Successfully</h2> */}
          <div>
            <div>
              <label htmlFor="name" className="text-xl text-white">Name of the Patient: </label>
              <br />
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-gray-500 text-white rounded-md text-xl py-1 px-2 w-[40vw] mt-3 mb-5 "
              />
            </div>
            <div>
              <label htmlFor="issue" className="text-xl text-white">Health Issue: </label>
              <br />
              <input
                type="text"
                name="healthIssue"
                id="issue"
                value={formData.healthIssue}
                onChange={handleChange}
                className="bg-gray-500 text-white rounded-md text-xl py-1 px-2 w-[40vw] mt-3 mb-5 "
              />
            </div>
            <div>
              <label htmlFor="contact" className="text-xl text-white">Phone No: </label>
              <br />
              <input
                type="text"
                name="contact"
                id="contact"
                value={formData.contact}
                onChange={handleChange}
                className="bg-gray-500 text-white rounded-md text-xl py-1 px-2 w-[40vw] mt-3 mb-5 "
              />
            </div>
            <button onClick={handleSubmit} className="font-semibold text-2xl   py-2 px-4 rounded-lg text-white border-red-500 border-2 bg-red-600">Send SOS request</button>
          </div>
        </div>
        <div className="w-[50vw] h-[80vh] bg-slate-800 p-5 border-2 border-slate-600 rounded-md">
          {/* suggestions */}
          <h1 className="text-2xl font-bold text-green-400 ">Ambulance is on the way. Please follow these steps: </h1>
          <p className="text-white">{answer &&  formatAnswer(answer)}</p>
        </div>
      </div>
    </div>
  );
}

export default EmergencyForm;

import React, { useState, useEffect } from "react";
import EmployeeForm from "./components/EmployeeForm";

const App = () => {
  const [employments, setEmployments] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    const savedEmployments =
      JSON.parse(localStorage.getItem("employments")) || [];
    setEmployments(savedEmployments);
  }, []);

  useEffect(() => {
    localStorage.setItem("employments", JSON.stringify(employments));
  }, [employments]);

  const addEmployment = (employment) => {
    setEmployments((prevEmployments) => [employment]);
  };

  return (
    <div className="min-h-screen bg-[#ecddd5] p-6">
      <h1 className="text-center text-2xl font-bold mb-6 text-gray-600 font-poppins">
        Employment Tracker
      </h1>
      <EmployeeForm onAddEmployment={addEmployment} setIsSubmit={setIsSubmit} />
      {isSubmit && (
        <div className="mt-8 max-w-md mx-auto bg-[#f8d9c9] text-gray-700 shadow-lg p-6 rounded-[10px]">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Employment History
          </h2>
          <div className="bg-[#f5f6fc] p-[1rem] rounded-[10px]">
            <ul>
              {employments.map((employment, index) => (
                <li key={index} className="mb-2">
                  <strong>{employment.companyName}</strong>{" "}
                  <span className=" text-[0.7rem] text-gray-700">
                    ({employment.startDate} - {employment.endDate})
                  </span>
                  <br />
                  <em className="text-gray-800">
                    {employment.position} - {employment.location}
                  </em>
                  <br />
                  <strong>Total Experience:</strong> {employment.duration}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

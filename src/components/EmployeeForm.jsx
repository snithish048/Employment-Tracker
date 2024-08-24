import React, { useState, useEffect } from "react";
import calculateDuration from "../customHooks/calculateDuration";
import axios from "axios";

const EmployeeForm = ({ onAddEmployment, setIsSubmit }) => {

  const [maxDate, setMaxDate] = useState('');
  const [formValues, setFormValues] = useState({
    companyName: "",
    position: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setMaxDate(today);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const duration = calculateDuration(
      formValues.startDate,
      formValues.endDate
    );
    if (duration === "invalid") {
      alert("Start Date cannot be later than end Date");
    } else {
      const employmentData = {
        ...formValues,
        duration,
      };

      axios
        .post("https://jsonplaceholder.typicode.com/posts", employmentData)
        .then((response) => {
          console.log("Data sent to API:", response.data);
          onAddEmployment(employmentData);
          setFormValues({
            companyName: "",
            position: "",
            location: "",
            startDate: "",
            endDate: "",
            description: "",
          });
        })
        .catch((error) => {
          console.error("Error sending data:", error);
        });
    }
    setIsSubmit(true)
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" max-w-md mx-auto bg-[#f5f6fc] shadow-lg p-6 rounded"
    >
      <div className="mb-4">
        <label className="label">Company Name</label>
        <input
          type="text"
          name="companyName"
          value={formValues.companyName}
          onChange={handleChange}
          className="input"
          required
          placeholder="Name of the company"
        />
      </div>
      <div className="mb-4">
        <label className="label">Position</label>
        <input
          type="text"
          name="position"
          value={formValues.position}
          onChange={handleChange}
          className="input"
          required
          placeholder="Recent position"
        />
      </div>
      <div className="mb-4">
        <label className="label">Location</label>
        <input
          type="text"
          name="location"
          value={formValues.location}
          onChange={handleChange}
          className="input"
          required
          placeholder="City"
        />
      </div>
      <div className="mb-4">
        <label className="label">Start Date</label>
        <input
          type="date"
          name="startDate"
          value={formValues.startDate}
          onChange={handleChange}
          className="input"
          max={maxDate}
          required
        />
      </div>
      <div className="mb-4">
        <label className="label">End Date</label>
        <input
          type="date"
          name="endDate"
          value={formValues.endDate}
          onChange={handleChange}
          className="input"
          required
        />
      </div>
      <div className="mb-4">
        <label className="label">Description</label>
        <textarea
          name="description"
          value={formValues.description}
          onChange={handleChange}
          className="input"
          required
          placeholder="A brief description of the employment"
        />
      </div>
      <div className="mb-4 flex flex-col items-center ">
        <button
          type="submit"
          className="bg-[#f3c2a7] text-gray-700 font-semibold py-2 px-4 rounded align-middle"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;

import { useState } from "react";

export default function EmployeeForm({ onAdd }) {
    const [form, setForm] = useState({
    employee_id: "",
    name: "",
    email: "",
    department: "",
  });
  const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};
const handleSubmit = (e) => {
  e.preventDefault();
  console.log(form);
  onAdd(form);  
};

  return (
  <div>
    <form className="space-y-3" onSubmit={handleSubmit}>
      <input name="employee_id" placeholder="Employee ID" onChange={handleChange} className="border p-2 w-full" />
      <input name="name" placeholder="Full Name" onChange={handleChange} className="border p-2 w-full" />
      <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full" />
      <input name="department" placeholder="Department" onChange={handleChange} className="border p-2 w-full" />

      <button className="bg-blue-500 text-white px-4 py-2">
        Add Employee
      </button>
    </form>

    {/* 👇 DEBUG VIEW */}
    {/* <pre className="bg-gray-100 p-2 mt-4 text-sm">
      {JSON.stringify(form, null, 2)}
    </pre> */}
  </div>
);
}
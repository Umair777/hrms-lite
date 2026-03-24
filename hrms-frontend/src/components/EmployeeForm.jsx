import { useState } from "react";

export default function EmployeeForm({ onAdd }) {
    const [form, setForm] = useState({
    employee_id: "",
    name: "",
    email: "",
    department: "",
  });
  return (
    <form className="space-y-3">
      <input
        placeholder="Employee ID"
        className="border p-2 w-full"
        value={form.employee_id}
        onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
      />
      <input
        placeholder="Full Name"
        className="border p-2 w-full"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        className="border p-2 w-full"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Department"
        className="border p-2 w-full"
        value={form.department}
        onChange={(e) => setForm({ ...form, department: e.target.value })}
      />

      <button className="bg-blue-500 text-white px-4 py-2">
        Add Employee
      </button>
    </form>
    
  );
}
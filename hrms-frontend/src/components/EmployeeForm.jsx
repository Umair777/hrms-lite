import { useState } from "react";

export default function EmployeeForm({ onAdd }) {
  return (
    <form className="space-y-3">
      <input placeholder="Employee ID" className="border p-2 w-full" />
      <input placeholder="Full Name" className="border p-2 w-full" />
      <input placeholder="Emaisl" className="border p-2 w-full" />
      <input placeholder="Department" className="border p-2 w-full" />

      <button className="bg-blue-500 text-white px-4 py-2">
        Add Employee
      </button>
    </form>
    
  );
}
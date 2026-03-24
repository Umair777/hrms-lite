import Navbar from "./components/Navbar";
import { useState } from "react";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
function App() {
  const [employees, setEmployees] = useState([]);
  const [editMode, setEditMode] = useState(false);
  //create a function to add employee to the list
  const addEmployee = async (emp) => {
  //backend call to save employee in database can be made here
   const res = await fetch("http://localhost:8000/employees", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(emp),
  });

  const data = await res.json();

  // update UI with response
    
  setEmployees([...employees, emp]);
  };
  const deleteEmployee = (index) => {
    const updated = employees.filter((_, i) => i !== index);
    setEmployees(updated);
  };
    
  return (
    <div>
    <Navbar />
    <div className="p-10 text-4xl text-center font-bold text-blue-600">
      HRMS Lite Dashboard
    </div>
    <div className="p-6">
        <EmployeeForm onAdd={addEmployee} />
        <EmployeeList  
        employees={employees} onDelete={deleteEmployee} 
        editMode={editMode} setEditMode={setEditMode} />
      </div>
    </div>
  );
}

export default App
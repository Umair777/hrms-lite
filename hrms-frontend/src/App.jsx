import Navbar from "./components/Navbar";

import { useState, useEffect } from "react";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import AttendanceList from "./components/Attendance";
function App() {
  const [view, setView] = useState("employees");
  const [employees, setEmployees] = useState([]);
  const [editMode, setEditMode] = useState(false);

  //fetch employees from backend when component mounts
  const fetchEmployees = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/employees`);
    const data = await res.json();
    console.log("Fetched data:", data); 
    setEmployees(data.data);
  };
  useEffect(() => {
    fetchEmployees();
  }, []);
  //create a function to add employee to the list
  const addEmployee = async (emp) => {
  //backend call to save employee in database
   const res = await fetch(`${import.meta.env.VITE_API_URL}/employees`, 
    {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(emp),
   }
);

  const data = await res.json();

  // update UI with response
  // setEmployees([...employees, emp]);
  };
  const deleteEmployee = async (id) => {
    await fetch(
      `${import.meta.env.VITE_API_URL}/employees`,
      {
        method: "DELETE",
      }
    );
    // refresh from DB
  await fetchEmployees();
  };
    
  return (
    <div>
    <Navbar setView={setView} />
    <div className="p-10 text-4xl text-center font-bold text-blue-600">
      HRMS Lite Dashboard
    </div>
    <div className="p-6">
        {view === "employees" && (
          <>
            <EmployeeForm onAdd={addEmployee} />
            <EmployeeList
              employees={employees}
              onDelete={deleteEmployee}
              editMode={editMode}
              setEditMode={setEditMode}
            />
          </>
        )}

        {view === "attendance" && (
          <>
            <AttendanceList />
            
          </>
        )}
      </div>
    </div>
  );
}

export default App
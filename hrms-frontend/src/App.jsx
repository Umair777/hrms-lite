import Navbar from "./components/Navbar";
import { useState } from "react";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
function App() {
  const [employees, setEmployees] = useState([]);
  //create a function to add employee to the list
  const addEmployee = (emp) => {
  setEmployees([...employees, emp]);
};
  
  return (
    <div>
    <Navbar />
    <div className="p-10 text-4xl text-center font-bold text-blue-600">
      HRMS Lite Dashboard
    </div>
    <div className="p-6">
        <EmployeeForm onAdd={addEmployee} />
        <EmployeeList  employees={employees}/>
      </div>
    </div>
  );
}

export default App
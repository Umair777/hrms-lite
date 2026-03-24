import Navbar from "./components/Navbar";
import { useState } from "react";
function App() {
  const [employees, setEmployees] = useState([]);
  return (
    <div>
    <Navbar />
    <div className="p-10 text-4xl text-center font-bold text-blue-600">
      HRMS Lite Dashboard
    </div>
    </div>
  );
}

export default App
export default function Navbar({ setView }) {
  return (
    <div className="bg-blue-900 text-white p-4 flex justify-between items-center ">
      
      <h1 className="text-5xl font-bold">HRMS Lite</h1>

      <div className="space-x-4">
        <button 
        className="px-4 py-2 bg-blue-700 rounded"
        onClick={() => setView("employees")}
        >
          Employees
        </button>
        <button 
        className="px-4 py-2 bg-blue-700 rounded" 
        onClick={() => setView("attendance")} >
          Attendance
        </button>
      </div>

    </div>
  );
}
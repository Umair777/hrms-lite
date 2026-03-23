export default function Navbar() {
  return (
    <div className="bg-blue-900 text-white p-4 flex justify-between">
      
      <h1 className="text-2xl font-bold">HRMS Lite</h1>

      <div className="space-x-4">
        <button className="px-4 py-2 bg-blue-700 rounded">
          Employees
        </button>
        <button className="px-4 py-2 bg-blue-700 rounded">
          Attendance
        </button>
      </div>

    </div>
  );
}
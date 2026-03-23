export default function Navbar() {
  return (
    <div className="bg-blue-900 text-white p-4 flex justify-between">
      <h1 className=" font-bold ">HRMS Lite</h1>
      <div className="space-x-5">
        <button>Employees</button>
        <button>Attendance</button>
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
export default function Attendance() {
    const [attendance, setAttendance] = useState([]);
    // fetch today's attendance
  const fetchTodayAttendance = async () => {
    const res = await fetch("http://localhost:8000/attendance/today");
    const data = await res.json();
    console.log("attendance:", data);
    setAttendance(data.data || []);
  };
  useEffect(() => {
    fetchTodayAttendance();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-blue-600">
        Attendance List
        </h2>
       <table className="table-auto w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">Employee ID</th>
          <th className="p-2 border">Date</th>
          <th className="p-2 border">Status</th>
        </tr>
      </thead>

      <tbody>
        {attendance?.map((att) => (
          <tr key={att.id} className="text-center border">
            <td className="p-2 border">{att.employee_id}</td>
            <td className="p-2 border">{att.date}</td>
            <td className="p-2 border">{att.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

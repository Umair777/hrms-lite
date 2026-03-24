import { useEffect, useState } from "react";
export default function Attendance() {
    const [attendance, setAttendance] = useState([]);
    // fetch today's attendance
  const fetchTodayAttendance = async () => {
    const res = await fetch("http://localhost:8000/attendance/today");
    const data = await res.json();
    console.log("attendance:", data);
    // setAttendance(data || []);
  };
  useEffect(() => {
    fetchTodayAttendance();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Attendance List</h2>
      <p>Attendance data will be displayed here.</p>
    </div>
  );
}

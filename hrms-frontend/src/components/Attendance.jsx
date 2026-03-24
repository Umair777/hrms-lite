import { useEffect, useState } from "react";
export default function Attendance() {
    const [attendance, setAttendance] = useState([]);
    const [showSelector, setShowSelector] = useState(false);
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
    const markAttendance = async (employee_id, status) => {
    const today = new Date().toISOString().split("T")[0];

    try {
      await fetch("http://localhost:8000/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employee_id,
          date: today,
          status,
        }),
      });

      await fetchTodayAttendance(); // refresh UI
    } catch (err) {
      console.error("Error marking attendance:", err);
    }
  };
  return (
    <div>
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">
        Attendance List
        </h2>
        <button
    className="bg-blue-600 text-white px-4 py-2 rounded"
    onClick={() => setShowSelector(!showSelector)}
  >
    {showSelector ? "Close" : "Get Records"}
  </button>

  </div>
  
       <table className="table-auto w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">Employee ID</th>
          <th className="p-2 border">Date</th>
          <th className="p-2 border">Status</th>
          <th className="p-2 border">Mark</th>
        </tr>
      </thead>

      <tbody>
        {attendance?.map((att) => (
          <tr key={att.id} className="text-center border">
            <td className="p-2 border">{att.employee_id}</td>
            <td className="p-2 border">{att.date}</td>
            
            {/*  Status Display */}
                <td className="p-2 border">
                  {att.status === "Present" && (
                    <span className="text-green-600 font-bold">
                      Present
                    </span>
                  )}
                  {att.status === "Absent" && (
                    <span className="text-red-600 font-bold">
                      Absent
                    </span>
                  )}
                </td>
                 <td className="p-2 border">
                  <select
                    className="border px-2 py-1"
                    value={att.status}
                    onChange={(e) =>
                      markAttendance(att.employee_id, e.target.value)
                    }
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                  </select>
                </td>
          </tr>
        ))}
          
      </tbody>
    </table>
    {/* Empty state */}
        {attendance?.length === 0 && (
          <p className="text-center mt-4 text-gray-500">
            No employees found
          </p>
        )}
    </div>
  );
}

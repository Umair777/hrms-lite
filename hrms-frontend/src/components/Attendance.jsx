import { useEffect, useState } from "react";
export default function Attendance({ employees }) {
  
    const [attendance, setAttendance] = useState([]);
    const [showSelector, setShowSelector] = useState(false);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [records, setRecords] = useState([]);
     //  NEW: map employee_id (FK) → employee object
    const getEmployee = (id) => {
    return employees.find((emp) => emp.id === id);
  };
    //  Fetch all records for history
    const fetchRecords = async () => {
    if (selectedEmployees.length === 0) {
      alert("Select at least one employee");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/attendance`);
      const data = await res.json();

      const filtered = (data.data || []).filter((a) =>
        selectedEmployees.includes(a.employee_id)
      );

      setRecords(filtered);
    } catch (err) {
      console.error("Error fetching records:", err);
    }
  };
    // fetch today's attendance
  const fetchTodayAttendance = async () => {
    
    try{
      const res = await fetch(`${import.meta.env.VITE_API_URL}/attendance/today`);
      const data = await res.json();
      console.log("attendance:", data);
      setAttendance(data.data || []);
    } catch (err) {
      console.error("Error fetching today's attendance:", err);
      setAttendance([]);
    }
  };
  useEffect(() => {
    fetchTodayAttendance();
  }, []);

    //  Mark attendance
    const markAttendance = async (employee_id, status) => {
    const today = new Date().toISOString().split("T")[0];

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/attendance`, {
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
      {/* HEADER */}
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
  {/* MAIN TABLE */}
       <table className="table-auto w-full border">
      <thead>
        
        <tr className="bg-gray-100">
          {showSelector && <th className="p-2 border">Select</th>}
          
          <th className="p-2 border">Employee ID</th>
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Date</th>
          <th className="p-2 border">Status</th>
          <th className="p-2 border">Mark</th>
        </tr>
      </thead>

      <tbody>
          {attendance.map((att) => {
            const emp = getEmployee(att.employee_id);

            return (
              <tr key={att.id} className="text-center border">
                {/* CHECKBOX */}
                {showSelector && (
                  <td className="p-2 border">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedEmployees((prev) =>
                            prev.includes(att.employee_id)
                              ? prev
                              : [...prev, att.employee_id]
                          );
                        } else {
                          setSelectedEmployees((prev) =>
                            prev.filter((id) => id !== att.employee_id)
                          );
                        }
                      }}
                    />
                  </td>
                )}

                {/* ✅ FIXED: show correct employee_id */}
                <td className="p-2 border">
                  {emp?.employee_id || "N/A"}
                </td>

                {/* ✅ NEW: show employee name */}
                <td className="p-2 border">
                  {emp?.name || "N/A"}
                </td>

                <td className="p-2 border">{att.date}</td>

                {/* STATUS */}
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

                {/* MARK */}
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
            );
          })}
        </tbody>
    </table>
    {showSelector && (
      <button
        onClick={fetchRecords}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Fetch Records
      </button>
      
    )}
    <div className="mt-6">
  <h3 className="text-xl font-bold mb-2 text-blue-600">
    Past Records
  </h3>

  {records.length === 0 ? (
    <p className="text-gray-500">No records found</p>
  ) : (
    <table className="table-auto w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">Employee ID</th>
          <th className="p-2 border">Date</th>
          <th className="p-2 border">Status</th>
        </tr>
      </thead>

      <tbody>
        {records.map((r) => (
          <tr key={r.id} className="text-center border">
            <td className="p-2 border">{r.employee_id}</td>
            <td className="p-2 border">{r.date}</td>
            <td className="p-2 border">
              {r.status === "Present" && (
                <span className="text-green-600 font-bold">
                  Present
                </span>
              )}
              {r.status === "Absent" && (
                <span className="text-red-600 font-bold">
                  Absent
                </span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>
    {/* Empty state */}
        {attendance?.length === 0 && (
          <p className="text-center mt-4 text-gray-500">
            No employees found
          </p>
        )}
    </div>
  );
}

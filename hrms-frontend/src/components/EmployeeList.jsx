
export default function EmployeeList({ employees, onDelete, editMode, setEditMode }) {
  if (employees.length === 0) {
    return <p>No employees added yet.</p>;
  }

    return (
        <div className="mt-4">
            <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-bold mb-5 text-blue-600 ">
                Employee List
            </h2>
            <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={() => setEditMode(!editMode)}>
            {editMode ? "Done" : "Edit"} </button>
            </div>
            <table className="w-full border border-gray-300">
                <thead>
                <tr className="w-full border text-white bg-blue-900">
                    <th className="border p-2">S.No</th>
                    <th className="border p-2">ID</th>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Email</th>
                    <th className="border p-2">Department</th>
                    {/* Conditional header */}
                    {editMode && (
                        <th className="border p-2">Actions</th>
                    )}
                </tr>
                </thead>

                <tbody>
                {employees.map((emp, index) => (
                    <tr key={emp.employee_id} className="text-center">
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">{emp.employee_id}</td>
                    <td className="border p-2">{emp.name}</td>
                    <td className="border p-2">{emp.email}</td>
                    <td className="border p-2">{emp.department}</td>
                     {/* Conditional delete button */}
                        {editMode && (
                            <td className="border p-2">
                            <button
                                onClick={() => {
                                if (window.confirm("Are you sure?")) {
                                    onDelete(emp.id);
                                }
                                }}
                                className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                                Delete
                            </button>
                            </td>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    
  );
}
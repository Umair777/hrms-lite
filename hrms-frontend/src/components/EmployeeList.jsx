
export default function EmployeeList({ employees, onDelete }) {
  if (employees.length === 0) {
    return <p>No employees added yet.</p>;
  }

    return (
        <div className="mt-4">
            <h2 className="text-xl font-bold mb-5 justify-content item-center text-blue-600 ">Employee List</h2>
            <table className="w-full border border-gray-300">
                <thead>
                <tr className="w-full border text-white bg-blue-900">
                    <th className="border p-2">S.No</th>
                    <th className="border p-2">ID</th>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Email</th>
                    <th className="border p-2">Department</th>
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
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    
  );
}
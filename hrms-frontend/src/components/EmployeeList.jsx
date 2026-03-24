
export default function EmployeeList({ employees, onDelete }) {
  if (employees.length === 0) {
    return <p>No employees added yet.</p>;
  }

    return (
        <div className="mt-4">
            <h2 className="text-xl font-bold mb-5 justify-content item-center">Employee List</h2>
            <table className="w-full border border-gray-300">
                <thead>
                <tr className="bg-gray-200">
                    <th className="border p-2">S.No</th>
                    <th className="border p-2">ID</th>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Email</th>
                    <th className="border p-2">Department</th>
                </tr>
                </thead>

                <tbody>
                <tr className="text-center">
                    <td className="border p-2">1</td>
                    <td className="border p-2">101</td>
                    <td className="border p-2">Test</td>
                    <td className="border p-2">test@gmail.com</td>
                    <td className="border p-2">IT</td>
                </tr>
                </tbody>
            </table>
        </div>
    
  );
}

export default function EmployeeList({ employees, onDelete }) {
  if (employees.length === 0) {
    return <p>No employees added yet.</p>;
  }

    return (
        <div className="mt-4">
            <h2 className="text-xl font-bold mb-5 justify-content item-center">Employee List</h2>
            <table>
                <thead>
                <tr>
                    <th>S.No</th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td>1</td>
                    <td>101</td>
                    <td>Test</td>
                    <td>test@gmail.com</td>
                    <td>IT</td>
                </tr>
                </tbody>
            </table>
        </div>
    
  );
}
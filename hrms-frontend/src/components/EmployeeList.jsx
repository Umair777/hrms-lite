
export default function EmployeeList({ employees, onDelete }) {
  if (employees.length === 0) {
    return <p>No employees added yet.</p>;
  }

    return (
        <div className="mt-6">
            <h2 className="text-xl font-bold mb-3">Employee List</h2>
        </div>
    
  );
}
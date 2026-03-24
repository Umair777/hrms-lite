from datetime import date
from ..database import supabase


def get_today_attendance_full():
    today = date.today().isoformat()

    # 1. Get all employees
    employees = supabase.table("employees").select("id").execute()

    # 2. Get today's attendance
    attendance = supabase.table("attendance") \
        .select("*") \
        .eq("date", today) \
        .execute()

    attendance_map = {
        a["employee_id"]: a for a in attendance.data
    }

    # 3. Ensure every employee has a record
    result = []

    for emp in employees.data:
        emp_id = emp["id"]

        if emp_id in attendance_map:
            result.append(attendance_map[emp_id])
        else:
            # create default record
            new_record = supabase.table("attendance").insert({
                "employee_id": emp_id,
                "date": today,
                "status": "Absent"
            }).execute()

            result.append(new_record.data[0])

    return result
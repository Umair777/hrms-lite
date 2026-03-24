from fastapi import HTTPException, status
from ..database import supabase


def create_employee(emp):
    # duplicate check
    existing = supabase.table("employees") \
        .select("*") \
        .eq("employee_id", emp.employee_id) \
        .execute()

    if existing.data:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Employee already exists"
        )

    res = supabase.table("employees").insert(emp.model_dump()).execute()

    if not res.data:
        raise HTTPException(
            status_code=500,
            detail="Failed to create employee"
        )

    return res.data[0]


def fetch_employees():
    res = supabase.table("employees").select("*").execute()
    return res.data or []


def remove_employee(emp_id: int):
    res = supabase.table("employees") \
        .delete() \
        .eq("id", emp_id) \
        .execute()

    if not res.data:
        raise HTTPException(status_code=404, detail="Employee not found")

    return True
from fastapi import APIRouter, HTTPException, status
from ..schemas import EmployeeCreate
from ..database import supabase

router = APIRouter()

@router.post("/")
def add_employee(emp: EmployeeCreate):
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

    return {"success": True, "data": res.data[0]}


@router.get("/")
def get_employees():
    res = supabase.table("employees").select("*").execute()
    return {"success": True, "data": res.data or []}


@router.delete("/{id}")
def delete_employee(id: int):
    res = supabase.table("employees").delete().eq("id", id).execute()

    if not res.data:
        raise HTTPException(status_code=404, detail="Not found")

    return {"success": True}
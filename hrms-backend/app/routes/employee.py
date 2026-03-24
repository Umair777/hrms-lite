from fastapi import APIRouter, HTTPException, status
from ..schemas import EmployeeCreate
from ..database import supabase
from ..services import employee_service

router = APIRouter()

@router.post("/")
def add_employee(emp: EmployeeCreate):
    data = employee_service.create_employee(emp)
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
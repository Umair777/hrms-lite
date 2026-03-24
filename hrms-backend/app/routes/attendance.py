from fastapi import APIRouter, HTTPException
from datetime import date
from ..schemas import AttendanceCreate
from ..database import supabase
from ..services import attendance_service

router = APIRouter()


@router.post("/")
def mark_attendance(data: AttendanceCreate):
    today = data.date

    existing = supabase.table("attendance") \
        .select("*") \
        .eq("employee_id", data.employee_id) \
        .eq("date", today) \
        .execute()

    if existing.data:
        res = supabase.table("attendance") \
            .update({"status": data.status}) \
            .eq("employee_id", data.employee_id) \
            .eq("date", today) \
            .execute()
    else:
        res = supabase.table("attendance") \
            .insert(data.model_dump()) \
            .execute()

    return {"success": True, "data": res.data[0]}


@router.get("/today")
def get_today_attendance():
    data = attendance_service.get_today_attendance_full()
    return {"success": True, "data": data}
from pydantic import BaseModel, EmailStr, Field
from datetime import date
from typing import Literal

class EmployeeCreate(BaseModel):
    employee_id: str = Field(..., min_length=1)
    name: str = Field(..., min_length=1)
    email: EmailStr
    department: str = Field(..., min_length=1)
    
class AttendanceCreate(BaseModel):
    employee_id: int
    date: date
    status: Literal["Present", "Absent"]
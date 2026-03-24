from pydantic import BaseModel, EmailStr, Field

class EmployeeCreate(BaseModel):
    employee_id: str = Field(..., min_length=1)
    name: str = Field(..., min_length=1)
    email: EmailStr
    department: str = Field(..., min_length=1)
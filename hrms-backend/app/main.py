from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from .schemas import EmployeeCreate
from .database import supabase
from datetime import date 

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    # Allow requests from these specific origins
    allow_origins=["*"], 
    # Allow browser to send cookies/auth headers (must specify origins if True)
    allow_credentials=True,
    # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_methods=["*"],
    # Allow all custom headers (e.g., Content-Type, Authorization)
    allow_headers=["*"],
)

## Basic health check endpoint
@app.get("/")
def root():
    return {"message": "Welcome to the HRMS API"}

####################### Employee endpoints ####################

# Add a new employee
@app.post("/employees")
def add_employee(emp: EmployeeCreate):
    try:
        #  Check duplicate employee_id
        existing = supabase.table("employees") \
            .select("*") \
            .eq("employee_id", emp.employee_id) \
            .execute()

        if existing.data:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Employee with this ID already exists"
            )
        # Insert employee
        res = supabase.table("employees").insert(emp.dict()).execute()
        if not res.data:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Failed to create employee"
                )
        return {
                "success": True,
                "message": "Employee created successfully",
                "data": res.data[0]
            }
    except HTTPException:
        raise

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Internal server error"
        )

# Get all employees
@app.get("/employees")
def get_employees():
    try:
        res = supabase.table("employees").select("*").execute()

        return {
            "success": True,
            "data": res.data or []
        }

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Failed to fetch employees"
        )

# Delete an employee by ID
@app.delete("/employees/{id}")
def delete_employee(id: int):
    try:
        res = supabase.table("employees") \
            .delete() \
            .eq("id", id) \
            .execute()

        if not res.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Employee not found"
            )

        return {
            "success": True,
            "message": "Employee deleted successfully"
        }

    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Error deleting employee"
        )


####################### Attendance endpoints #######################

# Mark attendance
@app.post("/attendance")
def mark_attendance(data: dict):
    res = supabase.table("attendance").insert(data).execute()

    if not res.data:
        raise HTTPException(status_code=500, detail="Failed to mark attendance")

    return res.data[0]

# Get all attendance records
@app.get("/attendance/today")
def get_today_attendance():
    today = date.today().isoformat()
    res = supabase.table("attendance").select("*").eq("date", today).execute()
    return res.data

# ============================
# GLOBAL ERROR HANDLING
# ============================

# Validation errors (Pydantic)
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    return JSONResponse(
        status_code=422,
        content={
            "success": False,
            "error": "Validation Error",
            "details": exc.errors()
        },
    )


# ✅ Generic errors
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "error": "Internal Server Error",
            "message": str(exc)
        },
    )
    
    
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
# from .schemas import EmployeeCreate
from .database import supabase

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
@app.get("/")
def root():
    return {"message": "Welcome to the HRMS API"}

@app.post("/employees")
def add_employee(emp: dict):
    print("Received employee data:", emp)
    res = supabase.table("employees").insert(emp).execute()
    print("Supabase response:", res)
    if res.status_code != 201:
        raise HTTPException(status_code=500, detail="Failed to add employee")
    return res.data

@app.get("/employees")
def get_employees():
    res = supabase.table("employees").select("*").execute()
    return res.data
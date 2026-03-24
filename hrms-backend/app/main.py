from fastapi import FastAPI, HTTPException
# from .schemas import EmployeeCreate
from .database import supabase

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Welcome to the HRMS API"}
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes import employee, attendance

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "HRMS API Running "}


# Register routes
app.include_router(employee.router, prefix="/employees", tags=["Employees"])
app.include_router(attendance.router, prefix="/attendance", tags=["Attendance"])
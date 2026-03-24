import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

print("Connecting to Supabase URL:", SUPABASE_URL)

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
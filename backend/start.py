import uvicorn
import subprocess
import sys

def install_deps():
    subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])

def init_db():
    from init_db import init_database
    init_database()

def main():
    install_deps()
    init_db()
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

if __name__ == "__main__":
    main()

from sqlalchemy import text
from database import engine, SessionLocal
from models import Base

def init_database():
    db = SessionLocal()
    try:
        db.execute(text("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\""))
        db.commit()
        Base.metadata.create_all(bind=engine)
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()

if __name__ == "__main__":
    init_database()

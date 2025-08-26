from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import List, Optional
import uuid
class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    user_id: uuid.UUID

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    expires_in: int

class TokenData(BaseModel):
    email: Optional[str] = None

class NoteCreate(BaseModel):
    title: str
    content: str

class NoteResponse(BaseModel):
    id: uuid.UUID
    title: str
    content: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class NotesListResponse(BaseModel):
    items: List[NoteResponse]
    offset: int
    limit: int
    has_more: bool

class UserLogin(BaseModel):
    email: EmailStr
    password: str

from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel

from typing import List


app = FastAPI()

DATABASE_URL = "sqlite:///./notes.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False}) # Connects API to SQLite database

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine) # Creates a new session for database interactions, autoflush is disabled to prevent automatic changes being sent to the database

Base = declarative_base() # Base class for declarative class definitions


class Note(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String, index=True)
    content = Column(String, index=True)


Base.metadata.create_all(bind=engine) # Creates the notes table in the database


# Dependency to get DB session
def get_db():
    db = SessionLocal() # Creates a new database session to interact with the database
    try:
        yield db # Yields the database session for use in API endpoints
    finally:
        db.close()


orgins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=orgins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model for request body
class NoteCreate(BaseModel):
    title: str
    content: str


# Pydantic model for response body
class NoteResponse(BaseModel):
    id: int
    title: str
    content: str

    class Config:
        orm_mode = True


@app.post("/notes/create/", response_model=NoteResponse)
def create_note(note: NoteCreate, db: Session = Depends(get_db)):
    db_note = Note(title=note.title, content=note.content) # Creates a new Note instance
    db.add(db_note) # Adds the new note to the database session
    db.commit() # Commits the transaction to save the note in the database
    db.refresh(db_note) # Refreshes the instance to reflect the database state
    return db_note


@app.get("/notes/", response_model=List[NoteResponse]) # A list of NoteResponse models will be returned
def read_notes(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    notes = db.query(Note).offset(skip).limit(limit).all() # Queries the database for notes with pagination
    return notes



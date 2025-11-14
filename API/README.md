# API
This is a simple REST API that serves as the backend for the notes project. 

## Technologies
- Python
- FastAPI
- Uvicorn
- SQLAlchemy 
- Postman (Optional)

# How to Get Started
## Requirements
- Python
- Postman (Optional)

## Installation & Setup 
1. Clone the repository [https://github.com/LisAY22/Notes.git](https://github.com/LisAY22/Notes.git)
2. Navigate to the API project directory ```cd Notes/API```
3. Create the virtual environment and activate it 
4. Install all the requirements with ```pip install -r requirements.txt```
5. Run the API ```uvicorn main:app --reload```

## API Endpoints
| Method | Endpoint |
| ------- | ------- | 
| GET | ```/notes/``` | 
| POST | ```/notes/create``` |


import sys
try:
    from fastapi import FastAPI
    from pydantic import BaseModel  # type: ignore
    from model import predict_category
except ImportError as e:
    print(f"Import error: {e}")
    print("Please install required packages: pip install fastapi pydantic uvicorn")
    sys.exit(1)

app = FastAPI()

# Data structure for the request
class ExpenseRequest(BaseModel):
    title: str

@app.get("/")
def health_check():
    return {"status": "AI Service is active"}

@app.post("/predict")
def get_prediction(expense: ExpenseRequest):
    # Call the model function from model.py
    category = predict_category(expense.title)
    print(f"AI categorized '{expense.title}' as '{category}'")
    return {"category": category}

if __name__ == "__main__":
    import uvicorn
    # Run the server on Port 8000
    uvicorn.run(app, host="127.0.0.1", port=8000)
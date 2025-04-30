# LLM Bot Backend

A simple FastAPI backend for the LLM ChatBot.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the server:
```bash
uvicorn main:app --reload
```

The server will start at `http://localhost:8000`.

## API Endpoints

- `POST /chat`: Send a message to the chatbot
  - Request body: `{"message": "your message here"}`
  - Response: `{"response": "bot's response"}`

## Development

To add your actual LLM bot logic, modify the `chat` function in `main.py`. 
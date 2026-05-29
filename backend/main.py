from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI(title="The Food District API")

# Enable CORS for Next.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class OrderItem(BaseModel):
    id: int
    name: str
    price: float
    quantity: int

class Order(BaseModel):
    user_id: str
    items: List[OrderItem]
    total: float
    address: str

# Mock Database for testing before Supabase
@app.get("/")
def home():
    return {"status": "The Food District Backend is Online"}

@app.get("/menu")
def get_menu():
    return [
        {"id": 1, "name": "Truffle Pizza", "price": 599},
        {"id": 2, "name": "Signature Burger", "price": 349}
    ]

@app.post("/place-order")
def place_order(order: Order):
    # Calculate 5% cashback
    cashback = order.total * 0.05
    return {
        "message": "Order Placed Successfully",
        "order_id": 99281,
        "cashback_earned": cashback,
        "new_wallet_balance": 500 + cashback # Mock logic
    }

@app.get("/user/stats/{user_id}")
def get_user_stats(user_id: str):
    return {
        "wallet_balance": 150.00,
        "loyalty_points": 1250,
        "tier": "Gold",
        "total_orders": 12
    }
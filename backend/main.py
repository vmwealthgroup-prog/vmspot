from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import asyncio
import json
import time

app = FastAPI()

@app.websocket("/ws/signals")
async def websocket_signals(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # Simulate real-time signal broadcast every 10 seconds
            await asyncio.sleep(10)
            
            signal_payload = {
                "type": "SIGNAL",
                "symbol": "BTCUSDT",
                "signal": "BUY",
                "price": 94280.50,
                "time": "2026-09-23" # Must match candlestick time format
            }
            await websocket.send_text(json.dumps(signal_payload))

    except WebSocketDisconnect:
        print("Client disconnected")
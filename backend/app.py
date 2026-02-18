import sys
import os

# Add project root to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from backend.main import app

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))  # Render uses PORT
    app.run(
        host="0.0.0.0",
        port=port,
        debug=False   # IMPORTANT: disable debug in production
    )

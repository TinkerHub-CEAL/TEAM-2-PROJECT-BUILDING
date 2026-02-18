import sys
import os

# Add project root to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from backend.main import app

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))  # Render uses PORT
    print(f"Attempting to start app on 0.0.0.0:{port}")
    sys.stdout.flush()
    try:
        app.run(
            host="0.0.0.0",
            port=port,
            debug=False   # IMPORTANT: disable debug in production
        )
    except Exception as e:
        print(f"Failed to start app: {e}")
        sys.stdout.flush()

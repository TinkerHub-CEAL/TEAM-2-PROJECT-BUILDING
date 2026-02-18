# Digital Lost & Found System

A modern web application to help students report and find lost items using AI-powered semantic search.

## Features

-   **AI Search**: Find items by description using vector embeddings (Sentence Transformers).
-   **Authentication**: Secure Register/Login system with JWT.
-   **Image Uploads**: Upload photos of lost/found items.
-   **Dark Mode**: Beautiful UI with toggleable dark/light themes.
-   **Dashboard**: Manage your reported items.

## Tech Stack

-   **Backend**: Flask (Python), SQLite, SQLAlchemy
-   **Frontend**: HTML5, CSS3 (Glassmorphism), Vanilla JavaScript
-   **AI**: SentenceTransformers (all-MiniLM-L6-v2) for text embeddings

## Setup & Installation

1.  **Clone the repository**
2.  **Install Dependencies**
    ```bash
    pip install -r requirements.txt
    ```

## Running the Application

1.  **Start the Backend Server**
    ```bash
    python app.py
    ```
    The server will start at `http://localhost:5000`.

2.  **Open the Frontend**
    Open `Frontend/index.html` in your browser.
    *(Or run a simple server in Frontend dir: `python -m http.server 8000`)*

## Usage

1.  **Register** an account on the Login page.
2.  **Report** a lost or found item with a photo.
3.  **Search** for items using natural language (e.g., "blue backpack near library").
4.  **View** matches and contact the reporter.

## Folder Structure

-   `backend/`: Flask application code
    -   `main.py`: Core logic and API endpoints
    -   `models.py`: Database schemas
    -   `config.py`: Configuration
-   `Frontend/`: Web interface
    -   `index.html`: Home page
    -   `style.css`: Styling
    -   `script.js`: API interactions
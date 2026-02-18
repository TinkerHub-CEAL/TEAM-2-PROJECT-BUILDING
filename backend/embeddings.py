from sentence_transformers import SentenceTransformer
import numpy as np
import json

model = None
 
def get_model():
    global model
    if model is None:
        print("Loading SentenceTransformer model...")
        model = SentenceTransformer("all-MiniLM-L6-v2")
        print("Model loaded.")
    return model
 
 
def generate_embedding(text: str) -> str:
    """Generate embedding and return as JSON string for MySQL TEXT storage."""
    m = get_model()
    vec = m.encode(text).tolist()
    return json.dumps(vec)


def parse_embedding(embedding_json: str) -> list:
    """Parse JSON string back to float list."""
    if embedding_json is None:
        return []
    return json.loads(embedding_json)


def cosine_similarity(vec1, vec2) -> float:
    v1 = np.array(vec1)
    v2 = np.array(vec2)
    norm1 = np.linalg.norm(v1)
    norm2 = np.linalg.norm(v2)
    if norm1 == 0 or norm2 == 0:
        return 0.0
    return float(np.dot(v1, v2) / (norm1 * norm2))

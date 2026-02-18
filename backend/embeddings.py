import json

# Dummy implementation to remove heavy AI dependencies

def generate_embedding(text: str) -> str:
    """
    Deprecated: No longer generates real embeddings.
    Returns an empty JSON list to satisfy database schema.
    """
    return json.dumps([])


def parse_embedding(embedding_json: str) -> list:
    """Parse JSON string back to list."""
    if embedding_json is None:
        return []
    try:
        return json.loads(embedding_json)
    except:
        return []


def cosine_similarity(vec1, vec2) -> float:
    """Deprecated: Always returns 0."""
    return 0.0


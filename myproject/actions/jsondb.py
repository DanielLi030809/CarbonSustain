from django.conf import settings
from pathlib import Path
import json, os
from tempfile import NamedTemporaryFile


DATA_PATH = Path(settings.BASE_DIR) / "data.json"

def file_exist():
    """Create an empty JSON list if file does not exist yet"""
    if not DATA_PATH.exists():
        DATA_PATH.write_text("[]", encoding="utf-8")

def load_data():
    """Return all items as a list of dictionaries"""
    file_exist()
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        return json.load(f)
    
def safe_write(data):
    """Safely write JSON file to avoid corruption on crash"""
    DATA_PATH.parent.mkdir(parents=True, exist_ok=True)
    tmp_path = None
    try:
        with NamedTemporaryFile('w', delete=False, dir=str(DATA_PATH.parent)) as tmp:
            tmp_path = tmp.name
            json.dump(data, tmp, ensure_ascii=False, indent=2)
            tmp.flush()
            os.fsync(tmp.fileno())
        os.replace(tmp_path, DATA_PATH)
    except Exception as e:
        if tmp_path and os.path.exists(tmp_path):
            os.unlink(tmp_path)
            print("Cleaned up temp file despite exception")
        raise e


import firebase_admin
from firebase_admin import credentials, firestore
from .config import GOOGLE_APPLICATION_CREDENTIALS

cred = credentials.Certificate(GOOGLE_APPLICATION_CREDENTIALS)
firebase_admin.initialize_app(cred)


print("🔥 Backend connected to Firebase project:",
      firebase_admin.get_app().project_id)

db = firestore.client()
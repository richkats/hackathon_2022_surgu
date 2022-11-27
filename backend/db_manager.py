import pymongo
from credentials import *
import random
import hashlib
import re
'''
CONNECTION_URL = f"mongodb+srv://admin:{PY_MONGO_PASS}@cluster0.xvtdtfu.mongodb.net/?retryWrites=true&w=majority"


class MongoDB:
    def __init__(self):
        self.client = pymongo.MongoClient(CONNECTION_URL)
        self.db = self.client.surguEventsDB
        self.events_col = self.db.events
        self.partners_col = self.db.partners
        self.university_col = self.db.university

    @staticmethod
    def _insert_document(collection, data):
        """ Function to insert a document into a collection and
        return the document's id.
        """
        return collection.insert_one(data).inserted_id

    @staticmethod
    def _create_salt(length=15):
        letters = string.digits
        salt = ''.join(random.choice(letters) for i in range(10))
        return salt

    @staticmethod
    def count_documents(collection, **kwargs):
        print(kwargs)
        return collection.count_documents(kwargs)'''


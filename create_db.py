# create_db.py
from app import db, models

# create the database and the db table
db.create_all()

# commit the changes
db.session.commit()
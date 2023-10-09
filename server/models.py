from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    games = db.relationship('Game', backref='user')
    reviews = db.relationship('Review', backref='user')
  
    @hybrid_property
    def password_hash(self):
        if self._password_hash:
            raise AttributeError('Password hashes may not be viewed.')
                   
    @password_hash.setter
    def password_hash(self, password):   
        password_hash = bcrypt.generate_password_hash( password.encode('utf-8'))    
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    
    def __repr__(self):
        return f'User: {self.username}, ID: {self.id}'

class Game(db.Model, SerializerMixin):
    __tablename__ = 'games'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    played_at = db.Column(db.DateTime, server_default=db.func.now())
    time_spent = db.Column(db.Integer)
    
    def __repr__(self):
        return f'Game ID: {self.id}, Time spent: {self.time_spent}'
    
class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    content = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    
    def __repr__(self):
        return f'User Id: {self.user_id}, Content: {self.content}'
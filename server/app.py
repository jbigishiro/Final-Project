#!/usr/bin/env python3
from flask import request, session, jsonify
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from random import sample

from config import app, db, api
from models import User, Game, Review


class Signup(Resource):
    def post(self):
        data = request.get_json()
        username = data["username"]
        password = data["password"]
        password_confirmation = data["passwordConfirmation"]

        errors = []
        # Validate username and password
        if not username or not password or not password_confirmation:
            errors.append("All fields are required")

        # Check if password and password_confirmation match
        if password != password_confirmation:
            errors.append("Password confirmation failed")

        # Check if the username is already taken
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            errors.append("Username already taken. Please try again.")

        if errors:
            return {"errors": errors}, 422

        
        # Hash the password and create a new user
        new_user = User(username=username)
        new_user.password_hash = password  # This will hash the password
        db.session.add(new_user)
        db.session.commit()

        session["user_id"] = new_user.id

        return new_user.to_dict(), 201
    
class CheckSession(Resource):
    def get(self):

        user=User.query.filter(User.id == session.get('user_id')).first()       
        if user:
            return (
            {
                "id" : user.id,
                "username" : user.username,
            }, 200)
        return {"Message": "Unauthorized"}, 401
    
class Review(Resource):
    def get(self):
        user = User.query.filter(User.id==session.get('user_id')).first()
        if user:
            reviews = [review.to_dict() for review in Review.query.all()]
            return (reviews),200
        
        return {'message': 'unauthorized'}, 401

    def post(self):
        user = User.query.filter(User.id==session.get('user_id')).first()
        if user:
            json = request.get_json()
            review = Review(
                    content = json['title'],
                    user_id = session['user_id']
                )
            db.session.add(review)
            db.session.commit()

        return {"message": "unauthorized"}, 401
    
class Login(Resource):
    def post(self):

        username = request.get_json()['username']
        user = User.query.filter(User.username == username).first()

        if user:
            password = request.get_json()['password']
            if user.authenticate(password):
                session['user_id'] = user.id
                return {
                    "id" : user.id,
                    "username" : user.username,
                }, 201

        return {'error': 'Incorrect username or password, try again'}, 401

class Logout(Resource):
    def delete(self):

        if session.get("user_id"):
            session['user_id'] = None

            return {}, 204


        return {"message": "unauthorized"}, 401

api.add_resource(Signup, "/signup", endpoint="signup")
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(Review, '/reviews', endpoint='reviews')


if __name__ == "__main__":
    app.run(port=5555, debug=True)
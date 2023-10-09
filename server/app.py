from flask import request, session, jsonify, make_response
from flask_restful import Resource
from sqlalchemy import func

from config import app, db, api
from models import User, Game, Review

class Signup(Resource):
    def post(self):
        data = request.get_json()
        username = data["username"]
        password = data["password"]
        password_confirmation = data["passwordConfirmation"]

        errors = []

        if not username or not password or not password_confirmation:
            errors.append("All fields are required")

        if password != password_confirmation:
            errors.append("Password confirmation failed")

        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            errors.append("Username already taken. Please try again.")

        if errors:
            return {"errors": errors}, 422

        new_user = User(username=username)
        new_user.password_hash = password  
        db.session.add(new_user)
        db.session.commit()

        session["user_id"] = new_user.id

        return new_user.to_dict(), 201

class CheckSession(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            return {
                "id": user.id,
                "username": user.username,
            }, 200
        return {"Message": "Unauthorized"}, 401

class ReviewResource(Resource):
    def get(self):
        user = User.query.filter_by(id=session.get('user_id')).first()
        if user:
            reviews = []
            for review in Review.query.all():
                review_dict = {
                "id": review.id,
                "content": review.content,
                }
                reviews.append(review_dict)
            response = make_response(reviews, 200)
            return response

        return {'message': 'Unauthorized, please login'}, 401

    def post(self):
        user = User.query.filter_by(id=session.get('user_id')).first()
        if user:
            json_data = request.get_json()
            review = Review(
                content=json_data['content'],
                user_id=session['user_id']
            )
            db.session.add(review)
            db.session.commit()
            return {'message': 'Review created successfully'}, 201
        return {'message': 'Unauthorized'}, 401

class Login(Resource):
    def post(self):
        username = request.get_json()['username']
        user = User.query.filter(User.username == username).first()

        if user:
            password = request.get_json()['password']
            if user.authenticate(password):
                session['user_id'] = user.id
                return {
                    "id": user.id,
                    "username": user.username,
                }, 201

        return {'error': 'Incorrect username or password, try again'}, 401

class Logout(Resource):
    def delete(self):
        if session.get("user_id"):
            session['user_id'] = None
            return {}, 204

        return {"message": "unauthorized"}, 401

class GameRank(Resource):
    def post(self):
        user_id = session.get('user_id')
        time_spent = request.json.get('time_spent')

        if user_id and time_spent:
            game = Game(user_id=user_id, time_spent=time_spent)
            db.session.add(game)
            db.session.commit()

            # Calculate user's rank based on time spent (assuming lower time is better)
            user_rank = db.session.query(func.count().label('rank')).filter(Game.time_spent < time_spent).scalar() + 1

            return jsonify({'message': 'Game ended successfully', 'rank': user_rank}), 201
        return {'message': 'Unauthorized or missing data'}, 401

api.add_resource(Signup, "/signup", endpoint="signup")
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(ReviewResource, '/reviews', endpoint='reviews')
api.add_resource(GameRank, '/end_game', endpoint='end_game')  

if __name__ == "__main__":
    app.run(port=5555, debug=True)

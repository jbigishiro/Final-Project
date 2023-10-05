#!/usr/bin/env python3

from random import randint, choice as rc

from faker import Faker

from app import app
from models import db, User, Game, Review

fake = Faker()

with app.app_context():

    print("Deleting all records...")
    User.query.delete()
    Game.query.delete()
    Review.query.delete()

    fake = Faker()

    print("Creating users...")
    # make sure users have unique usernames
    users = []
    usernames = []

    for i in range(5):
        
        username = fake.first_name()
        while username in usernames:
            username = fake.first_name()
        usernames.append(username)

        user = User(
            username=username
        )
        user.password_hash = user.username + 'password'

        users.append(user)

    db.session.add_all(users)

    print("Creating games...")
    games = []
    for i in range(20):
        
        game = Game(
            minutes_to_complete=randint(40,100),
        )

        game.user_id = rc(users)

        games.append(game)

    db.session.add_all(games)


    print("Creating recipes...")
    reviews = []
    for i in range(20):
        content = fake.paragraph(nb_sentences=6)
        
        review = Review(
            content=content
        )
        review.user_id = rc(users)

        reviews.append(review)

    db.session.add_all(reviews)

    db.session.commit()
    print("Complete.")


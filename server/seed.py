#!/usr/bin/env python3

from random import randint
from faker import Faker
from app import app, db
from models import User, Game, Review

fake = Faker()

with app.app_context():
    print("Deleting all records...")
    db.session.query(User).delete()
    db.session.query(Game).delete()
    db.session.query(Review).delete()

    print("Creating users...")
    users = []

    for i in range(5):
        username = fake.user_name()
        while User.query.filter_by(username=username).first():
            username = fake.first_name()

        user = User(
            username=username
        )
        user.password_hash = username + 'password'

        users.append(user)

    db.session.add_all(users)
    db.session.commit()

    print("Creating games...")
    games = []
    for i in range(20):
        game = Game(
            time_spent=randint(30, 70),
            user_id=fake.random_element(elements=users).id
        )
        games.append(game)

    db.session.add_all(games)
    db.session.commit()

    print("Creating reviews...")
    reviews = []
    for i in range(5):
        content = fake.paragraph(nb_sentences=4)
        
        review = Review(
            content=content,
            user_id=fake.random_element(elements=users).id
        )
        reviews.append(review)

    db.session.add_all(reviews)
    db.session.commit()

    print("Complete.")

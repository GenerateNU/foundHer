from main_test import client, test_db

def test_applicant_question(test_db):
    response = client.get("applicant_questions")
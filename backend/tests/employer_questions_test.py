from main_test import client, test_db

def test_employer_questions(test_db):
    # json={"question_content": 'How is the weather today', "possible_answers": ["The weather is great", "The weather is bad", "The weather is okay"]}
    response = client.get("/employer-questions")
    assert response.status_code == 200
    assert response.json() == {"welcome": "you"}

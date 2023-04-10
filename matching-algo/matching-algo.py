import json
import requests
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import pandas as pd


BASE_API_URL = 'http://localhost:8000'

def get_ordered_matches(applicant_id):
    # get all the data we need
    all_postings = pd.read_json(json.loads(requests.get("{BASE_API_URL}/all-job-postings").text))
    applicant_answers = pd.read_json(json.loads(requests.get("{BASE_API_URL}/all-applicant-answers/{applicant_id}").text))
    employer_answers = pd.read_json(json.loads(requests.get("{BASE_API_URL}/all-employer-answers").text))
    latest_job_title = json.loads(requests.get("{BASE_API_URL}/applicant-profile").text)["latest_job_title"]
    latest_job_experiences = json.loads(requests.get("{BASE_AP_URL}/applicant-experiences/{applicant_id}"))

    # match applicant answers and employer answers


    # match job title and previous job title


    # combine all scores with some sort of weighting for a final score



# calculate similarity between 2 sets of rankings
def spearman_rank_correlation(rankings1, rankings2):
    n = len(rankings1)
    ranked_diffs = [((rankings1[i] - rankings2[i])**2) / (i+1) for i in range(n)]
    return 1 - (6 * sum(ranked_diffs)) / (n * (n**2 - 1))


def answer_ranking_score(applicant_rankings, all_employer_rankings):
    correlations = [0] * len(all_employer_rankings)
    for index, employer_rankings in enumerate(all_employer_rankings):
        shared_rankings1 = [applicant_rankings.index(choice) for choice in employer_rankings]
        # shared_rankings2 = [job_rankings.index(choice) for choice in answer_choices]
        shared_rankings2 = [*range(len(employer_rankings))]

        correlation = spearman_rank_correlation(shared_rankings1, shared_rankings2)
        # convert to 0 to 1 range
        correlations[index] = (correlation+1)/2

    return correlations

def tfidf_score(past_job_description, employer_job_descriptions):
    # Vectorize the texts using TF-IDF
    tfidf_vectorizer = TfidfVectorizer()
    tfidf_applicant_answers = tfidf_vectorizer.fit_transform(employer_job_descriptions)
    tfidf_job_descriptions = tfidf_vectorizer.transform(past_job_description)

    # Compute the cosine similarity between each job description and the applicant answers
    similarity_scores = cosine_similarity(tfidf_applicant_answers, tfidf_job_descriptions)

    # Get the top job matches for each job description
    top_job_matches = similarity_scores.argsort(axis=1)[:,::-1][:,:3]

    # Print the results
    for j, job_index in enumerate(top_job_matches):
        job = employer_job_descriptions[job_index][j]
        similarity = similarity_scores[j, job_index]
        print(job, similarity)

    return similarity_scores, top_job_matches
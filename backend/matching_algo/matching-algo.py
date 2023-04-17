import json
import requests
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import pandas as pd


BASE_API_URL = 'http://localhost:8000'

def get_ordered_matches(applicant_id, all_job_postings):
    # get all the data we need

    # posting - id: int, employer_id: int, description: str, location: str, experience_level: str
    all_postings = pd.read_json(json.loads(all_job_postings))

    # we probably only want ranked answers?
    # applicant_answer - id: int, question_id: int, applicant_id: int, question_type: str, 
    #   range_answer: Optional[Dict[str, int]], multiple_choice_answer: Optional[List[str]], 
    #   open_ended_answer: Optional[str], ranked_answer: Optional[Dict[str, int]]
    applicant_answers = pd.read_json(json.loads(requests.get("{BASE_API_URL}/all-applicant-answers/{applicant_id}").text))

    applicant_answers = applicant_answers.loc[applicant_answers["question_type"] == "ranked"]

    # employer_answer - id = int, question_id: int, user_id: int, question_type: str, 
    #   range_answer: Optional[Dict[str, int]], multiple_choice_answer: Optional[List[str]], 
    #   open_ended_answer: Optional[str], ranked_answer: Optional[Dict[str, int]]
    employer_answers = pd.read_json(json.loads(requests.get("{BASE_API_URL}/all-employer-answers").text))

    # list of strings
    latest_job_title = json.loads(requests.get("{BASE_API_URL}/applicant-profile").text)["latest_job_title"]

    # experience - id: int, applicant_id: int, from_: str, to_: str, description: str, company: str, location: str  
    latest_job_experiences = pd.read_json(json.loads(requests.get("{BASE_AP_URL}/applicant-experiences/{applicant_id}")))["description"]

    # match applicant answers and employer answers
    #   function input, single applicant_answer, all employer_answers
    applicant_answers["ranked_answer"]

    employer_ranked_scores = [ [] for _ in range(employer_answers.shape[0])]
    for applicant_answer in applicant_answers.iterrows():
        current_question = answer_ranking_score(applicant_answer["ranked_answer"], employer_answers["question_id" == applicant_answer["question_id"]])
        for index, rank in enumerate(current_question):
            employer_ranked_scores[index].append(rank)

    employer_mean_scores = np.mean(employer_ranked_scores, axis=1)
    employer_answers["final_score"] = employer_mean_scores

    # match job titles and previous job title
    title_scores = tfidf_score([latest_job_title], all_postings["title"].tolist())
    all_postings["title_score"] = title_scores

    # match job descriptions and previous job descriptions
    description_scores = tfidf_score(latest_job_experiences, all_postings["description"].tolist())
    all_postings["description_score"] = description_scores

    # For each posting: get the employer id, get the "final_score" corresponding to that employer_id, add it as "employer_score"
    employer_ranked_dict = employer_answers.set_index('user_id').to_dict()['final_score']

    all_postings["employer_score"] = all_postings["employer_id"].map(employer_ranked_dict)


    # combine all scores with some sort of weighting for a final score
    all_postings["weighted_score"] = (.5 * all_postings["employer_score"]) + (.2 * all_postings["title_score"]) + (.3 * all_postings["description_score"])
    
    all_postings["weighted_score"], all_postings["id"]
    result = list(zip(all_postings["id"], all_postings["weighted_score"]))
    result.sort(key=lambda x: x[1], reverse=True)
    return result


# calculate similarity between 2 sets of rankings
def spearman_rank_correlation(rankings1, rankings2):
    n = len(rankings1)
    ranked_diffs = [((rankings1[i] - rankings2[i])**2) / (i+1) for i in range(n)]
    return 1 - (6 * sum(ranked_diffs)) / (n * (n**2 - 1))

def answer_ranking_score(applicant_rankings, all_employer_rankings):
    correlations = [0] * len(all_employer_rankings)
    rankings = [''] * len(applicant_rankings)

    for index, employer_rankings in enumerate(all_employer_rankings):
        for des, rank in employer_rankings.items():
            rankings[rank-1] = des
        shared_rankings1 = [applicant_rankings[choice] for choice in rankings]
        # shared_rankings2 = [job_rankings.index(choice) for choice in answer_choices]
        shared_rankings2 = [*range(len(rankings))]

        correlation = spearman_rank_correlation(shared_rankings1, shared_rankings2)
        # convert to 0 to 1 range
        correlations[index] = (correlation+1)/2

    return correlations

def tfidf_score(past_job_description, employer_job_descriptions):
    # Vectorize the texts using TF-IDF
    tfidf_vectorizer = TfidfVectorizer()
    tfidf_applicant_answers = tfidf_vectorizer.fit_transform(past_job_description)
    tfidf_job_descriptions = tfidf_vectorizer.transform(employer_job_descriptions)

    similarity_scores = cosine_similarity(tfidf_applicant_answers, tfidf_job_descriptions)

    # get the average similarity for each of the employer jobs
    result_scores = np.mean(similarity_scores, axis=0)

    return result_scores
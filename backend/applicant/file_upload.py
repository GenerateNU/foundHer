import psycopg2

connection = psycopg2.connect(user="user",
                                password="pwd",
                                host="127.0.0.1",
                                port="5433",
                                database="foundher")
cursor = connection.cursor()

postgres_insert_query = """ INSERT INTO resumes (file_name, resume_file, applicant_id) VALUES (%s,%s, %d)"""


def upload_file(applicant_id: int, file_content: bytes, file_name: str) -> bool:
    # a = byte_to_hex(file_content)
    postgres_insert_query.format(file_name, file_content, applicant_id)
    a = f"INSERT INTO resumes(file_name, resume_file, applicant_id) \nVALUES ({file_name}, {file_content}, {applicant_id});"
    # print(a)
    # cursor.execute(a)
    # connection.commit()
    return True


def byte_to_hex(content: bytes) -> hex:
     return content.hex()


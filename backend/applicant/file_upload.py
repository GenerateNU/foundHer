import psycopg2

connection = psycopg2.connect(user="user",
                                password="pwd",
                                host="127.0.0.1",
                                port="5433",
                                database="foundher")
cursor = connection.cursor()

postgres_insert_query = """ INSERT INTO resumes (file_name, resume_file, applicant_id) VALUES (%s,%s,%s, %d)"""


def upload_file(applicant_id: int, file_content: bytearray, file_name: str) -> bool:
    postgres_insert_query.format()

    connection.commit()


    return False


def byte_to_hex(content: bytearray) -> hex:
     return content.hex()


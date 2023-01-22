###
# class Employer_Question:
# tablename = "employer_questions"
# id = Column(Integer, primary_key=True,index=True)
# question_content = Column(String(200), nullable=False, unique=True)
# possible_answers = Column(ARRAY(String(40)))
# 
# class Employer_Answer:
# tablename = "employer_answers"
# id = Column(Integer, primary_key=True,index=True)
# user_id = Column(Integer, ForeignKey('user.id'))
# question_id = Column(Integer, ForeignKey('employer_questions.id'))
# answers = Column(ARRAY(String(40)))
###
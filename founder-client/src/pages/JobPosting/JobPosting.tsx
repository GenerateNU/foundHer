import { MuiTabs } from "./muitabs";
import "./JobPosting.css";


export default function App() {
  const listExperience = ["Entry", "Junior", "Mid", "Senior", "Expert"];

  const experienceSelected = "Junior";

  const displayExperienceList = listExperience.map((option) => {
    if (option === experienceSelected) {
      return <li className="experienceOptionSelected">{option}</li>;
    } else {
      return <li className="experienceOption">{option}</li>;
    }
  });

  const skillsList = [
    "Python",
    "Organization",
    "Communication",
    "Self-Starter",
    "React"
  ];

  const displaySkillsList = skillsList.map((option) => {
    return <li className="skillOption">{option}</li>;
  });
  return (
    <>
      <div className="App">
        <h1 className="jobTitle">Job Title</h1>
        <h3 className="jobType">Full-Time Hybrid</h3>
        <h5 className="posted">Posted Two Days Ago</h5>

        <div className="line"></div>

        <div>
          <h3 className="locationHeader">Location</h3>
          <h5 className="locationSub">Mumbai, Maharashtra</h5>
        </div>

        <div className="line"></div>

        <div>
          <h3 className="experienceLevel">Experience Level</h3>

          <ul className="listExperience">{displayExperienceList}</ul>
        </div>

        <div className="line"></div>

        <div>
          <h3 className="desiredSkills">Desired Skills</h3>

          <ul className="listSkills">{displaySkillsList}</ul>
        </div>

        <div className="line"></div>
      </div>
      <div className="Tabs">
        <MuiTabs />
      </div>
    </>
  );
}
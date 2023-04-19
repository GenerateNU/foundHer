import { useState } from "react";
import { Box, Grid, Typography, Button, Card, CardContent, CardActions } from "@mui/material";
import "./JobSummaryCard.css";
import { JobPosting, JobPostingPropTypes } from "../../util/Types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faCheck } from "@fortawesome/free-solid-svg-icons";



export default function JobSummaryCard(jobPostingProp: JobPostingPropTypes) {
  const [applied, setApplied] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleClickApply() {
    setApplied(true);
  }
  function handleClickSave() {
    setSaved(true);
  }

  const jobDetailsList = jobPostingProp.jobPosting.tags;

  const displayJobDetailsList = jobDetailsList.map((option) => {
    return <li className="jobOption">{option}</li>;
  });

  const title = jobPostingProp.jobPosting.title;

  const company = jobPostingProp.jobPosting.company;

  const location = jobPostingProp.jobPosting.location;

  const pay = "150$-200$/hr";

  const match = "80% match";

  const description = jobPostingProp.jobPosting.description;

  return (
    <>
      <Card className="jobCard">
        <CardContent>
          <div className="blankSquare"></div>
          <div className="titleCompanyLocation">
            <h2 className="title">{title}</h2>
            <h3 className="company">{company}</h3>
            <h3 className="location">{location}</h3>
          </div>
          <ul className="jobDetailsDisplay">{displayJobDetailsList}</ul>

          <div>
            <FontAwesomeIcon icon={faDollarSign} className="dollarIcon" />
            <h4 className="pay">{pay}</h4>
          </div>
          <div>
            <FontAwesomeIcon icon={faCheck} className="checkIcon" />
            <h4 className="match">{match}</h4>
          </div>
          <p className="desc">{description}</p>

          <CardActions className="jobButtons">
            <Button
              sx={{ boxShadow: 0 }}
              variant="contained"
              className="saveButton"
              onClick={handleClickSave}
            >
              Save
            </Button>
            <Button
              sx={{ boxShadow: 0 }}
              variant="contained"
              className="applyButton"
              onClick={handleClickApply}
            >
              View
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </>
  );

//   return (
//     <Box  sx={{ bgcolor: '#D4D4D4' }}>
//       <Typography className="job_title"> {jobPostingProp.jobPosting.title} </Typography>
//       <Typography className="company"> {jobPostingProp.jobPosting.company} </Typography>
//       <Typography className="location"> {jobPostingProp.jobPosting.location} </Typography>
      
//       <Box className="rectangle"></Box>

//       {jobPostingProp.jobPosting.tags.map((tag) => {
//           return (<Box sx={{ flexDirection: 'row' }} className="tag">
//               {tag}
//               </Box>)
//       })}


//       <button
//       className={applied ? "applied-button" : "default-button"}
//       onClick={handleClickApply}>
//       {applied ? <span>&#10003;</span> : "Apply"}
//       </button>

//       <button
//       className={applied ? "applied-button" : "default-button"}
//       onClick={handleClickSave}>
//       {saved ? <span>&#10003;</span> : "Save"}
//       </button>
//     </Box>
//   );
}

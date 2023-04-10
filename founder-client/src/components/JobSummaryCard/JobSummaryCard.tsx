import { useState } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import "./JobSummaryCard.css";
import { JobPosting, JobPostingPropTypes } from "../../util/Types";


export default function JobSummaryCard(jobPostingProp: JobPostingPropTypes) {
  const [applied, setApplied] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleClickApply() {
    setApplied(true);
  }
  function handleClickSave() {
    setSaved(true);
  }

  return (
    <Box  sx={{ bgcolor: '#D4D4D4' }}>
      <Typography className="job_title"> {jobPostingProp.jobPosting.title} </Typography>
      <Typography className="company"> {jobPostingProp.jobPosting.company} </Typography>
      <Typography className="location"> {jobPostingProp.jobPosting.location} </Typography>
      
      <Box className="rectangle"></Box>

      {jobPostingProp.jobPosting.tags.map((tag) => {
          return (<Box sx={{ flexDirection: 'row' }} className="tag">
              {tag}
              </Box>)
      })}


      <button
      className={applied ? "applied-button" : "default-button"}
      onClick={handleClickApply}>
      {applied ? <span>&#10003;</span> : "Apply"}
      </button>

      <button
      className={applied ? "applied-button" : "default-button"}
      onClick={handleClickSave}>
      {saved ? <span>&#10003;</span> : "Save"}
      </button>
    </Box>
  );
}

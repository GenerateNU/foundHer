import { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import "./JobSummaryCard.css";
import { JobPosting } from "../../util/Types";

const job_posting = {
    id: 1,
    employer_id: 1,
    title: "title",
    description: "descrition",
    company: "company",
    created_at: "01/01/2023",
    location: "Boston, MA",
    experience_level: "entry",
    skills: ["python", "react"],
    tags: ["remote", "fulltime"]
}

export default function JobSummaryCard() {
  const [applied, setApplied] = useState(false);

  function handleClick() {
    setApplied(true);
  }
  return (
    <Box  sx={{ bgcolor: '#D4D4D4' }}>
        <Typography className="job_title"> {job_posting.title} </Typography>
        <Typography className="company"> Company </Typography>
        <Typography className="location"> Location </Typography>
        <Box className="rectangle"></Box>

        {job_posting.tags.map((tag) => {
            return (<Box sx={{ flexDirection: 'row' }} className="tag">
                {tag}
                </Box>)
        })}


        <button
        className={applied ? "applied-button" : "default-button"}
        onClick={handleClick}
        >
        {applied ? <span>&#10003;</span> : "Apply"}
        </button>
    </Box>
  );
}

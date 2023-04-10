import { Box } from '@mui/material';
import { stat } from 'fs';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import JobSummaryCard from '../components/JobSummaryCard/JobSummaryCard';
import { getPostingsForApplicantThunk } from '../services/jobPosting/thunks';
import { JobPosting } from '../util/Types';

const POSTINGS = []


export default function Home() {
  const { currentUser } = useSelector((state: any) => state.users);
  const { jobPostings } = useSelector((state: any) => state.jobPostings);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getPostingsForApplicantThunk(1));
  }, []);

  return (
    <Box>
      {jobPostings.map((posting: any) => {
          return (<JobSummaryCard key={posting.id} jobPosting={posting}/>)
       })}
    </Box>
    
  );
}

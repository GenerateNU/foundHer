import { Box, Stack } from '@mui/material';
import { stat } from 'fs';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import JobSummaryCard from '../components/JobSummaryCard/JobSummaryCard';
import { getPostingsForApplicantThunk } from '../services/jobPosting/thunks';
import { JobPosting } from '../util/Types';
import ApplicantSummaryBar from '../components/ApplicantSummaryBar/ApplicantSummaryBar'
import SearchBar from '../components/SearchBar/SearchBar';
<<<<<<< HEAD
import "./Home.css";
=======
const POSTINGS = []
>>>>>>> main


export default function Home() {
  const { currentUser } = useSelector((state: any) => state.users);
  const { jobPostings } = useSelector((state: any) => state.jobPostings);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getPostingsForApplicantThunk(1));
  }, []);

  return (
    <Box>
      <Stack>
        <SearchBar onSearchQueryChange={function (arg0: React.SetStateAction<string>): void {
          throw new Error('Function not implemented.');
        } }/>
      </Stack>

      <Stack>
        <ApplicantSummaryBar summaryProp={{matches : jobPostings.length}}/>
      </Stack>

      <Stack>
          <div className="background">
          <div className="Matches">
            <h1 className="Matches">Top Matches for you!</h1>
          </div>
          <div className="jobs">
          {jobPostings.map((posting: any) => {
              return(
              <JobSummaryCard key={posting.id} jobPosting={posting}/>
              )
          })}
        </div>
          </div>
      </Stack>
      
    </Box>
    
  );
}

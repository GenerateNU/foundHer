import React from 'react';
import { useSelector } from 'react-redux';
import JobSummaryCard from '../components/JobSummaryCard/JobSummaryCard';
import { JobPosting } from '../util/Types';

export default function Home() {
  const { currentUser } = useSelector((state: any) => state.users);
  return (
    <JobSummaryCard/>
  );
}

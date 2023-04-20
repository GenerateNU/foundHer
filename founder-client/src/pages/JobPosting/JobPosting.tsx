import './JobPosting.css';
import { Box, Chip, Tab, Tabs } from '@mui/material';
import { stat } from 'fs';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getPostingsForApplicantThunk } from '../../services/jobPosting/thunks';
import { JobPosting } from '../../util/Types';
import { useLocation } from 'react-router-dom';

export default function JopPosting() {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const { currentUser } = useSelector((state: any) => state.users);
  const { jobPostings } = useSelector((state: any) => state.jobPostings);
  const [jobPosting, setJobPosting] = useState<JobPosting|null>(null);
  const [skillsList, setskillsList] = useState<string[]>([]);
  const [title, settitle] = useState<string | null>(null);
  const [location, setlocation] = useState<string|null>(null);
  const [company, setcompany] = useState<string|null>(null);
  const [description, setdescription] = useState<string|null>(null);
  const dispatch = useDispatch<any>();

  const path = useLocation().pathname;
  const parts = path.split("/")
  let jobID: number = +parts[parts.length - 1];
  useEffect(() => {
    // @ts-ignore
    dispatch(getPostingsForApplicantThunk(localStorage.getItem('currentUserID')));
  }, [])

  useEffect(() => {
    setJobPosting(jobPostings.find((job: JobPosting) => job.id === jobID));
    if (jobPosting) {
      settitle(jobPosting.title);
      setlocation(jobPosting.location);
      setcompany(jobPosting.company);
      setskillsList(jobPosting.skills);
      setdescription(jobPosting.description);
    }
  }, [jobPostings, jobPosting]);



  const displaySkillsList = skillsList.map(option => {
    return <Chip sx={{ backgroundColor: '#ffffff' }} label={option} />;
  });
  return (
    <div
      style={{
        backgroundColor: '#ECEDFF',
        padding: '50px',
        borderRadius: '10px',
      }}>
      <h3 style={{ margin: '0 0 10px 0', fontSize: '50px' }} className='serif'>
        {title}
      </h3>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
          alignItems: 'center',
        }}>
        <Chip sx={{ backgroundColor: '#ffffff' }} label='Full Time' />
        <Chip sx={{ backgroundColor: '#ffffff' }} label='Hybrid' />
        <span style={{ color: 'gray' }}>Posted 2 days ago</span>
      </div>
      <div className='company'>
        <h5>{company}</h5>
      </div>
      <hr></hr>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr' }}>
        <span className='serif'>Location</span>
        <span>{location}</span>
      </div>
      <hr></hr>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr' }}>
        <span className='serif'>Skills</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', width: '375px', gap: '10px' }}>
          {displaySkillsList}
        </div>
      </div>
      <hr></hr>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabIndex}
          onChange={(e, newTabIndex) => setTabIndex(newTabIndex)}
          aria-label='basic tabs example'
          indicatorColor='secondary'
          textColor='secondary'>
          <Tab label='Details' {...a11yProps(0)} />
          <Tab label='Description' {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={tabIndex} index={0}>
        <div id='details' style={{ height: '260px', overflow: 'scroll' }}>
          <div className='job_detail'>
            <span className='serif'>Position Type</span>
            <Chip sx={{ backgroundColor: '#F0F0F0' }} label='Full Time' />
          </div>
          <div className='job_detail'>
            <span className='serif'>Location</span>
            <Chip sx={{ backgroundColor: '#F0F0F0' }} label={location} />
          </div>
          <div className='job_detail'>
            <span className='serif'>Required Qualifications</span>
            <Chip sx={{ backgroundColor: '#F0F0F0' }} label='' />
          </div>
          <div className='job_detail'>
            <span className='serif'>Workplace Type</span>
            <Chip sx={{ backgroundColor: '#F0F0F0' }} label='' />
          </div>
        </div>
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <div style={{ width: '477px', height: '260px', overflow: 'scroll' }}>
          <span>
            {description}
          </span>
        </div>
      </TabPanel>
    </div>
    
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <div
          style={{
            marginTop: '20px',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            padding: '5px 10px',
          }}>
          {children}
        </div>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    'id': `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
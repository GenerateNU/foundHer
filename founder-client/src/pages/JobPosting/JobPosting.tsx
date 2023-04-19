import './JobPosting.css';
import { Box, Chip, Tab, Tabs } from '@mui/material';
import { useState } from 'react';

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

export default function JopPosting() {
  const [tabIndex, setTabIndex] = useState(0);

  const skillsList = ['Python', 'Organization', 'Communication', 'Self-Starter', 'React'];

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
        Job Title
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
        <h5></h5>
      </div>
      <hr></hr>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr' }}>
        <span className='serif'>Location</span>
        <span>Mumbai, Maharashtra</span>
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
            <Chip sx={{ backgroundColor: '#F0F0F0' }} label='Full Time' />
          </div>
          <div className='job_detail'>
            <span className='serif'>Required Qualifications</span>
            <Chip sx={{ backgroundColor: '#F0F0F0' }} label='Full Time' />
          </div>
          <div className='job_detail'>
            <span className='serif'>Workplace Type</span>
            <Chip sx={{ backgroundColor: '#F0F0F0' }} label='Full Time' />
          </div>
        </div>
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <div style={{ width: '477px', height: '260px', overflow: 'scroll' }}>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </span>
        </div>
      </TabPanel>
    </div>
  );
}

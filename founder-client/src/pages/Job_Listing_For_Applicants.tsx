import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './App.css'

function App () {
    const [postings, setPostings] = useState([])

useEffect(() => {
    var postings = []
    async function fetchData() {
        const result = await fetch('http://localhost:3001/postings/applicant_id={:id}')
        const jsonResult = result.json()

        setPostings(await jsonResult)
    }

    fetchData()
}, [])

return (
    <div className='postings_container'>
        <h2>Postings</h2>
        {postings.map(posting =>
            <div key={posting} className='posting_id'>
                </div>)}
                </div>
)
        }
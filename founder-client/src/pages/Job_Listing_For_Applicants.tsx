import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Postings () {
    const [postings, setPostings] = useState([])
}

useEffect(() => {
    async function fetchData() {
        const result = await fetch('http://localhost:3001/postings/applicant_id={:id}')
        const jsonResult = result.json()

        // some sort of method to convert the data to css and make it display on
    }

    fetchData()
}, [])
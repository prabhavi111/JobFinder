import React from 'react';
import dayjs from 'dayjs';

function JobCard(props) {
    const {
        title = 'No Title',
        company = 'No Company',
        type = 'Not Specified',
        experience = 'Not Specified',
        location = 'Unknown',
        postedOn = dayjs(), // Default to current date
        skills = [], // Default to an empty array
        job_link = '#'
    } = props;

    const date1 = dayjs(Date.now());
    const diffInDays = date1.diff(dayjs(postedOn), 'day');

    return (
        <div className='mx-40 mb-4'>
            <div className='flex justify-between items-center px-6 py-4 bg-zinc-200 rounded-md border border-black shadow-lg hover:border-blue-500 hover:translate-y-1 hover:scale-103'>
                <div className='flex flex-col items-start gap-3'>
                    <h1 className='text-lg font-semibold'>{title} - {company}</h1>
                    <p>{type} &#x2022; {experience} &#x2022; {location}</p>
                    <div className='flex items-center gap-2'>
                        {skills.length > 0 ? (
                            skills.map((skill, i) => (
                                <p key={i} className='text-gray-500 py-1 px-2 rounded-md border border-black'>{skill}</p>
                            ))
                        ) : (
                            <p className='text-gray-500 py-1 px-2 rounded-md border border-black'>No Skills Listed</p>
                        )}
                    </div>
                </div>
                <div className='flex items-center gap-4'>
                    <p className='text-gray-500'>Posted {diffInDays > 1 ? `${diffInDays} days` : `${diffInDays} day`} ago</p>
                    <a href={job_link} target="_blank" rel="noopener noreferrer">
                        <button className='text-blue-500 border border-blue-500 px-10 py-2 rounded-md'>Apply</button>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default JobCard;

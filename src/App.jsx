import React, { useState, useEffect } from 'react';
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import JobCard from "./components/JobCard";
import { collection, query, orderBy, where, getDocs } from "firebase/firestore";
import { db } from "./firebase.config";

function App() {
  const [jobs, setJobs] = useState([]);
  const [customSearch, setCustomSearch] = useState(false);
  const [filterValues, setFilterValues] = useState({
    title: "",
    location: "",
    experience: "",
    type: ""
  });

  const fetchJobs = async () => {
    setCustomSearch(false);
    try {
      const tempJobs = [];
      const jobsRef = collection(db, "jobs");
      const q = query(jobsRef, orderBy("postedOn", "desc"));
      const req = await getDocs(q);

      req.forEach((job) => {
        tempJobs.push({
          ...job.data(),
          id: job.id,
          postedOn: job.data().postedOn.toDate()
        });
      });
      setJobs(tempJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const fetchJobsCustom = async (jobCriteria) => {
    setCustomSearch(true);
    try {
      const tempJobs = [];
      const jobsRef = collection(db, "jobs");

      const conditions = [
        jobCriteria.title && where("title", "==", jobCriteria.title),
        jobCriteria.type && where("type", "==", jobCriteria.type),
        jobCriteria.experience && where("experience", "==", jobCriteria.experience),
        jobCriteria.location && where("location", "==", jobCriteria.location)
      ].filter(Boolean);

      const q = query(jobsRef, ...conditions, orderBy("postedOn", "desc"));
      const req = await getDocs(q);

      req.forEach((job) => {
        tempJobs.push({
          ...job.data(),
          id: job.id,
          postedOn: job.data().postedOn.toDate()
        });
      });
      setJobs(tempJobs);
    } catch (error) {
      console.error("Error fetching jobs with custom criteria:", error);
    }
  };

  const resetFilters = () => {
    setFilterValues({
      title: "",
      location: "",
      experience: "",
      type: ""
    });
    fetchJobs(); // Fetch jobs with default criteria
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <Navbar />
      <Header />
      <SearchBar 
        fetchJobsCustom={fetchJobsCustom} 
        filterValues={filterValues} 
        setFilterValues={setFilterValues} 
        resetFilters={resetFilters}
      />
      {customSearch && (
        <button onClick={resetFilters} className="flex pl-[1250px] mb-2">
          <p className="bg-blue-600 px-10 py-2 rounded-md text-white">Clear Filters</p>
        </button>
      )}
      {jobs.map((job) => (
        <JobCard key={job.id} {...job} />
      ))}
    </div>
  );
}

export default App;

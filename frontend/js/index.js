import 'bootstrap/dist/css/bootstrap.min.css'

import { getJobsList } from './api/jobs.js';
import { getJobDetailsById } from './api/jobs.js';

// your code goes here.

//7. Display jobs on the front end using the DOM; loop through the jobs that were fetched and display them in a card format.
//   You should be updating the element with the following HTML template.

// <li class="job-card card my-1" style="width: 18rem;">
//   <div class="card-header">JOB COMPANY HERE</div>
//   <div class="card-body">
//     <h5 class="card-title">JOB TITLE HERE</h5>
//     <h6 class="card-subtitle mb-2 text-body-secondary">JOB LOCATION HERE</h6>
//     <h6 class="card-subtitle mb-2 text-body-secondary">Posted FORMATTED JOB DATE HERE</h6>
//     <button class="btn btn-primary view-job-button" job-data-id="JOB ID HERE">View Job</button>
//   </div>
// </li>

//this function displays job like indeed, scrolling through a bunch of random jobs basically, plain and simple.
const renderJobs = (jobsData, ListElement) => {
    console.log(jobsData)
    //if we do have data, we loop through the jobs, so for each of our jobs with data, for each job do the fat code under..
    jobsData.forEach(job => {
        // += means to add jobs at the end of the list
        ListElement.innerHTML += `
    <li class="job-card card my-1" style="width: 18rem;">
        <div class="card-header">${job.company}</div>
        <div class="card-body">
            <h5 class="card-title">${job.title}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">${job.location}</h6>
            <h6 class="card-subtitle mb-2 text-body-secondary">Posted ${job.date_posted}</h6>
            <button class="btn btn-primary view-job-button" job-data-id="${job.id}">View Job</button>
        </div>
    </li>`;
    });
};

// 9. When the user clicks on the "View Job" button, make a GET request to the backend server to get the job details (this should be a function in the `api/jobs.js` file),
// and display the jobs on the front end using the DOM on the element with the id of `job-details-card`.
// - use the following HTML template to display the job details.

//in this function I am using the id from index.html and when the user clicks on view job, they get details about that job.
const renderJobDetails = (job) => {
    const jobCard = document.querySelector('#job-details-card');
    jobCard.innerHTML = `
    <div class="card">
  <div class="card-body">
    <h3 class="card-title">${job.title}</h5>
    <h4 class="card-subtitle mb-2 text-body-secondary pb-3">${job.company}</h6>
    <h6 class="card-subtitle mb-2 text-body-secondary ">${job.location}</h6>
    <h6 class="card-subtitle mb-2 text-body-secondary pb-3">Posted ${job.date_posted}</h6>
   
    <h5 class="card-subtitle mb-2">Description</h5>
    <p class="card-text">${job.description}</p>
    <h5 class="card-subtitle mb-2">Qualifications</h5>
    <p class="card-text">${job.qualifications}</p>
    <button class="btn btn-success save-job">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16">
        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
      </svg>
      Save Job
    </button>
  </div>
</div>`
}

//8. Add an event listener to the list of jobs that will allow the user to view the job details.
// Note:
// - Observe the `view-job-detail` class on the button; you'll need to use this to handle the event.
// - The job id is stored in the `job-data-id` attribute from the previous step.

//this function gets the joblist exported from jobs.js and renders it to the front end from the backend data
getJobsList().then((data) => {
    // //parent element because an event listener wont work on view-job-button because at first the page doesnt have this button
    //so it listens to a click hence Elistener. It listens to see if it has what we are looking for, in this case, .view-job-button
    //if it does, then we can proceed
    const jobsList = document.querySelector('#searched-jobs')
    //map returns an array and myarray is an array and with .map its gonna change the array every element and then the new array will be made
    //data.map((jobsData) => {
    renderJobs(data, jobsList)
    //})
    //this EListener is for the view jobs when its clicked on
    jobsList.addEventListener("click", viewJobDetailsButtonClicked) //this Elistener listens for a click, once clicked, function will take care of looking for  .view-job-button 
})

// created a function from event listener which takes an e (click) from the page
function viewJobDetailsButtonClicked(e) {
    // refers to clicked element and see's if it has view-job-button
    if (e.target.classList.contains('view-job-button')) {
        //get the jobID from the button
        const jobId = e.target.getAttribute('job-data-id');
        //get the details of job imported from jobs.js function
        getJobDetailsById(jobId).then((jobsData) => {
            //display job
            renderJobDetails(jobsData);
        });
    }
};




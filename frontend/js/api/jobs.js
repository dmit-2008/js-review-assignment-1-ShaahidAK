// your code goes here.
//function to get data from backend and break into template literal and replace them where needed to display jobs
const BASE_JOBS_URL = 'http://localhost:3000/jobs'

const getJobsList = (url = `${BASE_JOBS_URL}`) => {

    return fetch(url).then((response) => {
        return response.json();
    }).then((data) => {
        return data;
    })

}

//function to get job id but the twist is for the param we use the job id because we are looking for each job by its specific ID
const getJobDetailsById = (jobId) => {
    return fetch(`${BASE_JOBS_URL}/${jobId}`).then((response) => {
        return response.json();
    }).then((data) => {
        return data;
    })
}

export { getJobsList };
export { getJobDetailsById };
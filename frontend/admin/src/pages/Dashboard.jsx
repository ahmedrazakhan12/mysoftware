import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/images/yourlogo.png'
const Dashboard = () => {
  const [project , setProject] = useState([])
  const [users , setUsers] = useState([])
  const [task , setTask] = useState([])

 
  useEffect(() => {
    axios.get('http://localhost:5000/project/getAllProject')
    .then((res) => {
      setProject(res.data.totalItems);
      console.log("Logggings: ,.",res.data);
      
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:5000/task/tasks/`)

    .then((res) => {
      setTask(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);


  useEffect(() => {
    axios.get('http://localhost:5000/admin/team')
    .then((res) => {
      setUsers(res.data.admins)
      // console.log(res.data);
      ;
    })
    .catch((err) => {
      console.log(err);
    });
  }, []); 

  const [meeting , setMeeting] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:5000/meeting/getMeeting")
    .then((res) => {
      setMeeting(res.data);
      console.log("Meeting",res.data);
      
    })
    .catch((err) => {
      console.log(err);
    });
  },[])

  const [status , setStatus ] = useState([]);
  useEffect(()=>{
    axios.get("http://localhost:5000/projectStatus/getAllStatus")
    .then((res) => {
      console.log("Status",res.data);
      setStatus(res.data)
    })
    .catch((err) => {
      console.log(err);
    });
  },[])

  const [projectStatusCount , setProjectStatusCount] = useState([]);

  useEffect(()=>{
    // "http://pmgmgsolutions.online:5000"
    // http://pmgmgsolutions.online:5000
    axios.get("http://localhost:5000/project/projectStats")

    axios.get("http://localhost:5000/project/projectStats")
    .then((res) => {
      setProjectStatusCount(res.data)
    })
    .catch((err) => {
      console.log(err);
    });
  },[])

  const [taskStatusCount , setTaskStatusCount] = useState([]);
  useEffect(()=>{
    axios.get("http://localhost:5000/task/taskStats")
    .then((res) => {
      console.log("taskStats",res.data);
      setTaskStatusCount(res.data)
    })
    .catch((err) => {
      console.log(err);
    });
  },[])
  
  const [upcomingMeetings, setUpcomingMeetings] = useState([]);

useEffect(() => {
  axios.get('http://localhost:5000/meeting/upcommingMeetings')
    .then((res) => {
      setUpcomingMeetings(res.data);
      console.log("upcomingMeetings",res.data);
      
    })
    .catch((err) => {
      console.log(err);
    });
}, []);



const backgroundColors = [
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'dark',
];

const getRandomColorClass = () => {
  const colorIndex = Math.floor(Math.random() * backgroundColors.length);
  return `bg-label-${backgroundColors[colorIndex]}`;
};

  return (
    <>
    
     
    <div className="content-wrapper">
        <div className="container-fluid">
          <div className="col-lg-12 col-md-12 order-1">
            <div className="row mt-4">
              <div className="col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="card-title d-flex align-items-start justify-content-between">
                      <div className="avatar flex-shrink-0">
                        <i className="menu-icon tf-icons bx bx-briefcase-alt-2 bx-md text-success" />
                      </div>
                    </div>
                    <span className="fw-semibold d-block mb-1">Total Projects</span>
                    <h3 className="card-title mb-2">{project ? project : 0}</h3>
                    <Link to="/manage"><small className="text-success fw-semibold"><i className="bx bx-right-arrow-alt" />View More</small></Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="card-title d-flex align-items-start justify-content-between">
                      <div className="avatar flex-shrink-0">
                        <i className="menu-icon tf-icons bx bx-task bx-md text-primary" />
                      </div>
                    </div>
                    <span className="fw-semibold d-block mb-1">Total Tasks</span>
                    <h3 className="card-title mb-2">{task?.length}</h3>
                    <Link to={"/tasks"}><small className="text-primary fw-semibold"><i className="bx bx-right-arrow-alt" />View More</small></Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="card-title d-flex align-items-start justify-content-between">
                      <div className="avatar flex-shrink-0">
                        <i className="menu-icon tf-icons bx bxs-user-detail bx-md text-info" />
                      </div>
                    </div>
                    <span className="fw-semibold d-block mb-1">Total Users</span>
                    <h3 className="card-title mb-2"> {users?.length}</h3>
                    <Link to="/manageUsers"><small className="text-info fw-semibold"><i className="bx bx-right-arrow-alt" />View More</small></Link>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="card-title d-flex align-items-start justify-content-between">
                      <div className="avatar flex-shrink-0">
                        <i className="menu-icon tf-icons bx bx-shape-polygon  bx-md text-success" />
                      </div>
                    </div>
                    <span className="fw-semibold d-block mb-1">Total Meetings</span>
                    <h3 className="card-title mb-2"> {meeting?.length}</h3>
                    <Link to="/meeting"><small className="text-success fw-semibold"><i className="bx bx-right-arrow-alt" />View More</small></Link>
                  </div>
                </div>
              </div>
              {/* <div className="col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="card-title d-flex align-items-start justify-content-between">
                      <div className="avatar flex-shrink-0">
                        <i className="menu-icon tf-icons bx bxs-user-detail bx-md text-warning" />
                      </div>
                    </div>
                    <span className="fw-semibold d-block mb-1">Total Clients</span>
                    <h3 className="card-title mb-2">33</h3>
                    <a href="/users"><small className="text-warning fw-semibold"><i className="bx bx-right-arrow-alt" />View More</small></a>
                  </div>
                </div>
              </div> */}
              
            </div>


         

            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <div className="card overflow-hidden mb-4 ">
                  <div className="card-header pt-3 pb-1">
                    <div className="card-title ">
                      <h5 className="m-0 me-2">Project Statistics</h5>
                      {/* <br /> */}
                    </div>

                  </div>
                  <div className="card-body mt-2" id="project-statistics">
                    <ul className="p-0 mt-1 ">
                      {status.map((item, index) => (
                        <>
                          <li className="d-flex mb-4 pb-1">
                     
                        <div className="avatar flex-shrink-0 me-3">
                <span className={`avatar-initial rounded bg-label-${item.preview}`}>
                    <i className="bx bx-briefcase" />
                </span>
            </div>
                        <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                          <div className="me-2">
                              <h6 className="mb-0 text-capitalize">{item.status}</h6>
                          </div>
                          <div className="user-progress">
                          <small className="fw-semibold">
                          {
                          projectStatusCount && projectStatusCount.length > 0
                          ? projectStatusCount
                          .filter(project => project.status === item.id)
                          .reduce((acc, project) => acc + project.count, 0)
                          : 0
                          }

                            {/* {
                                projectStatusCount ? projectStatusCount
                                  .filter(project => project.status === item.id)
                                  .map(project => project.count) : 0
                              } */}
                            </small>

                          </div>
                        </div>
                      </li>
                    
                      </>
                      ))}
                      <li className="d-flex mb-4 pb-1">
                        <div className="avatar flex-shrink-0 me-3">
                          <span className="avatar-initial rounded bg-label-primary"><i className="bx bx-menu" /></span>
                        </div>
                        <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                          <div className="me-2">
                            <h5 className="mb-0">Total</h5>
                          </div>
                          <div className="user-progress">
                            <div className="status-count">
                              <h5 className="mb-0">
                              {
            projectStatusCount && projectStatusCount.length > 0
              ? projectStatusCount.reduce((total, project) => total + project.count, 0)
              : 0
          }
                              </h5>
                            </div>
                          </div>
                        </div>
                      </li>
                    
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <div className="card overflow-hidden mb-4 ">
                  <div className="card-header pt-3 pb-1">
                    <div className="card-title mb-0">
                      <h5 className="m-0 me-2">Task Statistics</h5>
                    </div>
                  
                  </div>
                  <div className="card-body mt-4" id="task-statistics">
                    <ul className="p-0 m-0">
                    {status.map((item, index) => (
                        <>
                          <li className="d-flex mb-4 pb-1">
                     
                        <div className="avatar flex-shrink-0 me-3">
                <span className={`avatar-initial rounded bg-label-${item.preview}`}>
                    <i className="bx bx-task" />
                </span>
            </div>
                        <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                          <div className="me-2">
                              <h6 className="mb-0 text-capitalize">{item.status}</h6>
                          </div>
                          <div className="user-progress">
                            <small className="fw-semibold">{
                          taskStatusCount && taskStatusCount.length > 0
                          ? taskStatusCount
                          .filter(project => project.status === item.id)
                          .reduce((acc, project) => acc + project.count, 0)
                          : 0
                          }</small>
                          </div>
                        </div>
                      </li>
                    
                      </>
                      ))}
                      <li className="d-flex mb-4 pb-1">
                        <div className="avatar flex-shrink-0 me-3">
                          <span className="avatar-initial rounded bg-label-primary"><i className="bx bx-menu" /></span>
                        </div>
                        <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                          <div className="me-2">
                            <h5 className="mb-0">Total</h5>
                          </div>
                          <div className="user-progress">
                            <div className="status-count">
                              <h5 className="mb-0">  {
            taskStatusCount && taskStatusCount.length > 0
              ? taskStatusCount.reduce((total, project) => total + project.count, 0)
              : 0
          }</h5>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
      <div className="card  mb-4 " style={{minHeight:'416px' , maxHeight:'416px'}}>
        <div className="card-header pt-3 pb-1">
          <div className="card-title mb-0">
        
        <h5 className="m-0 me-2">Upcoming Meetings  <span className='badge bg-success'>{upcomingMeetings?.length} </span></h5>
          </div>
        </div>
        <div className="card-body mt-4 overflow-scroll app-scroll" id="upcoming-meetings">
          {upcomingMeetings.length === 0 ? (
           <div>
            <div className='d-flex justify-content-center mt-5'>
              <img src="./assets/images/no-meeting.png"  alt=""  style={{width:'170px' , height:'170px' , objectFit:"contain" , pointerEvents:'none'}}/> 
            </div>
             <p className='text-center mt-4 text-muted'>No upcoming meetings.</p>
           </div>
          ) : (
            <ul className="p-0 mt-1">
              {upcomingMeetings.map((meeting) => {
                const colorClass = getRandomColorClass();
                return (
                  <li className="d-flex mb-4 pb-1" key={meeting.id}>
                    <div className="avatar flex-shrink-0 me-3">
                      <span className={`avatar-initial rounded ${colorClass}`}>
                        <i className="bx bx-calendar" />
                      </span>
                    </div>
                    <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                      <div className="me-2">
                        <h6 className="mb-0 text-capitalize">{meeting.title}</h6>
                        <small>{meeting.date} at {meeting.time}</small>
                      </div>
                      {meeting.link ? (
                        <div className="user-progress">
                          <a href={meeting.link} className="btn btn-sm btn-primary" target="_blank" rel="noopener noreferrer">
                            Join
                          </a>
                        </div>
                      ) : (
                        <div className="user-progress">
                          <button className="btn btn-sm btn-primary" disabled>
                            Join
                          </button>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
    
  )
}

export default Dashboard

// import React, { useEffect, useState } from 'react'
// import Navbar from '../components/Navbar'
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// const Dashboard = () => {
//   const [project , setProject] = useState([])
//   const [users , setUsers] = useState([])
//   const [task , setTask] = useState([])

 
//   useEffect(() => {
//     axios.get('http://localhost:5000/project/getAllProject')
//     .then((res) => {
//       setProject(res.data.totalItems);
//       console.log("Logggings: ,.",res.data);
      
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   }, []);

//   useEffect(() => {
//     axios.get(`http://localhost:5000/task/tasks/`)

//     .then((res) => {
//       setTask(res.data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   }, []);


//   useEffect(() => {
//     axios.get('http://localhost:5000/admin/team')
//     .then((res) => {
//       setUsers(res.data.admins)
//       // console.log(res.data);
//       ;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   }, []); 

//   const [meeting , setMeeting] = useState([]);

//   useEffect(()=>{
//     axios.get("http://localhost:5000/meeting/getMeeting")
//     .then((res) => {
//       setMeeting(res.data);
//       console.log("Meeting",res.data);
      
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   },[])
//   return (
//     <>
    
     
//     <div className="content-wrapper">
//         <div className="container-fluid">
//           <div className="col-lg-12 col-md-12 order-1">
//             <div className="row mt-4">
//               <div className="col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
//                 <div className="card">
//                   <div className="card-body">
//                     <div className="card-title d-flex align-items-start justify-content-between">
//                       <div className="avatar flex-shrink-0">
//                         <i className="menu-icon tf-icons bx bx-briefcase-alt-2 bx-md text-success" />
//                       </div>
//                     </div>
//                     <span className="fw-semibold d-block mb-1">Total Projects</span>
//                     <h3 className="card-title mb-2">{project ? project : 0}</h3>
//                     <Link to="/manage"><small className="text-success fw-semibold"><i className="bx bx-right-arrow-alt" />View More</small></Link>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
//                 <div className="card">
//                   <div className="card-body">
//                     <div className="card-title d-flex align-items-start justify-content-between">
//                       <div className="avatar flex-shrink-0">
//                         <i className="menu-icon tf-icons bx bx-task bx-md text-primary" />
//                       </div>
//                     </div>
//                     <span className="fw-semibold d-block mb-1">Total Tasks</span>
//                     <h3 className="card-title mb-2">{task?.length}</h3>
//                     <Link to={"/tasks"}><small className="text-primary fw-semibold"><i className="bx bx-right-arrow-alt" />View More</small></Link>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
//                 <div className="card">
//                   <div className="card-body">
//                     <div className="card-title d-flex align-items-start justify-content-between">
//                       <div className="avatar flex-shrink-0">
//                         <i className="menu-icon tf-icons bx bxs-user-detail bx-md text-info" />
//                       </div>
//                     </div>
//                     <span className="fw-semibold d-block mb-1">Total Users</span>
//                     <h3 className="card-title mb-2"> {users?.length}</h3>
//                     <Link to="/manageUsers"><small className="text-info fw-semibold"><i className="bx bx-right-arrow-alt" />View More</small></Link>
//                   </div>
//                 </div>
//               </div>

//               <div className="col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
//                 <div className="card">
//                   <div className="card-body">
//                     <div className="card-title d-flex align-items-start justify-content-between">
//                       <div className="avatar flex-shrink-0">
//                         <i className="menu-icon tf-icons bx bx-shape-polygon  bx-md text-success" />
//                       </div>
//                     </div>
//                     <span className="fw-semibold d-block mb-1">Total Meetings</span>
//                     <h3 className="card-title mb-2"> {meeting?.length}</h3>
//                     <Link to="/meeting"><small className="text-success fw-semibold"><i className="bx bx-right-arrow-alt" />View More</small></Link>
//                   </div>
//                 </div>
//               </div>
//               {/* <div className="col-lg-3 col-md-6 col-sm-6 col-12 mb-4">
//                 <div className="card">
//                   <div className="card-body">
//                     <div className="card-title d-flex align-items-start justify-content-between">
//                       <div className="avatar flex-shrink-0">
//                         <i className="menu-icon tf-icons bx bxs-user-detail bx-md text-warning" />
//                       </div>
//                     </div>
//                     <span className="fw-semibold d-block mb-1">Total Clients</span>
//                     <h3 className="card-title mb-2">33</h3>
//                     <a href="/users"><small className="text-warning fw-semibold"><i className="bx bx-right-arrow-alt" />View More</small></a>
//                   </div>
//                 </div>
//               </div> */}
              
//             </div>
//             {/* <div className="row">
//               <div className="col-md-4 col-sm-12">
//                 <div className="card overflow-hidden mb-4 statisticsDiv">
//                   <div className="card-header pt-3 pb-1">
//                     <div className="card-title mb-0">
//                       <h5 className="m-0 me-2">Project Statistics</h5>
//                     </div>
//                     <div className="my-3">
//                       <div id="projectStatisticsChart" />
//                     </div>
//                   </div>
//                   <div className="card-body" id="project-statistics">
//                     <ul className="p-0 m-0">
//                       <li className="d-flex mb-4 pb-1">
//                         <div className="avatar flex-shrink-0 me-3">
//                           <span className="avatar-initial rounded bg-label-primary"><i className="bx bx-briefcase-alt-2 text-primary" /></span>
//                         </div>
//                         <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
//                           <div className="me-2">
//                             <a href="/projects?status=1">
//                               <h6 className="mb-0">Started</h6>
//                             </a>
//                           </div>
//                           <div className="user-progress">
//                             <small className="fw-semibold">105</small>
//                           </div>
//                         </div>
//                       </li>
//                       <li className="d-flex mb-4 pb-1">
//                         <div className="avatar flex-shrink-0 me-3">
//                           <span className="avatar-initial rounded bg-label-primary"><i className="bx bx-briefcase-alt-2 text-danger" /></span>
//                         </div>
//                         <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
//                           <div className="me-2">
//                             <a href="/projects?status=0">
//                               <h6 className="mb-0">Default</h6>
//                             </a>
//                           </div>
//                           <div className="user-progress">
//                             <small className="fw-semibold">65</small>
//                           </div>
//                         </div>
//                       </li>
//                       <li className="d-flex mb-4 pb-1">
//                         <div className="avatar flex-shrink-0 me-3">
//                           <span className="avatar-initial rounded bg-label-primary"><i className="bx bx-briefcase-alt-2 text-info" /></span>
//                         </div>
//                         <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
//                           <div className="me-2">
//                             <a href="/projects?status=2">
//                               <h6 className="mb-0">On Going</h6>
//                             </a>
//                           </div>
//                           <div className="user-progress">
//                             <small className="fw-semibold">29</small>
//                           </div>
//                         </div>
//                       </li>
//                       <li className="d-flex mb-4 pb-1">
//                         <div className="avatar flex-shrink-0 me-3">
//                           <span className="avatar-initial rounded bg-label-primary"><i className="bx bx-briefcase-alt-2 text-warning" /></span>
//                         </div>
//                         <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
//                           <div className="me-2">
//                             <a href="/projects?status=59">
//                               <h6 className="mb-0">In Review</h6>
//                             </a>
//                           </div>
//                           <div className="user-progress">
//                             <small className="fw-semibold">14</small>
//                           </div>
//                         </div>
//                       </li>
//                       <li className="d-flex mb-4 pb-1">
//                         <div className="avatar flex-shrink-0 me-3">
//                           <span className="avatar-initial rounded bg-label-primary"><i className="bx bx-menu" /></span>
//                         </div>
//                         <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
//                           <div className="me-2">
//                             <h5 className="mb-0">Total</h5>
//                           </div>
//                           <div className="user-progress">
//                             <div className="status-count">
//                               <h5 className="mb-0">213</h5>
//                             </div>
//                           </div>
//                         </div>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-md-6 col-lg-4 col-xl-4 order-0 mb-4">
//                 <div className="card overflow-hidden mb-4 statisticsDiv">
//                   <div className="card-header pt-3 pb-1">
//                     <div className="card-title mb-0">
//                       <h5 className="m-0 me-2">Task Statistics</h5>
//                     </div>
//                     <div className="my-3">
//                       <div id="taskStatisticsChart" />
//                     </div>
//                   </div>
//                   <div className="card-body" id="task-statistics">
//                     <ul className="p-0 m-0">
//                       <li className="d-flex mb-4 pb-1">
//                         <div className="avatar flex-shrink-0 me-3">
//                           <span className="avatar-initial rounded bg-label-primary"><i className="bx bx-task text-warning" /></span>
//                         </div>
//                         <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
//                           <div className="me-2">
//                             <a href="/tasks/draggable?status=59">
//                               <h6 className="mb-0">In Review</h6>
//                             </a>
//                           </div>
//                           <div className="user-progress">
//                             <small className="fw-semibold">156</small>
//                           </div>
//                         </div>
//                       </li>
//                       <li className="d-flex mb-4 pb-1">
//                         <div className="avatar flex-shrink-0 me-3">
//                           <span className="avatar-initial rounded bg-label-primary"><i className="bx bx-task text-primary" /></span>
//                         </div>
//                         <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
//                           <div className="me-2">
//                             <a href="/tasks/draggable?status=1">
//                               <h6 className="mb-0">Started</h6>
//                             </a>
//                           </div>
//                           <div className="user-progress">
//                             <small className="fw-semibold">119</small>
//                           </div>
//                         </div>
//                       </li>
//                       <li className="d-flex mb-4 pb-1">
//                         <div className="avatar flex-shrink-0 me-3">
//                           <span className="avatar-initial rounded bg-label-primary"><i className="bx bx-task text-info" /></span>
//                         </div>
//                         <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
//                           <div className="me-2">
//                             <a href="/tasks/draggable?status=2">
//                               <h6 className="mb-0">On Going</h6>
//                             </a>
//                           </div>
//                           <div className="user-progress">
//                             <small className="fw-semibold">74</small>
//                           </div>
//                         </div>
//                       </li>
//                       <li className="d-flex mb-4 pb-1">
//                         <div className="avatar flex-shrink-0 me-3">
//                           <span className="avatar-initial rounded bg-label-primary"><i className="bx bx-task text-danger" /></span>
//                         </div>
//                         <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
//                           <div className="me-2">
//                             <a href="/tasks/draggable?status=0">
//                               <h6 className="mb-0">Default</h6>
//                             </a>
//                           </div>
//                           <div className="user-progress">
//                             <small className="fw-semibold">3</small>
//                           </div>
//                         </div>
//                       </li>
//                       <li className="d-flex mb-4 pb-1">
//                         <div className="avatar flex-shrink-0 me-3">
//                           <span className="avatar-initial rounded bg-label-primary"><i className="bx bx-menu" /></span>
//                         </div>
//                         <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
//                           <div className="me-2">
//                             <h5 className="mb-0">Total</h5>
//                           </div>
//                           <div className="user-progress">
//                             <div className="status-count">
//                               <h5 className="mb-0">352</h5>
//                             </div>
//                           </div>
//                         </div>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-md-6 col-lg-4 col-xl-4 order-0 mb-4">
//                 <div className="card overflow-hidden mb-4 statisticsDiv">
//                   <div className="card-header pt-3 pb-1">
//                     <div className="card-title d-flex justify-content-between mb-0">
//                       <h5 className="m-0 me-2">Todos Overview</h5>
//                       <div>
//                         <span data-bs-toggle="modal" data-bs-target="#create_todo_modal"><a href="javascript:void(0);" className="btn btn-sm btn-primary" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-original-title="Create Todo"><i className="bx bx-plus" /></a></span>
//                         <a href="/todos"><button type="button" className="btn btn-sm btn-primary" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="View More"><i className="bx bx-list-ul" /></button></a>
//                       </div>
//                     </div>
//                     <div className="my-3">
//                       <div id="todoStatisticsChart" />
//                     </div>
//                   </div>
//                   <div className="card-body" id="todos-statistics">
//                     <ul className="p-0 m-0">
//                       <li className="d-flex mb-4 pb-1">
//                         <div className="avatar flex-shrink-0">
//                           <input type="checkbox" id={207} onclick="update_status(this)" name={207} reload="true" className="form-check-input mt-0" defaultChecked />
//                         </div>
//                         <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
//                           <div className="me-2">
//                             <div className="d-flex align-items-center justify-content-between">
//                               <h6 className="mb-0 striked" id="207_title">adasd</h6>
//                               <div className="user-progress d-flex align-items-center gap-1">
//                                 <a href="javascript:void(0);" className="edit-todo" data-bs-toggle="modal" data-bs-target="#edit_todo_modal" data-id={207} title="Update"><i className="bx bx-edit mx-1" /></a>
//                                 <a href="javascript:void(0);" className="delete" data-id={207} data-type="todos" title="Delete"><i className="bx bx-trash text-danger mx-1" /></a>
//                               </div>
//                             </div>
//                             <small className="text-muted d-block my-1">July 07, 2024 18:05:42</small>
//                           </div>
//                         </div>
//                       </li>
//                       <li className="d-flex mb-4 pb-1">
//                         <div className="avatar flex-shrink-0">
//                           <input type="checkbox" id={204} onclick="update_status(this)" name={204} reload="true" className="form-check-input mt-0" defaultChecked />
//                         </div>
//                         <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
//                           <div className="me-2">
//                             <div className="d-flex align-items-center justify-content-between">
//                               <h6 className="mb-0 striked" id="204_title">waqas</h6>
//                               <div className="user-progress d-flex align-items-center gap-1">
//                                 <a href="javascript:void(0);" className="edit-todo" data-bs-toggle="modal" data-bs-target="#edit_todo_modal" data-id={204} title="Update"><i className="bx bx-edit mx-1" /></a>
//                                 <a href="javascript:void(0);" className="delete" data-id={204} data-type="todos" title="Delete"><i className="bx bx-trash text-danger mx-1" /></a>
//                               </div>
//                             </div>
//                             <small className="text-muted d-block my-1">July 03, 2024 19:22:43</small>
//                           </div>
//                         </div>
//                       </li>
//                       <li className="d-flex mb-4 pb-1">
//                         <div className="avatar flex-shrink-0">
//                           <input type="checkbox" id={203} onclick="update_status(this)" name={203} reload="true" className="form-check-input mt-0" defaultChecked />
//                         </div>
//                         <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
//                           <div className="me-2">
//                             <div className="d-flex align-items-center justify-content-between">
//                               <h6 className="mb-0 striked" id="203_title">rtr</h6>
//                               <div className="user-progress d-flex align-items-center gap-1">
//                                 <a href="javascript:void(0);" className="edit-todo" data-bs-toggle="modal" data-bs-target="#edit_todo_modal" data-id={203} title="Update"><i className="bx bx-edit mx-1" /></a>
//                                 <a href="javascript:void(0);" className="delete" data-id={203} data-type="todos" title="Delete"><i className="bx bx-trash text-danger mx-1" /></a>
//                               </div>
//                             </div>
//                             <small className="text-muted d-block my-1">July 03, 2024 06:39:13</small>
//                           </div>
//                         </div>
//                       </li>
//                       <li className="d-flex mb-4 pb-1">
//                         <div className="avatar flex-shrink-0">
//                           <input type="checkbox" id={202} onclick="update_status(this)" name={202} reload="true" className="form-check-input mt-0" defaultChecked />
//                         </div>
//                         <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
//                           <div className="me-2">
//                             <div className="d-flex align-items-center justify-content-between">
//                               <h6 className="mb-0 striked" id="202_title">test</h6>
//                               <div className="user-progress d-flex align-items-center gap-1">
//                                 <a href="javascript:void(0);" className="edit-todo" data-bs-toggle="modal" data-bs-target="#edit_todo_modal" data-id={202} title="Update"><i className="bx bx-edit mx-1" /></a>
//                                 <a href="javascript:void(0);" className="delete" data-id={202} data-type="todos" title="Delete"><i className="bx bx-trash text-danger mx-1" /></a>
//                               </div>
//                             </div>
//                             <small className="text-muted d-block my-1">July 03, 2024 06:07:13</small>
//                           </div>
//                         </div>
//                       </li>
//                       <li className="d-flex mb-4 pb-1">
//                         <div className="avatar flex-shrink-0">
//                           <input type="checkbox" id={198} onclick="update_status(this)" name={198} reload="true" className="form-check-input mt-0" defaultChecked />
//                         </div>
//                         <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
//                           <div className="me-2">
//                             <div className="d-flex align-items-center justify-content-between">
//                               <h6 className="mb-0 striked" id="198_title">as fast as possible</h6>
//                               <div className="user-progress d-flex align-items-center gap-1">
//                                 <a href="javascript:void(0);" className="edit-todo" data-bs-toggle="modal" data-bs-target="#edit_todo_modal" data-id={198} title="Update"><i className="bx bx-edit mx-1" /></a>
//                                 <a href="javascript:void(0);" className="delete" data-id={198} data-type="todos" title="Delete"><i className="bx bx-trash text-danger mx-1" /></a>
//                               </div>
//                             </div>
//                             <small className="text-muted d-block my-1">June 30, 2024 06:08:53</small>
//                           </div>
//                         </div>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div> */}
//           </div>
//         </div>
//       </div>
//     </>
    
//   )
// }

// export default Dashboard

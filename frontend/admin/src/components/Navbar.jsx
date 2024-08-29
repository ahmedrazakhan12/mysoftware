import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
// import Image from "../assets/images/gmg-not.png"
import Notify from '../assets/audio/notify.wav';

const Navbar = () => {
  const { setIsMenuExpanded, isMenuExpanded } = useAppContext();
  const [data, setData] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const activeId = localStorage.getItem("id");
  // const location = useLocation();


  const {
    socket ,
    appNotification,
    setAppNotification,
    notifyLength,
    setnotifyLength,
    notify , setNotify,
    location
  } = useAppContext();

  useEffect(() => {
    if (!activeId) {
      navigate("/login"); // Redirect to login
    } else {
      axios
        .get(`http://localhost:5000/admin/adminInfo/`, {
          headers: { Authorization: `${activeId}` },
        })
        .then((res) => {
          setData(res.data);
          console.log("Navbar: ", res.data);
        })
        .catch((err) => {
          console.error(err);
          if (err.response && err.response.status === 404) {
            navigate("/login"); // Redirect to login on 404
          }
        });
    }

    socket.on('notification', (data ) => {
      console.log("Notification: ", data ,);

      if(Number(data.fromId) === Number(activeId)){
        return
      }
      if(Number(data.loggedUser.id) === Number(activeId)){
        return
      }
      console.log("data.groupId" , data.groupId , "id: " , location);

      if(data.groupId.pathname == location.pathname ){
        return
      }
      setNotifications((prevNotifications) => [
        { ...data, read: 0 },
        ...prevNotifications,
      ]);
      

      if ("Notification" in window) {
        // Request permission to show notifications
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            const capitalizedText = data?.loggedUser?.groupName?.text || data.text
              .split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');

              const capitalizedText2 = data?.loggedUser?.groupName?.groupName || data.loggedUser.name
              .split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
      
            // Create an image object
            const image = new Image();
            image.crossOrigin = "Anonymous"; // Allow cross-origin requests
            // image.src = data.loggedUser.pfpImage;
            image.src =data?.loggedUser?.groupName?.groupImage || data?.loggedUser?.pfpImage ;
            // When the image loads, draw it to a canvas and make it circular
            image.onload = () => {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
      
              const size = Math.min(image.width, image.height);
              canvas.width = size;
              canvas.height = size;
      
              // Calculate the aspect ratio and cropping coordinates for object-fit: cover
              const imgAspectRatio = image.width / image.height;
              const canvasAspectRatio = canvas.width / canvas.height;
              let sx, sy, sWidth, sHeight;
      
              if (imgAspectRatio > canvasAspectRatio) {
                sHeight = image.height;
                sWidth = image.height * canvasAspectRatio;
                sx = (image.width - sWidth) / 2;
                sy = 0;
              } else {
                sWidth = image.width;
                sHeight = image.width / canvasAspectRatio;
                sx = 0;
                sy = (image.height - sHeight) / 2;
              }
      
              // Draw the circular cropped image
              ctx.beginPath();
              ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
              ctx.closePath();
              ctx.clip();
      
              ctx.drawImage(image, sx, sy, sWidth, sHeight, 0, 0, size, size);
      
              // Convert the canvas to a data URL
              const circularImage = canvas.toDataURL();
      
              // Show notification with the circular image
              new Notification(capitalizedText2, {
                body: capitalizedText,
                icon: circularImage, // Circular icon with object-fit: cover effect
              });
      
              // Play custom sound
              const audio = new Audio(Notify);
              audio.play().catch(error => {
                console.error("Playback failed:", error);
              });
            };
      
            image.onerror = (error) => {
              console.error("Image load failed:", error);
            };
          }
        });
      }
      
      
      
      // if ("Notification" in window) {

      //   // Request permission to show notifications
      //   Notification.requestPermission().then((permission) => {
      //     if (permission === "granted") {
      //       const capitalizedText = data.text
      //         .split(' ')
      //         .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      //         .join(' ');
      
      //       // Show notification with an image
      //       new Notification("Gmg Solutions", {
      //         body: capitalizedText,
      //         icon: data.loggedUser.pfpImage, // Icon for the notification
      //         // image: Image // Image for the notification
      //       });
      
      //       // Play custom sound
      //       const audio = new Audio(Notify);
      //       audio.play().catch(error => {
      //         console.error("Playback failed:", error);
      //       });
      //     }
      //   });
      // }
  // Check if the browser supports notifications
      // if ("Notification" in window) {
      //   // Request permission to show notifications
      //   Notification.requestPermission().then((permission) => {
      //     if (permission === "granted") {
      //       // Show notification
      //       new Notification("Gmg Solutions", {
      //         body: `${data.text}`,
      //       });
      //     }
      //   });
      // }
      // if ("Notification" in window) {
      //   // Request permission to show notifications
      //   Notification.requestPermission().then((permission) => {
      //     if (permission === "granted") {
      //       const capitalizedText = data.text
      //       .split(' ')
      //       .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      //       .join(' ');
      //       // Show notification with an image
      //       new Notification("Gmg Solutions", {
      //         body: capitalizedText,
      //         // icon: 'https://example.com/path/to/icon.png', // Icon for the notification
      //         image: Image // Image for the notification
      //       });
      //     }
      //   });
      // }
      
    });

    // Cleanup on component unmount
    return () => {
      socket.off('notification');
    };
  }, [activeId, navigate, socket]);

  const [dbNotifications, setDbNotifications] = useState([]);

  const fetchNotifications = () => {
    axios.get(`http://localhost:5000/notify/getNotification/${localStorage.getItem("id")}`)
        .then((res) => {
          
          console.log("fetchNotifications: ", res.data.data);
          
          setDbNotifications(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
};



console.log("appNotification" , appNotification);

  function formatTime(datetimeString) {
    // Convert the string to a Date object
    let dateObj = new Date(datetimeString);
  
    // Extract hours and minutes
    let hours = dateObj.getHours();
    let minutes = dateObj.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
  
    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
  
    // Add leading zero to minutes if needed
    minutes = minutes < 10 ? '0' + minutes : minutes;
  
    // Return formatted time as a string
    return `${hours}:${minutes} ${ampm}`;
  }
  
  function extractDate(datetimeString) {
    // Convert the string to a Date object
    let dateObj = new Date(datetimeString);
  
    // Extract the month, date, and year
    let month = dateObj.getMonth() + 1; // Months are 0-based in JavaScript
    let day = dateObj.getDate();
    let year = dateObj.getFullYear();
  
    // Add leading zero to month and day if needed
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
  
    // Return formatted date as a string
    return `${month}/${day}/${year}`;
  }
  
      
  // const [currentItems, setCurrentItems] = useState([]);
  //   useEffect(() => {
  //       axios.get(`http://localhost:5000/notify/getNotification/${localStorage.getItem("id")}`)
  //       .then((res) => {
  //         const limitedNotifications = res.data.data.slice(0, 4);
  //         setCurrentItems(limitedNotifications);
  //           console.log(res.data);
            
  //       })
  //       .catch((err) => {
  //           console.log(err);
  //       })
  //   },[])
  const getLimitedNotifications = () => {
    // Combine socket and DB notifications
    const combinedNotifications = [
      ...notifications,
      ...dbNotifications
    ];

    // Limit to 10 notifications, prioritizing socket notifications
    return combinedNotifications.slice(0, 10);
  };

  const limitedNotifications = getLimitedNotifications();
  //   useEffect(() => {
   
  // },[])
  setnotifyLength( notify + notifications?.length )
  const handleRead = () => {
    setNotifications([]);
    setNotify(0)
    fetchNotifications();
   
    axios.put(`http://localhost:5000/notify/readNotification/${localStorage.getItem("id")}`)
    .then((res) => {
        console.log(res.data);
    })
    .catch((err) => {
        console.log(err);
    });
  }
  const handleLogout = () => {
    // Ensure the socket is disconnected
    if (socket) {
        socket.disconnect();
    }

    // Clear local storage and navigate to login
    localStorage.removeItem("token");
    localStorage.clear();
    navigate("/login");
};
const fetchlength = ()=>{
  axios.get(`http://localhost:5000/notify/unreadNotification/${activeId}`)
  .then((res)=>{
    setNotify(res.data.unreadCount)
    console.log("notify",res.data);
  })
  .catch((err)=>{
    console.log(err)
  })
}
useEffect(() => {
  fetchlength()
},[activeId ])


useEffect(() => {
  fetchNotifications();
} , [])

const handleReadNotifications = (id , route) => {

  navigate(route)


  axios.put(`http://localhost:5000/notify/readNotification/${localStorage.getItem("id")}`, 
  {
      textId: id
  })
  .then((res) => {
  setNotifications([]);
  // setNotify(0)
  // setDbNotifications([])
  fetchNotifications();
  fetchlength()

  // 
      console.log(res.data);
  })
  .catch((err) => {
      console.log(err);
  }); 
}

useEffect(() => {
  // Clear socket notifications when the route changes
  setNotifications([]);
  
  // Fetch database notifications
  fetchNotifications();

  // Optionally, refetch the unread notifications count
  fetchlength();
  
  // Cleanup socket listener on unmount
  return () => {
    socket.off('notification');
  };
}, [location]);

  return (
    <>
      {/* Navbar */}
      <div id="section-not-to-print" style={{ zIndex: "10" }}>
        <nav
          className="layout-navbar container-fluid navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
          id="layout-navbar"
        >
          
          <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
            <a
              className="nav-item nav-link px-0 me-xl-4"
              href="javascript:void(0)"
              onClick={() => setIsMenuExpanded(!isMenuExpanded)}
            >
              <i className="bx bx-menu bx-sm" />
            </a>
          </div>
          <div
            className="navbar-nav-right d-flex align-items-center"
            id="navbar-collapse"
          >
            <div className="nav-item">
              {/* <i className="bx bx-search" /> */}
              {/* <span id="global-search" /> */}
              Welcome 👋, <b className="text-capitalize">{data?.name}</b>, to GMG Solutions' System!
            </div>
            <ul className="navbar-nav flex-row align-items-center ms-auto">
              <li className="nav-item navbar-dropdown dropdown">
                <a
                  className="nav-link dropdown-toggle hide-arrow cursor-pointer"
                  data-bs-toggle="dropdown"
                >
                  <i className="bx bx-bell bx-sm" />
                  <span
                    id="unreadNotificationsCount"
                    className={`badge rounded-pill badge-center h-px-20 w-px-20 bg-danger ${
                      notifications?.length === 0 ? "d-none" : ""
                    }`}
                  >
                    {notify + notifications?.length}
                    
                  </span>
                  <span
                    id="unreadNotificationsCount"
                    className={`badge rounded-pill badge-center h-px-20 w-px-20 bg-danger ${
                      notifications?.length === 0 ? "" : "d-none"
                    }`}
                  >
                    { notify}
                    
                  </span>
                </a>
                <ul className="dropdown-menu dropdown-menu-end app-scroll" style={{minHeight:'60vh' }}>
                <li className="dropdown-header dropdown-header-highlighted">
                  <i className="bx bx-bell bx-md me-2" />
                  Notifications
                </li>
                <li>
                  <div className="dropdown-divider" />
                </li>
                <div id="unreadNotificationsContainer" className="app-scroll" style={{height:'300px', overflowX:'hidden' , overflowY:'scroll'}}>
                  {limitedNotifications?.length === 0 ? (
                    <li className="p-5 d-flex align-items-center justify-content-center">
                      <span>No Unread Notifications!</span>
                    </li>
                  ) : (
                    limitedNotifications.map((notification, index) => (
                      <React.Fragment key={index}>
                        <li style={{borderBottom:'1px solid #ccc' }} onClick={() => handleReadNotifications(notification?.id , notification?.route)} className={notification.read === 0 ? `unread p-3 cursor-pointer mb-1` : 'mb-1 p-3 cursor-pointer'}>
                          <p>
                        

                            <div className="row">
                              <div className="col-4">
                            {/* <b className="text-capitalize">
                              {index + 1}.
                            </b>{" "} */}
                                <img src={notification?.loggedUser?.groupName?.groupImage || notification?.loggedUser?.pfpImage} alt="" className="rounded-circle me-2" style={{objectFit:'cover' , width:'45px' , height:'45px'}}/>
                              </div>
                              <div style={{marginLeft:'-60px'}} className="col">
                                <b className="text-capitalize">{notification?.loggedUser?.groupName?.groupName || notification?.loggedUser?.name}</b><br />
                                <b  className="text-capitalize" style={{fontWeight:'600'}}>
                                  {notification.text}
                                </b>
                              </div>
                            </div>
                          </p>
                         <div className="mb-2" style={{paddingBottom:'1px'}}>
                         <small className="text-capitalize float-start">
                            {/* {extractDate(notification?.time)} */}
                          </small>
                          <small className="text-capitalize float-end">
                            {notification?.timeAgo || 'Just now'}
                            {/* {formatTime(notification?.time)} */}
                          </small>
                         </div>
                          
                        </li>
                      </React.Fragment>
                    ))
                  )}
                  <li>{/* <div className="dropdown-divider" /> */}</li>
                </div>
                {limitedNotifications?.length > 0 && (
                  <>
                    <li className="d-flex justify-content-between">
                      <a
                        href="#"
                        className="p-3 text-end"
                        id="mark-all-notifications-as-read"

                      >
                        {/* <b>Mark All as Read</b> */}
                      </a>
                      <Link to="/notifications" className="p-3">
                        <b>View All</b>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
              </li>

              {/* User */}
              <li className="nav-item navbar-dropdown dropdown">
                <a
                  className="nav-link dropdown-toggle hide-arrow"
                  href="javascript:void(0);"
                  data-bs-toggle="dropdown"
                >
                  <div className="avatar avatar-online">
                    <img
                      src={data?.pfpImage}
                      alt=""
                      className=" rounded-circle"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <a className="dropdown-item" href="#">
                      <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                          <div className="avatar avatar-online">
                            <img
                              src={data?.pfpImage}
                              alt=""
                              className="  rounded-circle"
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <span className="fw-semibold d-block text-capitalize">
                            {data?.name}
                          </span>
                          <small className="text-muted m-0 p-0">
                            {data?.email}
                          </small>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <div className="dropdown-divider" />
                  </li>
                  <li>
                    <Link to={"/profile"} className="dropdown-item">
                      <i className="bx bx-user me-2" />
                      <span className="align-middle">My Profile</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/general">
                      <i className="bx bx-cog me-2" />
                      <span className="align-middle">Preferences</span>
                    </Link>
                  </li>
                  <li>
                    <div className="dropdown-divider" />
                  </li>
                  <li>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="btn btn-sm btn-outline-danger"
                      >
                        <i className="bx bx-log-out-circle" /> Logout
                      </button>
                  </li>
                </ul>
              </li>
              {/*/ User */}
            </ul>
          </div>
        </nav>
      </div>
      {/* / Navbar */}
    </>
  );
};

export default Navbar;

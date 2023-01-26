import React from "react";
import { useNavigate } from "react-router-dom";
import Style from "./Style.module.css";
const NotFound = () => {
  const navigate = useNavigate()
  return (
    
    <div className="bg-purple" style={{height:"100vh"}}>
     
      <div className="stars">
        <div className="custom-navbar">
          <div className="brand-logo" style={{ margin:"40px"}}>
            
            <img src="http://salehriaz.com/404Page/img/logo.svg" width="80px" />
          </div>
          
        </div>
        <div className="central-body">
          <img
            className="image-404"
            src="http://salehriaz.com/404Page/img/404.svg"
            width="300px"
          />
          
        </div>
        <div className="objects">
          <img
            className="object_rocket"
            src="http://salehriaz.com/404Page/img/rocket.svg"
            width="40px"
          />
        </div>
      </div>
      <div style={{color:"lightgreen",fontSize:"20px",paddingTop:"120px"}}>
      <a  className="btn-go-home" onClick={()=>navigate("/")} style={{color:"black",fontSize:"20px",paddingTop:"20px"}}>
            GO BACK HOME
          </a></div>
          
    </div>
  );
};

export default NotFound;

// import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NotFoundMessage } from "./not-found.styles";

const NotFound = () => {
  const navigate = useNavigate();

  // //*fixme
  
  // useEffect(() => {
  //   setTimeout(() => {
  //    navigate('/');
  //   }, 1500);
  // }, [navigate]);

  return (
    <NotFoundMessage />
  )
};

export default NotFound;
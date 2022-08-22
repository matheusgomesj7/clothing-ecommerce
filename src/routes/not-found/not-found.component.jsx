import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NotFoundMessage } from "./not-found.styles";

const NotFound = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    setTimeout(() => {
     navigate('/clothing-ecommerce');
    }, 1500);
  }, [navigate]);

  return (
    <NotFoundMessage />
  )
};

export default NotFound;
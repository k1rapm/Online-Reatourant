import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "./token";

const ProtectedRout = (props) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const role = getToken()["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  useEffect(() => {
    if (!token) {
      return navigate("/");
    }
  }, [navigate, token]);
  useEffect(() => { 
    if (role == "User") { 
      return navigate("/catalog")
    }
  },[navigate,role])
  return props.children;
};

export default ProtectedRout;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LogoutPage({ onLogout }) {
  const navigate = useNavigate();
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  function logout() {
    onLogout();
    setIsLoggedOut(true);
    navigate("/login");
  }

  function goToCourses() {
    navigate("/courses");
  }
  return (
    <>
      <div>
        {isLoggedOut ? (
          <>
            <h2>You logout successfully!</h2>
            <p>Click Login to login again!</p>
          </>
        ) : (
          <>
            <h2>Are you sure want to log out?</h2>
            <button onClick={logout}>Yes</button>
            <button onClick={goToCourses}>No</button>
          </>
        )}
      </div>
    </>
  );
}

export default LogoutPage;

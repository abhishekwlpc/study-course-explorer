import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function setLoginCreedintials(e) {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }

  function submitCredintails(e) {
    e.preventDefault();
    onLogin();
    navigate("/courses");

    console.log("Email:", email);
    console.log("Password:", password);

    setEmail("");
    setPassword("");
  }

  return (
    <>
      <div>
        <form onSubmit={submitCredintails}>
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={setLoginCreedintials}
            required
          />
          <br />
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={setLoginCreedintials}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}

export default LoginPage;

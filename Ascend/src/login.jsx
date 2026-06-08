import { useState } from "react";
import './login.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Signing in as ${email}`);
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Welcome!</h2>
      <p className="login-sub">Sign in to continue your journey</p>

      <form onSubmit={handleSubmit}>
        <div className="login-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="login-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Sign In</button>
      </form>

      <p className="login-signup">New here? <a href="#">Create an account</a></p>
    </div>
  );
}
import { useState } from "react";

const topoPath = (
  <svg
    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.18 }}
    viewBox="0 0 500 600"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
  >
    <g fill="none" stroke="#a8d8e8" strokeWidth="1">
      <ellipse cx="250" cy="300" rx="220" ry="260" />
      <ellipse cx="250" cy="300" rx="195" ry="230" />
      <ellipse cx="250" cy="300" rx="170" ry="200" />
      <ellipse cx="250" cy="300" rx="145" ry="170" />
      <ellipse cx="250" cy="300" rx="120" ry="140" />
      <ellipse cx="250" cy="300" rx="95" ry="110" />
      <ellipse cx="250" cy="300" rx="70" ry="80" />
      <ellipse cx="250" cy="300" rx="45" ry="50" />
      <ellipse cx="250" cy="300" rx="22" ry="25" />
      <ellipse cx="60" cy="120" rx="100" ry="85" />
      <ellipse cx="60" cy="120" rx="80" ry="65" />
      <ellipse cx="60" cy="120" rx="60" ry="48" />
      <ellipse cx="60" cy="120" rx="40" ry="32" />
      <ellipse cx="430" cy="500" rx="130" ry="110" />
      <ellipse cx="430" cy="500" rx="105" ry="88" />
      <ellipse cx="430" cy="500" rx="80" ry="66" />
      <ellipse cx="430" cy="500" rx="55" ry="44" />
    </g>
  </svg>
);

export default function AscendLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ripples, setRipples] = useState([]);

  const handleRipple = (e) => {
    const btn = e.currentTarget.getBoundingClientRect();
    const size = Math.max(btn.width, btn.height);
    const x = e.clientX - btn.left - size / 2;
    const y = e.clientY - btn.top - size / 2;
    const id = Date.now();
    setRipples((r) => [...r, { id, x, y, size }]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 600);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Signing in as ${email}`);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&display=swap');

        .ascend-root * { box-sizing: border-box; margin: 0; padding: 0; }

        .ascend-root {
          font-family: 'Cormorant Garamond', serif;
          display: flex;
          min-height: 100vh;
          background: #0d2433;
        }

        /* LEFT */
        .ascend-left {
          width: 48%;
          position: relative;
          background: #1a4a5c;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .ascend-left-content {
          position: relative;
          z-index: 2;
          padding: 3rem;
          color: #e8f4f7;
        }
        .ascend-brand {
          font-family: 'Caveat', cursive;
          font-size: clamp(3.5rem, 6vw, 5.5rem);
          font-weight: 600;
          line-height: 1;
          color: #e8f4f7;
          animation: fadeUp 0.8s ease both;
        }
        .ascend-line {
          width: 40px;
          height: 2px;
          background: #4eb8c8;
          margin: 1.2rem 0;
          animation: expandLine 0.7s 0.3s ease both;
          transform-origin: left;
        }
        .ascend-tagline {
          font-style: italic;
          font-weight: 300;
          font-size: 1rem;
          color: rgba(232,244,247,0.75);
          max-width: 220px;
          line-height: 1.6;
          animation: fadeUp 0.8s 0.15s ease both;
        }

        /* RIGHT */
        .ascend-right {
          flex: 1;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem 2.5rem;
          position: relative;
          overflow: hidden;
        }
        .ascend-right::before {
          content: '';
          position: absolute;
          top: -80px; right: -80px;
          width: 260px; height: 260px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(78,184,200,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .ascend-avatar {
          position: absolute;
          top: 2rem; right: 2rem;
          width: 38px; height: 38px;
          border-radius: 50%;
          background: #f0f4f6;
          border: 1.5px solid #d0dde3;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* FORM BOX */
        .ascend-box {
          width: 100%;
          max-width: 340px;
          animation: fadeUp 0.7s 0.1s ease both;
        }
        .ascend-welcome {
          font-family: 'Caveat', cursive;
          font-size: 1.9rem;
          font-weight: 600;
          color: #1a3a4a;
        }
        .ascend-sub {
          font-style: italic;
          font-weight: 300;
          font-size: 0.95rem;
          color: #8faab5;
          margin: 0.3rem 0 2rem;
        }
        .ascend-label {
          display: block;
          font-size: 0.78rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #4a6a78;
          margin-bottom: 0.45rem;
        }
        .ascend-input {
          width: 100%;
          padding: 0.72rem 1rem;
          background: #f0f4f6;
          border: 1.5px solid #d0dde3;
          border-radius: 10px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem;
          color: #1a3a4a;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .ascend-input:focus {
          border-color: #4eb8c8;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(78,184,200,0.12);
        }
        .ascend-input::placeholder { color: #b0c4cc; font-style: italic; }
        .ascend-group { margin-bottom: 1.1rem; }
        .ascend-forgot {
          display: block;
          text-align: right;
          font-size: 0.82rem;
          font-style: italic;
          color: #4eb8c8;
          margin-top: 0.3rem;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
          font-family: 'Cormorant Garamond', serif;
          transition: color 0.2s;
        }
        .ascend-forgot:hover { color: #1a4a5c; }

        /* BUTTON */
        .ascend-btn {
          width: 100%;
          margin-top: 1.6rem;
          padding: 0.82rem 1rem;
          background: linear-gradient(135deg, #1a4a5c 0%, #1e5568 100%);
          color: #e8f4f7;
          border: none;
          border-radius: 10px;
          font-family: 'Caveat', cursive;
          font-size: 1.25rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 6px 20px rgba(26,74,92,0.28);
        }
        .ascend-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(26,74,92,0.35);
        }
        .ascend-btn:active { transform: translateY(0); }

        .ascend-ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          animation: ripple 0.55s linear forwards;
          pointer-events: none;
        }

        /* DIVIDER */
        .ascend-divider {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin: 1.5rem 0;
          color: #8faab5;
          font-size: 0.78rem;
          font-style: italic;
        }
        .ascend-divider::before,
        .ascend-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #d0dde3;
        }

        .ascend-signup {
          text-align: center;
          font-size: 0.88rem;
          color: #8faab5;
          font-style: italic;
        }
        .ascend-signup a {
          color: #1a4a5c;
          font-style: normal;
          border-bottom: 1px solid #4eb8c8;
          padding-bottom: 1px;
          text-decoration: none;
          transition: color 0.2s;
          cursor: pointer;
        }
        .ascend-signup a:hover { color: #4eb8c8; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes expandLine {
          from { transform: scaleX(0); opacity: 0; }
          to   { transform: scaleX(1); opacity: 1; }
        }
        @keyframes ripple {
          to { transform: scale(4); opacity: 0; }
        }

        @media (max-width: 600px) {
          .ascend-left { display: none; }
          .ascend-right { padding: 2rem 1.5rem; }
        }
      `}</style>

      <div className="ascend-root">
        {/* LEFT */}
        <div className="ascend-left">
          {topoPath}
          <div className="ascend-left-content">
            <div className="ascend-brand">Ascend</div>
            <div className="ascend-line" />
            <div className="ascend-tagline">Every thought recorded is a step upward.</div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="ascend-right">
          <div className="ascend-avatar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4a6a78" strokeWidth="1.8">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </div>

          <form className="ascend-box" onSubmit={handleSubmit}>
            <div className="ascend-welcome">Welcome back.</div>
            <div className="ascend-sub">Sign in to continue your journey</div>

            <div className="ascend-group">
              <label className="ascend-label">Email</label>
              <input
                className="ascend-input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="ascend-group">
              <label className="ascend-label">Password</label>
              <input
                className="ascend-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button type="button" className="ascend-forgot">Forgot password?</button>
            </div>

            <button className="ascend-btn" type="submit" onClick={handleRipple}>
              {ripples.map((r) => (
                <span
                  key={r.id}
                  className="ascend-ripple"
                  style={{ width: r.size, height: r.size, left: r.x, top: r.y }}
                />
              ))}
              Sign In
            </button>

            <div className="ascend-divider">or</div>

            <div className="ascend-signup">
              New here? <a href="#">Create an account</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
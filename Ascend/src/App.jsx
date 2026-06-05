import { useState, useEffect, useRef } from "react";

const entries = [
  {
    id: 1,
    date: "June 4, 2026",
    weekday: "Thursday",
    mood: "Grateful",
    moodColor: "#6EE7C7",
    title: "Morning clarity by the window",
    preview: "There's something about early mornings that feels like a secret gift. The city is quiet and I had three full cups of tea before anyone called...",
    tags: ["morning", "gratitude"],
    wordCount: 312,
  },
  {
    id: 2,
    date: "June 2, 2026",
    weekday: "Tuesday",
    mood: "Reflective",
    moodColor: "#A5B4FC",
    title: "What I'm building toward",
    preview: "I've been thinking about ambition lately. Not the kind that hollows you out, but the quiet persistent kind that feels like a current beneath the surface...",
    tags: ["goals", "growth"],
    wordCount: 520,
  },
  {
    id: 3,
    date: "May 30, 2026",
    weekday: "Saturday",
    mood: "Joyful",
    moodColor: "#FDE68A",
    title: "The farmer's market and a small detour",
    preview: "We wandered for two hours. Bought too many peaches. Sat on a bench near the fountain and ate one right there, juice running down my wrist...",
    tags: ["weekend", "simple joys"],
    wordCount: 214,
  },
  {
    id: 4,
    date: "May 27, 2026",
    weekday: "Wednesday",
    mood: "Uncertain",
    moodColor: "#FDA4AF",
    title: "On letting things be hard",
    preview: "I'm learning that some seasons are meant to be difficult. Not as punishment, but as information. The discomfort has something to tell me if I listen...",
    tags: ["growth", "mental health"],
    wordCount: 408,
  },
];

const moods = ["Joyful", "Grateful", "Reflective", "Uncertain", "Anxious", "Calm", "Excited", "Tired"];
const moodColors = {
  Joyful: "#FDE68A",
  Grateful: "#6EE7C7",
  Reflective: "#A5B4FC",
  Uncertain: "#FDA4AF",
  Anxious: "#FCA5A5",
  Calm: "#BAE6FD",
  Excited: "#FBB6CE",
  Tired: "#D1D5DB",
};

const quotes = [
  "The unexamined life is not worth living.",
  "Write what disturbs you, what you fear, what you have not been willing to speak about.",
  "Journal writing is a voyage to the interior.",
  "Fill your paper with the breathings of your heart.",
];

export default function Ascend() {
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeEntry, setActiveEntry] = useState(null);
  const [writing, setWriting] = useState(false);
  const [newEntry, setNewEntry] = useState({ title: "", body: "", mood: "Calm" });
  const [quoteIndex] = useState(() => Math.floor(Math.random() * quotes.length));
  const [scrolled, setScrolled] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  const streak = 7;

  const NavBar = () => (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(14, 12, 10, 0.94)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "0.5px solid rgba(255,255,255,0.06)" : "none",
      transition: "all 0.4s ease",
      padding: "0 clamp(1.25rem, 4vw, 3rem)",
      height: "64px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      {/* Logo */}
      <div
        onClick={() => { setPage("home"); setActiveEntry(null); setWriting(false); setMenuOpen(false); }}
        style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", userSelect: "none" }}
      >
        <div style={{
          width: "32px", height: "32px", borderRadius: "8px",
          background: "linear-gradient(135deg, #6EE7C7 0%, #A5B4FC 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2L10 6H14L11 9L12 13L8 10.5L4 13L5 9L2 6H6L8 2Z" fill="rgba(0,0,0,0.7)" />
          </svg>
        </div>
        <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "20px", fontWeight: 700, color: "#F5F0E8", letterSpacing: "-0.02em" }}>
          Ascend
        </span>
      </div>

      {/* Desktop Nav */}
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="desktop-nav">
        {["home", "journal", "insights", "profile"].map(item => (
          <button
            key={item}
            onClick={() => { setPage(item); setMenuOpen(false); }}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: page === item ? "#6EE7C7" : "rgba(245,240,232,0.55)",
              fontSize: "14px", fontWeight: page === item ? 500 : 400,
              letterSpacing: "0.05em", textTransform: "capitalize",
              fontFamily: "'DM Sans', sans-serif",
              transition: "color 0.2s",
              padding: "4px 0",
              borderBottom: page === item ? "1px solid #6EE7C7" : "1px solid transparent",
            }}
          >
            {item}
          </button>
        ))}
        <button
          onClick={() => { setWriting(true); setPage("journal"); }}
          style={{
            background: "#6EE7C7", color: "#0a0f0d", border: "none",
            padding: "8px 20px", borderRadius: "20px", fontSize: "13px",
            fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "0.02em", transition: "opacity 0.2s",
          }}
          onMouseOver={e => e.currentTarget.style.opacity = "0.85"}
          onMouseOut={e => e.currentTarget.style.opacity = "1"}
        >
          + New Entry
        </button>
      </div>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setMenuOpen(o => !o)}
        className="mobile-menu-btn"
        style={{
          background: "none", border: "none", cursor: "pointer",
          color: "#F5F0E8", padding: "8px", display: "none",
        }}
        aria-label="Toggle menu"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: "24px", height: "1.5px", background: "#F5F0E8",
              transition: "all 0.3s ease",
              transform: menuOpen
                ? i === 0 ? "rotate(45deg) translateY(9px)" : i === 2 ? "rotate(-45deg) translateY(-9px)" : "scaleX(0)"
                : "none",
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </div>
      </button>

      {/* Mobile Dropdown */}
      <div style={{
        position: "fixed", top: "64px", left: 0, right: 0,
        background: "rgba(10,9,8,0.97)", backdropFilter: "blur(20px)",
        borderBottom: "0.5px solid rgba(255,255,255,0.08)",
        padding: menuOpen ? "1.5rem 1.5rem 2rem" : "0 1.5rem",
        maxHeight: menuOpen ? "400px" : "0",
        overflow: "hidden",
        transition: "all 0.35s ease",
        display: "none",
        flexDirection: "column", gap: "0.25rem",
      }} className="mobile-dropdown">
        {["home", "journal", "insights", "profile"].map(item => (
          <button
            key={item}
            onClick={() => { setPage(item); setMenuOpen(false); }}
            style={{
              background: page === item ? "rgba(110,231,199,0.07)" : "none",
              border: "none", cursor: "pointer",
              color: page === item ? "#6EE7C7" : "rgba(245,240,232,0.7)",
              fontSize: "16px", fontWeight: 400,
              letterSpacing: "0.04em", textTransform: "capitalize",
              fontFamily: "'DM Sans', sans-serif",
              padding: "12px 1rem", borderRadius: "8px", textAlign: "left",
              width: "100%",
            }}
          >
            {item}
          </button>
        ))}
        <button
          onClick={() => { setWriting(true); setPage("journal"); setMenuOpen(false); }}
          style={{
            marginTop: "1rem",
            background: "#6EE7C7", color: "#0a0f0d", border: "none",
            padding: "12px 20px", borderRadius: "20px", fontSize: "14px",
            fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
            width: "100%",
          }}
        >
          + New Entry
        </button>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0E0C0A; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .mobile-dropdown { display: flex !important; }
        }
        textarea:focus { outline: none; }
        button:focus-visible { outline: 2px solid #6EE7C7; outline-offset: 2px; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
      `}</style>
    </nav>
  );

  const HomePage = () => (
    <div style={{ minHeight: "100vh", background: "#0E0C0A", color: "#F5F0E8", paddingTop: "64px" }}>
      {/* Hero */}
      <section style={{
        padding: "clamp(4rem, 10vw, 8rem) clamp(1.25rem, 4vw, 3rem) 3rem",
        maxWidth: "1100px", margin: "0 auto",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center",
      }} className="hero-grid">
        <div>
          <p style={{
            fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase",
            color: "#6EE7C7", fontFamily: "'DM Sans', sans-serif", marginBottom: "1.25rem",
          }}>
            {today}
          </p>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(2.5rem, 6vw, 4rem)", lineHeight: 1.1,
            fontWeight: 700, color: "#F5F0E8",
            marginBottom: "1.5rem",
          }}>
            Where your thoughts<br />
            <em style={{ color: "#6EE7C7", fontStyle: "italic" }}>become clarity.</em>
          </h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "16px",
            color: "rgba(245,240,232,0.55)", lineHeight: 1.8, marginBottom: "2rem",
            maxWidth: "420px",
          }}>
            "{quotes[quoteIndex]}"
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button
              onClick={() => { setWriting(true); setPage("journal"); }}
              style={{
                background: "#6EE7C7", color: "#0a0f0d",
                border: "none", padding: "14px 28px", borderRadius: "28px",
                fontSize: "14px", fontWeight: 600, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.02em",
                transition: "transform 0.15s, opacity 0.15s",
              }}
              onMouseOver={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.opacity = "0.9"; }}
              onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.opacity = "1"; }}
            >
              Write today's entry →
            </button>
            <button
              onClick={() => setPage("journal")}
              style={{
                background: "transparent", color: "rgba(245,240,232,0.65)",
                border: "0.5px solid rgba(245,240,232,0.15)", padding: "14px 28px",
                borderRadius: "28px", fontSize: "14px", fontWeight: 400,
                cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseOver={e => { e.currentTarget.style.borderColor = "rgba(245,240,232,0.35)"; e.currentTarget.style.color = "#F5F0E8"; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(245,240,232,0.15)"; e.currentTarget.style.color = "rgba(245,240,232,0.65)"; }}
            >
              Browse entries
            </button>
          </div>
        </div>

        {/* Stats Card */}
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "0.5px solid rgba(255,255,255,0.08)",
          borderRadius: "20px", padding: "2rem",
        }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,240,232,0.35)", marginBottom: "1.5rem" }}>Your journey</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
            {[
              { label: "Day streak", value: streak, icon: "🔥" },
              { label: "Total entries", value: "142", icon: "📖" },
              { label: "Words written", value: "48k", icon: "✍️" },
              { label: "Moods tracked", value: "38", icon: "🌤" },
            ].map(s => (
              <div key={s.label} style={{
                background: "rgba(255,255,255,0.04)", borderRadius: "12px",
                padding: "1rem", border: "0.5px solid rgba(255,255,255,0.06)",
              }}>
                <p style={{ fontSize: "20px", marginBottom: "4px" }}>{s.icon}</p>
                <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "22px", fontWeight: 700, color: "#F5F0E8" }}>{s.value}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(245,240,232,0.4)" }}>{s.label}</p>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)", paddingTop: "1.25rem" }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(245,240,232,0.4)", marginBottom: "8px" }}>Recent moods</p>
            <div style={{ display: "flex", gap: "8px" }}>
              {["Grateful", "Reflective", "Calm", "Joyful", "Uncertain", "Calm", "Grateful"].map((m, i) => (
                <div key={i} title={m} style={{
                  width: "28px", height: "28px", borderRadius: "50%",
                  background: moodColors[m], opacity: 0.7 + i * 0.04,
                  flexShrink: 0,
                }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Entries */}
      <section style={{ padding: "2rem clamp(1.25rem, 4vw, 3rem) 4rem", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1.5rem" }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.25rem, 3vw, 1.75rem)", fontWeight: 700 }}>Recent entries</h2>
          <button onClick={() => setPage("journal")} style={{ background: "none", border: "none", color: "#6EE7C7", fontSize: "13px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
            View all →
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
          {entries.slice(0, 3).map(e => (
            <EntryCard key={e.id} entry={e} onClick={() => { setActiveEntry(e); setPage("entry"); }} />
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </div>
  );

  const EntryCard = ({ entry, onClick }) => (
    <div
      onClick={onClick}
      style={{
        background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.07)",
        borderRadius: "16px", padding: "1.5rem", cursor: "pointer",
        transition: "background 0.2s, border-color 0.2s, transform 0.2s",
      }}
      onMouseOver={e => { e.currentTarget.style.background = "rgba(255,255,255,0.055)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.13)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseOut={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "rgba(245,240,232,0.35)", letterSpacing: "0.1em" }}>{entry.weekday.toUpperCase()}</span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(245,240,232,0.5)" }}>{entry.date}</span>
        </div>
        <div style={{
          background: entry.moodColor, color: "#1a1a1a",
          fontSize: "11px", fontWeight: 600, padding: "4px 10px",
          borderRadius: "12px", fontFamily: "'DM Sans', sans-serif",
          letterSpacing: "0.04em",
        }}>
          {entry.mood}
        </div>
      </div>
      <h3 style={{
        fontFamily: "'Playfair Display', Georgia, serif", fontSize: "16px",
        fontWeight: 700, color: "#F5F0E8", marginBottom: "0.75rem", lineHeight: 1.4,
      }}>
        {entry.title}
      </h3>
      <p style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: "13px",
        color: "rgba(245,240,232,0.45)", lineHeight: 1.7,
        display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
      }}>
        {entry.preview}
      </p>
      <div style={{ display: "flex", gap: "6px", marginTop: "1rem", flexWrap: "wrap" }}>
        {entry.tags.map(t => (
          <span key={t} style={{
            fontSize: "11px", color: "rgba(245,240,232,0.4)", fontFamily: "'DM Sans', sans-serif",
            background: "rgba(255,255,255,0.05)", padding: "3px 8px", borderRadius: "6px",
          }}>
            #{t}
          </span>
        ))}
        <span style={{ marginLeft: "auto", fontSize: "11px", color: "rgba(245,240,232,0.25)", fontFamily: "'DM Sans', sans-serif" }}>
          {entry.wordCount} words
        </span>
      </div>
    </div>
  );

  const JournalPage = () => (
    <div style={{ minHeight: "100vh", background: "#0E0C0A", color: "#F5F0E8", paddingTop: "64px" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "3rem clamp(1.25rem, 4vw, 3rem)" }}>
        {writing ? (
          <WriteView />
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, marginBottom: "0.25rem" }}>Your journal</h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(245,240,232,0.4)" }}>{entries.length} entries · 48,231 words written</p>
              </div>
              <button
                onClick={() => setWriting(true)}
                style={{
                  background: "#6EE7C7", color: "#0a0f0d",
                  border: "none", padding: "12px 22px", borderRadius: "24px",
                  fontSize: "13px", fontWeight: 600, cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                + New Entry
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {entries.map(e => (
                <EntryCard key={e.id} entry={e} onClick={() => { setActiveEntry(e); setPage("entry"); }} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );

  const WriteView = () => {
    const wordCount = newEntry.body.trim().split(/\s+/).filter(Boolean).length;
    return (
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        <button
          onClick={() => setWriting(false)}
          style={{ background: "none", border: "none", color: "rgba(245,240,232,0.4)", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", marginBottom: "2rem", padding: 0 }}
        >
          ← Back
        </button>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#6EE7C7", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.5rem" }}>{today}</p>

        <input
          value={newEntry.title}
          onChange={e => setNewEntry(p => ({ ...p, title: e.target.value }))}
          placeholder="Give this entry a title..."
          style={{
            background: "none", border: "none", width: "100%",
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 700,
            color: "#F5F0E8", marginBottom: "1.5rem",
            "::placeholder": { color: "rgba(245,240,232,0.2)" },
          }}
        />

        <div style={{ display: "flex", gap: "8px", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          {moods.map(m => (
            <button
              key={m}
              onClick={() => setNewEntry(p => ({ ...p, mood: m }))}
              style={{
                background: newEntry.mood === m ? moodColors[m] : "rgba(255,255,255,0.04)",
                color: newEntry.mood === m ? "#1a1a1a" : "rgba(245,240,232,0.5)",
                border: "0.5px solid " + (newEntry.mood === m ? moodColors[m] : "rgba(255,255,255,0.1)"),
                padding: "6px 14px", borderRadius: "16px", fontSize: "12px",
                fontWeight: newEntry.mood === m ? 600 : 400,
                cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                transition: "all 0.15s",
              }}
            >
              {m}
            </button>
          ))}
        </div>

        <div style={{
          borderTop: "0.5px solid rgba(255,255,255,0.07)",
          borderBottom: "0.5px solid rgba(255,255,255,0.07)",
          padding: "1.5rem 0",
        }}>
          <textarea
            ref={textareaRef}
            value={newEntry.body}
            onChange={e => setNewEntry(p => ({ ...p, body: e.target.value }))}
            placeholder="Start writing. There are no rules here..."
            rows={14}
            style={{
              background: "none", border: "none", width: "100%", resize: "none",
              fontFamily: "'DM Sans', sans-serif", fontSize: "16px", lineHeight: 1.9,
              color: "rgba(245,240,232,0.82)", caretColor: "#6EE7C7",
            }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(245,240,232,0.3)" }}>
            {wordCount} {wordCount === 1 ? "word" : "words"}
          </span>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button
              onClick={() => setWriting(false)}
              style={{
                background: "transparent", color: "rgba(245,240,232,0.5)",
                border: "0.5px solid rgba(255,255,255,0.1)", padding: "10px 20px",
                borderRadius: "20px", fontSize: "13px", cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Discard
            </button>
            <button
              onClick={() => { setWriting(false); }}
              style={{
                background: "#6EE7C7", color: "#0a0f0d",
                border: "none", padding: "10px 24px", borderRadius: "20px",
                fontSize: "13px", fontWeight: 600, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Save entry
            </button>
          </div>
        </div>
      </div>
    );
  };

  const EntryPage = () => {
    const e = activeEntry;
    if (!e) return null;
    return (
      <div style={{ minHeight: "100vh", background: "#0E0C0A", color: "#F5F0E8", paddingTop: "64px" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", padding: "3rem clamp(1.25rem, 4vw, 2rem)" }}>
          <button
            onClick={() => { setActiveEntry(null); setPage("journal"); }}
            style={{ background: "none", border: "none", color: "rgba(245,240,232,0.4)", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", marginBottom: "2.5rem", padding: 0 }}
          >
            ← All entries
          </button>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.75rem" }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(245,240,232,0.4)" }}>{e.weekday}, {e.date}</p>
            <span style={{
              background: e.moodColor, color: "#1a1a1a",
              fontSize: "12px", fontWeight: 600, padding: "5px 12px",
              borderRadius: "12px", fontFamily: "'DM Sans', sans-serif",
            }}>
              {e.mood}
            </span>
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.75rem, 5vw, 2.75rem)", fontWeight: 700,
            lineHeight: 1.2, marginBottom: "2rem",
          }}>
            {e.title}
          </h1>
          <div style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "16px", lineHeight: 1.9,
            color: "rgba(245,240,232,0.72)",
          }}>
            <p>{e.preview}</p>
            <p style={{ marginTop: "1.5rem" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia.</p>
            <p style={{ marginTop: "1.5rem" }}>Phasellus euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl. Curabitur euismod metus vel dolor lacinia, a efficitur nunc dignissim.</p>
          </div>
          <div style={{ display: "flex", gap: "8px", marginTop: "2.5rem", flexWrap: "wrap" }}>
            {e.tags.map(t => (
              <span key={t} style={{
                fontSize: "12px", color: "rgba(245,240,232,0.45)", fontFamily: "'DM Sans', sans-serif",
                background: "rgba(255,255,255,0.05)", padding: "5px 12px", borderRadius: "8px",
              }}>
                #{t}
              </span>
            ))}
            <span style={{ marginLeft: "auto", fontSize: "12px", color: "rgba(245,240,232,0.25)", fontFamily: "'DM Sans', sans-serif" }}>
              {e.wordCount} words
            </span>
          </div>
        </div>
      </div>
    );
  };

  const InsightsPage = () => {
    const moodDist = [
      { label: "Grateful", count: 28, color: "#6EE7C7" },
      { label: "Reflective", count: 34, color: "#A5B4FC" },
      { label: "Calm", count: 22, color: "#BAE6FD" },
      { label: "Joyful", count: 18, color: "#FDE68A" },
      { label: "Uncertain", count: 14, color: "#FDA4AF" },
    ];
    const total = moodDist.reduce((a, b) => a + b.count, 0);
    return (
      <div style={{ minHeight: "100vh", background: "#0E0C0A", color: "#F5F0E8", paddingTop: "64px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "3rem clamp(1.25rem, 4vw, 3rem)" }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, marginBottom: "0.5rem" }}>Your insights</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(245,240,232,0.4)", marginBottom: "2.5rem" }}>Patterns from your journaling practice</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "1.5rem", gridColumn: "span 1" }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,240,232,0.35)", marginBottom: "1.25rem" }}>Mood distribution</p>
              {moodDist.map(m => (
                <div key={m.label} style={{ marginBottom: "0.75rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(245,240,232,0.65)" }}>{m.label}</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(245,240,232,0.35)" }}>{m.count}</span>
                  </div>
                  <div style={{ height: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${(m.count / total) * 100}%`, background: m.color, borderRadius: "2px" }} />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "1.5rem" }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,240,232,0.35)", marginBottom: "1.25rem" }}>Writing activity</p>
              <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "80px" }}>
                {[4, 2, 6, 3, 7, 5, 4, 6, 2, 5, 7, 3].map((h, i) => (
                  <div key={i} style={{ flex: 1, background: i === 11 ? "#6EE7C7" : "rgba(255,255,255,0.1)", borderRadius: "3px", height: `${(h / 7) * 80}px`, transition: "background 0.2s" }} />
                ))}
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(245,240,232,0.3)", marginTop: "0.75rem" }}>Past 12 weeks</p>
            </div>
            <div style={{ background: "rgba(110,231,199,0.05)", border: "0.5px solid rgba(110,231,199,0.15)", borderRadius: "16px", padding: "1.5rem" }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(110,231,199,0.6)", marginBottom: "0.75rem" }}>Longest streak</p>
              <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "2.5rem", fontWeight: 700, color: "#6EE7C7" }}>23</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(245,240,232,0.4)" }}>consecutive days</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ProfilePage = () => (
    <div style={{ minHeight: "100vh", background: "#0E0C0A", color: "#F5F0E8", paddingTop: "64px" }}>
      <div style={{ maxWidth: "560px", margin: "0 auto", padding: "3rem clamp(1.25rem, 4vw, 3rem)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "2.5rem" }}>
          <div style={{
            width: "64px", height: "64px", borderRadius: "50%",
            background: "linear-gradient(135deg, #6EE7C7, #A5B4FC)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Playfair Display', serif", fontSize: "22px", color: "#0a0f0d", fontWeight: 700,
          }}>A</div>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.5rem", fontWeight: 700 }}>Alex Sharma</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(245,240,232,0.4)" }}>Member since January 2025 · Pro plan</p>
          </div>
        </div>
        {[
          { label: "Notifications", desc: "Daily writing reminders at 9 AM" },
          { label: "Export journal", desc: "Download all entries as PDF or Markdown" },
          { label: "Privacy", desc: "End-to-end encrypted · Data stays yours" },
          { label: "Appearance", desc: "Dark mode · Serif font · Spacious layout" },
        ].map(s => (
          <div key={s.label} style={{
            background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.07)",
            borderRadius: "12px", padding: "1rem 1.25rem", marginBottom: "0.75rem",
            display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer",
            transition: "background 0.2s",
          }}
            onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.055)"}
            onMouseOut={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
          >
            <div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 500, color: "#F5F0E8", marginBottom: "2px" }}>{s.label}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(245,240,232,0.35)" }}>{s.desc}</p>
            </div>
            <span style={{ color: "rgba(245,240,232,0.25)", fontSize: "18px" }}>›</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <NavBar />
      {page === "home" && <HomePage />}
      {page === "journal" && <JournalPage />}
      {page === "entry" && <EntryPage />}
      {page === "insights" && <InsightsPage />}
      {page === "profile" && <ProfilePage />}
    </div>
  );
}
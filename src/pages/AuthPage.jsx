import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const s = {
  page: { minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"24px", background:"linear-gradient(160deg,#0a1428 0%,#0A0E1A 60%,#0d1a2e 100%)" },
  glow: { position:"fixed", top:"-20%", left:"50%", transform:"translateX(-50%)", width:"500px", height:"500px", borderRadius:"50%", background:"radial-gradient(circle,rgba(0,229,160,0.06) 0%,transparent 70%)", pointerEvents:"none" },
  logo: { fontSize:"32px", fontWeight:800, color:"#F0F4FF", fontFamily:"'Sora',sans-serif", marginBottom:"4px", letterSpacing:"-1px" },
  logoSpan: { color:"#00E5A0" },
  tagline: { fontSize:"13px", color:"#6B7FA3", marginBottom:"36px", fontFamily:"'Sora',sans-serif" },
  card: { width:"100%", maxWidth:"400px", background:"#111827", border:"1px solid #1E2D45", borderRadius:"20px", padding:"28px" },
  tabs: { display:"flex", marginBottom:"24px", background:"#0A0E1A", borderRadius:"12px", padding:"4px" },
  tab: { flex:1, padding:"9px", borderRadius:"9px", border:"none", background:"transparent", color:"#6B7FA3", fontFamily:"'Sora',sans-serif", fontSize:"14px", fontWeight:600, cursor:"pointer", transition:"all 0.2s" },
  tabActive: { background:"#1C2537", color:"#F0F4FF" },
  label: { display:"block", fontSize:"12px", fontWeight:600, color:"#6B7FA3", textTransform:"uppercase", letterSpacing:"0.8px", marginBottom:"6px", fontFamily:"'Sora',sans-serif" },
  inputWrap: { position:"relative", marginBottom:"14px" },
  input: { width:"100%", padding:"13px 16px", background:"#1C2537", border:"1px solid #1E2D45", borderRadius:"12px", color:"#F0F4FF", fontFamily:"'Sora',sans-serif", fontSize:"14px", outline:"none", transition:"border-color 0.2s" },
  select: { width:"100%", padding:"13px 16px", background:"#1C2537", border:"1px solid #1E2D45", borderRadius:"12px", color:"#F0F4FF", fontFamily:"'Sora',sans-serif", fontSize:"14px", outline:"none", marginBottom:"14px", appearance:"none" },
  eyeBtn: { position:"absolute", right:"14px", top:"50%", transform:"translateY(-50%)", background:"transparent", border:"none", cursor:"pointer", color:"#6B7FA3", display:"flex", alignItems:"center" },
  btn: { width:"100%", padding:"15px", borderRadius:"13px", border:"none", background:"linear-gradient(135deg,#00E5A0,#00C6A2)", color:"#0A0E1A", fontFamily:"'Sora',sans-serif", fontSize:"15px", fontWeight:700, cursor:"pointer", marginTop:"8px", transition:"all 0.2s" },
  error: { background:"rgba(255,68,68,0.1)", border:"1px solid rgba(255,68,68,0.3)", borderRadius:"10px", padding:"11px 14px", color:"#FF6666", fontSize:"13px", marginBottom:"14px", fontFamily:"'Sora',sans-serif" },
};

export default function AuthPage() {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name:"", email:"", password:"", examTarget:"WAEC" });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = async () => {
    setError("");
    if (!form.email || !form.password) return setError("Please fill in all fields");
    if (mode === "signup" && !form.name) return setError("Please enter your name");
    setLoading(true);
    const result = mode === "login"
      ? login(form.email, form.password)
      : signup(form.name, form.email, form.password, form.examTarget);
    if (result.error) setError(result.error);
    setLoading(false);
  };

  return (
    <div style={s.page}>
      <div style={s.glow} />
      <div style={s.logo}>Get<span style={s.logoSpan}>Knowledge</span></div>
      <div style={s.tagline}>Your WAEC & JAMB study companion 🎓</div>
      <div style={s.card}>
        <div style={s.tabs}>
          <button style={{ ...s.tab, ...(mode==="login"?s.tabActive:{}) }} onClick={() => { setMode("login"); setError(""); }}>Log In</button>
          <button style={{ ...s.tab, ...(mode==="signup"?s.tabActive:{}) }} onClick={() => { setMode("signup"); setError(""); }}>Sign Up</button>
        </div>

        {error && <div style={s.error}>⚠️ {error}</div>}

        {mode === "signup" && (
          <>
            <label style={s.label}>Full Name</label>
            <div style={s.inputWrap}>
              <input style={s.input} placeholder="e.g. Chidi Okeke" value={form.name} onChange={e => set("name", e.target.value)} />
            </div>
            <label style={s.label}>Target Exam</label>
            <select style={s.select} value={form.examTarget} onChange={e => set("examTarget", e.target.value)}>
              <option value="WAEC">WAEC</option>
              <option value="JAMB">JAMB</option>
              <option value="WAEC & JAMB">Both WAEC & JAMB</option>
            </select>
          </>
        )}

        <label style={s.label}>Email Address</label>
        <div style={s.inputWrap}>
          <input style={s.input} type="email" placeholder="you@gmail.com" value={form.email} onChange={e => set("email", e.target.value)} onKeyDown={e => e.key==="Enter" && submit()} />
        </div>

        <label style={s.label}>Password</label>
        <div style={{ ...s.inputWrap, marginBottom:"4px" }}>
          <input style={{ ...s.input, paddingRight:"46px" }} type={showPw ? "text" : "password"} placeholder="••••••••" value={form.password} onChange={e => set("password", e.target.value)} onKeyDown={e => e.key==="Enter" && submit()} />
          <button style={s.eyeBtn} onClick={() => setShowPw(v => !v)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {showPw
                ? <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
                : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
              }
            </svg>
          </button>
        </div>

        <button style={s.btn} onClick={submit} disabled={loading}>
          {loading ? "Please wait..." : mode === "login" ? "Log In →" : "Create Account →"}
        </button>

        <p style={{ textAlign:"center", fontSize:"12px", color:"#6B7FA3", marginTop:"16px", fontFamily:"'Sora',sans-serif" }}>
          {mode === "login" ? "New here? " : "Already have an account? "}
          <span style={{ color:"#00E5A0", cursor:"pointer", fontWeight:600 }} onClick={() => { setMode(mode==="login"?"signup":"login"); setError(""); }}>
            {mode === "login" ? "Create account" : "Log in"}
          </span>
        </p>
      </div>
      <p style={{ fontSize:"11px", color:"#3a4a60", marginTop:"20px", fontFamily:"'Sora',sans-serif", textAlign:"center" }}>
        🔒 Your data stays on this device. No server required.
      </p>
    </div>
  );
}

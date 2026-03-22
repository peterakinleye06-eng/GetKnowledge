import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import CBTPage from "./pages/CBTPage";
import LibraryPage from "./pages/LibraryPage";
import ChallengePage from "./pages/ChallengePage";
import TutorPage from "./pages/TutorPage";
import Icon from "./components/Icon";

const NAV = [
  { id:"dashboard", label:"Home",      icon:"dashboard" },
  { id:"cbt",       label:"CBT",       icon:"cbt"       },
  { id:"library",   label:"Library",   icon:"library"   },
  { id:"challenge", label:"Challenge", icon:"challenge" },
  { id:"tutor",     label:"AI Tutor",  icon:"tutor"     },
];

function Shell() {
  const { user, loading } = useAuth();
  const [tab, setTab] = useState("dashboard");

  if (loading) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#0A0E1A" }}>
      <div style={{ fontSize:"22px", fontWeight:800, fontFamily:"'Sora',sans-serif", color:"#F0F4FF" }}>
        Get<span style={{ color:"#00E5A0" }}>Knowledge</span>
      </div>
    </div>
  );

  if (!user) return <AuthPage />;

  return (
    <div style={{ maxWidth:"430px", margin:"0 auto", minHeight:"100vh", display:"flex", flexDirection:"column", position:"relative", fontFamily:"'Sora',sans-serif" }}>
      {/* ── HEADER ── */}
      <div style={{ background:"linear-gradient(135deg,#0D1B3E 0%,#0A0E1A 100%)", padding:"16px 20px 12px", borderBottom:"1px solid #1E2D45", position:"sticky", top:0, zIndex:100 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div style={{ fontSize:"20px", fontWeight:800, letterSpacing:"-0.5px" }}>
            Get<span style={{ color:"#00E5A0" }}>Knowledge</span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:"5px", background:"rgba(255,107,53,0.12)", border:"1px solid rgba(255,107,53,0.25)", padding:"5px 11px", borderRadius:"20px", fontSize:"13px", fontWeight:600, color:"#FF6B35" }}>
            <Icon name="flame" size={13} color="#FF6B35" />
            {user.streak || 1} streak
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ flex:1, padding:"20px", paddingBottom:"90px", overflowY:"auto" }}>
        {tab === "dashboard" && <Dashboard setTab={setTab} />}
        {tab === "cbt"       && <CBTPage />}
        {tab === "library"   && <LibraryPage />}
        {tab === "challenge" && <ChallengePage />}
        {tab === "tutor"     && <TutorPage />}
      </div>

      {/* ── BOTTOM NAV ── */}
      <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:"430px", background:"#111827", borderTop:"1px solid #1E2D45", display:"flex", zIndex:100 }}>
        {NAV.map(n => (
          <button key={n.id} onClick={() => setTab(n.id)}
            style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:"3px", padding:"10px 0", border:"none", background:"transparent", color:tab===n.id?"#00E5A0":"#6B7FA3", cursor:"pointer", fontFamily:"'Sora',sans-serif", fontSize:"10px", fontWeight:600, transition:"color 0.2s" }}>
            <span style={{ ...(tab===n.id ? { background:"rgba(0,229,160,0.1)", borderRadius:"10px", padding:"3px 10px" } : {}) }}>
              <Icon name={n.icon} size={20} />
            </span>
            {n.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Shell />
    </AuthProvider>
  );
}

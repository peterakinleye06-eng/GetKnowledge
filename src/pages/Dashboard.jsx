import { useAuth } from "../context/AuthContext";
import Icon from "../components/Icon";

export default function Dashboard({ setTab }) {
  const { user, logout } = useAuth();
  const waecDays = Math.max(0, Math.floor((new Date("2026-05-02") - new Date()) / 86400000));
  const jambDays = Math.max(0, Math.floor((new Date("2026-04-19") - new Date()) / 86400000));
  const xpProgress = ((user?.points || 0) % 500) / 500 * 100;
  const level = Math.floor((user?.points || 0) / 500) + 1;

  return (
    <div>
      {/* Profile Banner */}
      <div style={{ background:"linear-gradient(135deg,#0d2040,#0a1830)", border:"1px solid rgba(0,229,160,0.15)", borderRadius:"18px", padding:"20px", marginBottom:"16px" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"16px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
            <div style={{ width:"46px", height:"46px", borderRadius:"50%", background:"linear-gradient(135deg,#00E5A0,#00B8FF)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"20px", fontWeight:800, color:"#0A0E1A" }}>
              {(user?.name || "U")[0].toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize:"12px", color:"#6B7FA3" }}>Welcome back 👋</div>
              <div style={{ fontSize:"18px", fontWeight:700 }}>{user?.name || "Student"}</div>
            </div>
          </div>
          <button onClick={logout} style={{ background:"rgba(255,68,68,0.1)", border:"1px solid rgba(255,68,68,0.2)", borderRadius:"10px", padding:"8px 12px", color:"#FF6666", cursor:"pointer", display:"flex", alignItems:"center", gap:"5px", fontSize:"12px", fontWeight:600, fontFamily:"'Sora',sans-serif" }}>
            <Icon name="logout" size={14} color="#FF6666" /> Logout
          </button>
        </div>
        {/* XP bar */}
        <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
          <span style={{ fontSize:"11px", color:"#6B7FA3", whiteSpace:"nowrap" }}>Lvl {level}</span>
          <div style={{ flex:1, height:"5px", background:"#1E2D45", borderRadius:"5px" }}>
            <div style={{ height:"100%", width:`${xpProgress}%`, background:"linear-gradient(90deg,#00E5A0,#00B8FF)", borderRadius:"5px", transition:"width 0.8s ease" }} />
          </div>
          <span style={{ fontSize:"11px", color:"#00E5A0", fontFamily:"'JetBrains Mono',monospace", whiteSpace:"nowrap" }}>{user?.points || 0} XP</span>
        </div>
      </div>

      {/* Exam Countdown */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginBottom:"16px" }}>
        {[
          { label:"Days to JAMB", val:jambDays, color:"#00E5A0" },
          { label:"Days to WAEC", val:waecDays, color:"#FF6B35" },
        ].map((item,i) => (
          <div key={i} style={{ background:"#111827", border:"1px solid #1E2D45", borderRadius:"14px", padding:"16px", textAlign:"center" }}>
            <div style={{ fontSize:"32px", fontWeight:800, color:item.color, fontFamily:"'JetBrains Mono',monospace" }}>{item.val}</div>
            <div style={{ fontSize:"11px", color:"#6B7FA3", marginTop:"2px" }}>{item.label}</div>
          </div>
        ))}
      </div>

      {/* Target exam badge */}
      {user?.examTarget && (
        <div style={{ background:"rgba(124,92,191,0.1)", border:"1px solid rgba(124,92,191,0.25)", borderRadius:"12px", padding:"10px 14px", marginBottom:"16px", fontSize:"13px", color:"#b094f5" }}>
          🎯 You're preparing for <strong>{user.examTarget}</strong>
        </div>
      )}

      {/* Quick Access */}
      <div style={{ fontSize:"11px", fontWeight:700, color:"#6B7FA3", textTransform:"uppercase", letterSpacing:"0.8px", marginBottom:"10px" }}>Quick Access</div>
      {[
        { label:"📝 WAEC Practice", sub:"Start a CBT session", tab:"cbt", color:"#00E5A0" },
        { label:"🎯 JAMB Practice", sub:"Mock exam mode", tab:"cbt", color:"#FF6B35" },
        { label:"⚡ Daily Challenge", sub:"Earn bonus XP today", tab:"challenge", color:"#7C5CBF" },
        { label:"🤖 Ask Mr. Knowledge", sub:"AI tutor is ready", tab:"tutor", color:"#E91E8C" },
        { label:"📚 Library", sub:"Read study notes", tab:"library", color:"#00B8FF" },
      ].map((item, i) => (
        <div key={i} onClick={() => setTab(item.tab)}
          style={{ background:"#111827", border:`1px solid #1E2D45`, borderLeft:`3px solid ${item.color}`, borderRadius:"14px", padding:"15px 16px", marginBottom:"10px", cursor:"pointer", transition:"all 0.2s" }}>
          <div style={{ fontWeight:700, fontSize:"15px" }}>{item.label}</div>
          <div style={{ fontSize:"12px", color:"#6B7FA3", marginTop:"3px" }}>{item.sub}</div>
        </div>
      ))}
    </div>
  );
}

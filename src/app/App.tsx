import { useState, useRef } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

// ── Palette ───────────────────────────────────────────────────────────────────
const GREEN       = "#4CAF7D";
const GREEN_LIGHT = "#E8F5EE";
const GREY_CARD   = "#F5F5F5";
const GREY_BORDER = "#EBEBEB";
const TEXT        = "#111111";
const MUTED       = "#888888";
const ORANGE      = "#FF8C42";
const ORANGE_LIGHT= "#FFF3EA";
const BLUE        = "#4A90D9";
const BLUE_LIGHT  = "#EBF3FC";

// ── Icon ──────────────────────────────────────────────────────────────────────
function Icon({ d, size = 16, color = TEXT, sw = 1.5 }: { d: string; size?: number; color?: string; sw?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

// ── Nav Icons ─────────────────────────────────────────────────────────────────
const NAV_ICONS = {
  home:      "M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z",
  orders:    "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  dashboard: "M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 13a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6z",
  profile:   "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z",
};

// ── Bottom Nav ────────────────────────────────────────────────────────────────
function BottomNav({ active, onTab }: { active: string; onTab: (t: string) => void }) {
  return (
    <div style={{ borderTop: `1px solid ${GREY_BORDER}`, backgroundColor: "#fff" }}
      className="flex items-center justify-around py-1.5 px-1 flex-shrink-0">
      {(["home","orders","dashboard","profile"] as const).map(id => (
        <button key={id} onClick={() => onTab(id)} className="flex flex-col items-center gap-0.5 flex-1">
          <Icon d={NAV_ICONS[id]} size={16} color={active === id ? GREEN : MUTED} />
          <span style={{ fontSize: 8.5, color: active === id ? GREEN : MUTED, fontWeight: active === id ? 600 : 400, textTransform: "capitalize" }}>{id}</span>
        </button>
      ))}
    </div>
  );
}

// ── Shared Components ─────────────────────────────────────────────────────────
function Card({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`rounded-xl p-2.5 ${className}`} style={{ backgroundColor: GREY_CARD, ...style }}>
      {children}
    </div>
  );
}

function Badge({ label, color = GREEN, bg = GREEN_LIGHT }: { label: string; color?: string; bg?: string }) {
  return (
    <span style={{ backgroundColor: bg, color, fontSize: 8.5, fontWeight: 600, borderRadius: 4, padding: "2px 5px", whiteSpace: "nowrap" }}>
      {label}
    </span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <p style={{ fontWeight: 600, fontSize: 11, marginBottom: 5 }}>{children}</p>;
}

// ── HOME SCREEN ───────────────────────────────────────────────────────────────
const NEWS_BANNERS = [
  { title: "New Premium Cubicle Desks at Banani", sub: "Upgrade your workspace experience", gradient: `linear-gradient(135deg, #2D7A4F, ${GREEN})` },
  { title: "High-Speed Internet Upgrade Done", sub: "Enjoy blazing-fast connectivity now", gradient: "linear-gradient(135deg, #1a6fa8, #4A90D9)" },
  { title: "Community Meetup – June 20th", sub: "Join fellow members at Gulshan", gradient: "linear-gradient(135deg, #b45309, #FF8C42)" },
];

function HomeScreen() {
  const [bannerIdx, setBannerIdx] = useState(0);
  const bannerRef = useRef<HTMLDivElement>(null);

  const scrollBanner = (dir: number) => {
    const next = (bannerIdx + dir + NEWS_BANNERS.length) % NEWS_BANNERS.length;
    setBannerIdx(next);
  };

  return (
    <div className="flex flex-col gap-2 px-3 pb-2 pt-2 flex-1" style={{ fontSize: 11, overflow: "hidden" }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1">
            <Icon d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" size={11} color={MUTED} />
            <span style={{ color: MUTED, fontSize: 9.5 }}>Gulshan Link Road</span>
            <Badge label="Active" />
          </div>
          <p style={{ fontWeight: 700, fontSize: 13, marginTop: 1 }}>Good Morning, Arif 👋</p>
        </div>
        <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: GREEN_LIGHT, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <Icon d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" size={14} color={GREEN} />
        </div>
      </div>

      {/* Membership Card */}
      <div className="rounded-xl px-3 py-2.5" style={{ background: `linear-gradient(135deg, #2D7A4F, ${GREEN})`, color: "#fff" }}>
        <div className="flex justify-between items-start">
          <div>
            <p style={{ fontSize: 8.5, opacity: 0.8 }}>MEMBERSHIP</p>
            <p style={{ fontWeight: 700, fontSize: 12 }}>Dedicated Desk · D-14</p>
          </div>
          <Badge label="Active" color="#fff" bg="rgba(255,255,255,0.25)" />
        </div>
        <div className="flex gap-5 mt-1.5">
          {[["Member ID","MBR-2847"],["Branch","Gulshan"],["Valid till","30 Jun 2025"]].map(([l,v]) => (
            <div key={l}><p style={{ fontSize: 8, opacity: 0.72 }}>{l}</p><p style={{ fontWeight: 600, fontSize: 9 }}>{v}</p></div>
          ))}
        </div>
      </div>

      {/* Check-in + Renewal row */}
      <div className="flex gap-2">
        <Card style={{ flex: 1 }}>
          <p style={{ fontWeight: 600, fontSize: 10, marginBottom: 4 }}>Today's Check-in</p>
          <div className="flex gap-1.5">
            <div className="flex-1 rounded-lg p-1.5 flex flex-col items-center" style={{ backgroundColor: GREEN_LIGHT }}>
              <Icon d="M11 16l-4-4m0 0l4-4m-4 4h14" size={12} color={GREEN} />
              <span style={{ fontSize: 8, color: GREEN, fontWeight: 600, marginTop: 1 }}>Check In</span>
              <span style={{ fontSize: 7.5, color: MUTED }}>09:14 AM</span>
            </div>
            <div className="flex-1 rounded-lg p-1.5 flex flex-col items-center" style={{ backgroundColor: "#fff", border: `1px solid ${GREY_BORDER}` }}>
              <Icon d="M17 16l4-4m0 0l-4-4m4 4H7" size={12} color={MUTED} />
              <span style={{ fontSize: 8, color: MUTED, fontWeight: 600, marginTop: 1 }}>Check Out</span>
              <span style={{ fontSize: 7.5, color: MUTED }}>Not yet</span>
            </div>
          </div>
        </Card>

        <div className="rounded-xl p-2.5 flex flex-col justify-between" style={{ flex: 1, backgroundColor: ORANGE_LIGHT, border: `1px solid #FFD4B0` }}>
          <div className="flex items-start gap-1">
            <Icon d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" size={12} color={ORANGE} />
            <p style={{ fontWeight: 600, fontSize: 9, color: ORANGE }}>Renewal Notice</p>
          </div>
          <p style={{ fontSize: 8, color: "#7A4A1E", lineHeight: 1.3, margin: "3px 0" }}>Expires in 16 days. Renew to avoid interruption.</p>
          <button className="rounded-lg py-1" style={{ backgroundColor: ORANGE, color: "#fff", fontSize: 8.5, fontWeight: 600, width: "100%" }}>Renew Now</button>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <SectionTitle>Quick Actions</SectionTitle>
        <div className="grid grid-cols-4 gap-1.5">
          {[
            { label: "Book a Space", d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", color: BLUE, bg: BLUE_LIGHT },
            { label: "Raise Issue", d: "M12 9v2m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z", color: ORANGE, bg: ORANGE_LIGHT },
            { label: "Community", d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0", color: GREEN, bg: GREEN_LIGHT },
            { label: "Others", d: "M5 12h.01M12 12h.01M19 12h.01", color: MUTED, bg: GREY_CARD },
          ].map(({ label, d, color, bg }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <div className="rounded-xl flex items-center justify-center" style={{ width: 40, height: 40, backgroundColor: bg }}>
                <Icon d={d} size={17} color={color} />
              </div>
              <span style={{ fontSize: 7.5, color: TEXT, textAlign: "center", lineHeight: 1.2 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Booking */}
      <Card className="flex gap-2 items-center">
        <div className="rounded-lg flex items-center justify-center flex-shrink-0" style={{ width: 32, height: 32, backgroundColor: BLUE_LIGHT }}>
          <Icon d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" size={14} color={BLUE} />
        </div>
        <div className="flex-1">
          <p style={{ fontWeight: 600, fontSize: 10 }}>Meeting Room – Orchid</p>
          <p style={{ fontSize: 8.5, color: MUTED }}>14 Jun 2025 · 2:00 PM – 4:00 PM</p>
        </div>
        <Badge label="Upcoming" color={BLUE} bg={BLUE_LIGHT} />
      </Card>

      {/* Moor News Banner */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <SectionTitle>Moor News</SectionTitle>
          <div className="flex gap-1">
            {NEWS_BANNERS.map((_, i) => (
              <div key={i} style={{ width: i === bannerIdx ? 14 : 5, height: 5, borderRadius: 3, backgroundColor: i === bannerIdx ? GREEN : GREY_BORDER, transition: "width 0.3s" }} />
            ))}
          </div>
        </div>
        <div style={{ position: "relative", borderRadius: 12, overflow: "hidden" }}>
          <div
            ref={bannerRef}
            style={{ background: NEWS_BANNERS[bannerIdx].gradient, borderRadius: 12, padding: "14px 16px", color: "#fff", minHeight: 72, position: "relative" }}
          >
            <p style={{ fontWeight: 700, fontSize: 11.5, lineHeight: 1.3, maxWidth: "75%" }}>{NEWS_BANNERS[bannerIdx].title}</p>
            <p style={{ fontSize: 9, opacity: 0.85, marginTop: 4 }}>{NEWS_BANNERS[bannerIdx].sub}</p>
            <button style={{ marginTop: 8, backgroundColor: "rgba(255,255,255,0.25)", color:"#fff", fontSize: 8.5, fontWeight: 600, borderRadius: 6, padding: "3px 10px" }}>Read More</button>
            {/* Nav arrows */}
            <button onClick={() => scrollBanner(-1)} style={{ position:"absolute", right: 32, bottom: 10, opacity: 0.7 }}>
              <Icon d="M15 19l-7-7 7-7" size={14} color="#fff" sw={2} />
            </button>
            <button onClick={() => scrollBanner(1)} style={{ position:"absolute", right: 10, bottom: 10, opacity: 0.7 }}>
              <Icon d="M9 5l7 7-7 7" size={14} color="#fff" sw={2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── ORDERS SCREEN ─────────────────────────────────────────────────────────────
function OrdersScreen() {
  const [filter, setFilter] = useState("All");
  const orders = [
    { id:"ORD-1201", type:"Membership", name:"Dedicated Desk – June 2025", amount:"৳12,000", status:"Active",    date:"01 Jun 2025" },
    { id:"ORD-1198", type:"Booking",    name:"Meeting Room – Orchid",        amount:"৳1,500",  status:"Completed", date:"10 Jun 2025" },
    { id:"ORD-1195", type:"Membership", name:"Dedicated Desk – July 2025",   amount:"৳12,000", status:"Pending",   date:"30 Jun 2025" },
    { id:"ORD-1189", type:"Booking",    name:"Conference Room – Tulip",       amount:"৳3,000",  status:"Completed", date:"05 Jun 2025" },
    { id:"ORD-1180", type:"Booking",    name:"Day Pass – Gulshan",            amount:"৳800",    status:"Pending",   date:"14 Jun 2025" },
  ];

  const shown = filter === "All" ? orders : orders.filter(o => o.status === filter);
  const sBadge = (s: string) =>
    s === "Active"    ? { color: GREEN, bg: GREEN_LIGHT } :
    s === "Pending"   ? { color: ORANGE, bg: ORANGE_LIGHT } :
                        { color: MUTED, bg: "#EBEBEB" };

  return (
    <div className="flex flex-col gap-2 px-3 pb-2 pt-2 flex-1" style={{ fontSize: 11, overflow: "hidden" }}>
      <p style={{ fontWeight: 700, fontSize: 14 }}>My Orders</p>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label:"Total", val: orders.length,                                  color: TEXT },
          { label:"Active", val: orders.filter(o=>o.status==="Active").length,  color: GREEN },
          { label:"Pending", val: orders.filter(o=>o.status==="Pending").length, color: ORANGE },
        ].map(({ label, val, color }) => (
          <div key={label} className="rounded-xl p-2 text-center" style={{ backgroundColor: GREY_CARD }}>
            <p style={{ fontWeight: 700, fontSize: 15, color }}>{val}</p>
            <p style={{ fontSize: 8.5, color: MUTED }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-1.5">
        {["All","Pending","Active","Completed"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="rounded-full px-3 py-1"
            style={{ backgroundColor: filter===f ? GREEN : GREY_CARD, color: filter===f ? "#fff" : MUTED, fontSize: 9.5, fontWeight: filter===f ? 600 : 400 }}>
            {f}
          </button>
        ))}
      </div>

      {/* Orders list – fixed height no scroll */}
      <div className="flex flex-col gap-2 flex-1">
        {shown.slice(0, 4).map(order => {
          const s = sBadge(order.status);
          return (
            <Card key={order.id}>
              <div className="flex justify-between items-start mb-1.5">
                <div className="flex-1 mr-2">
                  <p style={{ fontWeight: 600, fontSize: 10 }}>{order.name}</p>
                  <p style={{ fontSize: 8.5, color: MUTED }}>{order.id} · {order.date}</p>
                </div>
                <Badge label={order.status} color={s.color} bg={s.bg} />
              </div>
              <div className="flex justify-between items-center" style={{ borderTop:`1px solid ${GREY_BORDER}`, paddingTop: 5 }}>
                <div className="flex items-center gap-1.5">
                  <Badge label={order.type} color={BLUE} bg={BLUE_LIGHT} />
                  <span style={{ fontWeight: 700, fontSize: 11 }}>{order.amount}</span>
                </div>
                <div className="flex gap-1">
                  {order.status === "Pending" && (
                    <button className="rounded-lg px-2 py-1" style={{ backgroundColor: GREEN, color:"#fff", fontSize: 8.5, fontWeight: 600 }}>Pay Now</button>
                  )}
                  <button className="rounded-lg px-2 py-1" style={{ backgroundColor:"#fff", color: TEXT, fontSize: 8.5, border:`1px solid ${GREY_BORDER}` }}>View</button>
                </div>
              </div>
            </Card>
          );
        })}
        {shown.length > 4 && (
          <p style={{ textAlign:"center", fontSize: 9, color: MUTED }}>+{shown.length - 4} more orders</p>
        )}
      </div>
    </div>
  );
}

// ── DASHBOARD SCREEN ──────────────────────────────────────────────────────────
const donutData = [
  { name:"Used",      value: 18, color: GREEN },
  { name:"Remaining", value: 4,  color: "#E0E0E0" },
];
const barData = [
  { day:"Mon", hrs: 8.5 },
  { day:"Tue", hrs: 7.2 },
  { day:"Wed", hrs: 9.0 },
  { day:"Thu", hrs: 6.8 },
  { day:"Fri", hrs: 8.1 },
  { day:"Sat", hrs: 3.5 },
];

function Ring({ pct, size = 66 }: { pct: number; size?: number }) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform:"rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#E8E8E8" strokeWidth={8} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={GREEN} strokeWidth={8}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
        style={{ transform:"rotate(90deg)", transformOrigin:"center", fill:TEXT, fontSize:13, fontWeight:700 }}>
        {pct}%
      </text>
    </svg>
  );
}

function DashboardScreen() {
  return (
    <div className="flex flex-col gap-2 px-3 pb-2 pt-2 flex-1" style={{ fontSize: 11, overflow:"hidden" }}>
      <p style={{ fontWeight: 700, fontSize: 14 }}>Dashboard</p>

      {/* Membership Overview */}
      <Card>
        <SectionTitle>Membership Overview</SectionTitle>
        <div className="grid grid-cols-4 gap-1">
          {[["Plan","Dedicated Desk"],["Branch","Gulshan"],["Till","30 Jun 2025"],["Status","Active"]].map(([l,v]) => (
            <div key={l}>
              <p style={{ fontSize: 8, color: MUTED }}>{l}</p>
              <p style={{ fontWeight: 600, fontSize: 9, color: l==="Status" ? GREEN : TEXT }}>{v}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Attendance + Usage */}
      <div className="grid grid-cols-2 gap-2">
        <Card>
          <p style={{ fontWeight: 600, fontSize: 10, marginBottom: 3 }}>Attendance</p>
          <div className="flex items-center gap-2">
            <Ring pct={32} size={62} />
            <div>
              <p style={{ fontSize: 8, color: MUTED }}>Days In</p>
              <p style={{ fontWeight: 700, fontSize: 13, color: GREEN }}>7</p>
              <p style={{ fontSize: 8, color: MUTED, marginTop: 2 }}>of 22 days</p>
            </div>
          </div>
        </Card>
        <Card>
          <p style={{ fontWeight: 600, fontSize: 10, marginBottom: 3 }}>Usage</p>
          <ResponsiveContainer width="100%" height={62}>
            <PieChart>
              <Pie data={donutData} cx="50%" cy="50%" innerRadius={18} outerRadius={28} dataKey="value" startAngle={90} endAngle={-270}>
                {donutData.map(d => <Cell key={`du-${d.name}`} fill={d.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-around mt-1">
            {donutData.map(d => (
              <div key={d.name} className="flex items-center gap-1">
                <div style={{ width: 5, height: 5, borderRadius:"50%", backgroundColor: d.color }} />
                <span style={{ fontSize: 7.5, color: MUTED }}>{d.name} {d.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Weekly Bar Chart */}
      <Card>
        <SectionTitle>Weekly Attendance (hrs)</SectionTitle>
        <ResponsiveContainer width="100%" height={72}>
          <BarChart data={barData} barSize={11} margin={{ top:0, right:0, left:-22, bottom:0 }}>
            <XAxis dataKey="day" tick={{ fontSize: 8, fill: MUTED }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 7, fill: MUTED }} axisLine={false} tickLine={false} />
            <Bar dataKey="hrs" fill={GREEN} radius={[3,3,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Booking + Payment row */}
      <div className="grid grid-cols-2 gap-2">
        <Card>
          <p style={{ fontWeight:600, fontSize:10, marginBottom:4 }}>Bookings</p>
          <div className="flex justify-between">
            {[{l:"Total",v:8,c:TEXT},{l:"Done",v:6,c:GREEN},{l:"Soon",v:2,c:BLUE}].map(({l,v,c})=>(
              <div key={l} className="text-center">
                <p style={{ fontWeight:700, fontSize:13, color:c }}>{v}</p>
                <p style={{ fontSize:7.5, color:MUTED }}>{l}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <p style={{ fontWeight:600, fontSize:10, marginBottom:4 }}>Payments</p>
          {[{l:"Last",v:"৳12,000",c:GREEN},{l:"Due",v:"৳12,000",c:ORANGE}].map(({l,v,c})=>(
            <div key={l} className="flex justify-between items-center py-0.5">
              <p style={{ fontSize:8.5, color:MUTED }}>{l}</p>
              <p style={{ fontWeight:700, fontSize:9.5, color:c }}>{v}</p>
            </div>
          ))}
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <SectionTitle>Recent Activity</SectionTitle>
        {[
          { label:"Checked in at Gulshan",       time:"Today, 9:14 AM",     color:GREEN },
          { label:"Booked Meeting Room – Orchid", time:"13 Jun, 3:00 PM",   color:BLUE },
          { label:"Payment ৳12,000 received",     time:"01 Jun, 10:00 AM",  color:GREEN },
        ].map((item,i)=>(
          <div key={i} className="flex gap-2 items-start py-1" style={{ borderBottom: i<2 ? `1px solid ${GREY_BORDER}` : "none" }}>
            <div style={{ width:5, height:5, borderRadius:"50%", backgroundColor:item.color, marginTop:4, flexShrink:0 }} />
            <div>
              <p style={{ fontSize:9.5 }}>{item.label}</p>
              <p style={{ fontSize:8, color:MUTED }}>{item.time}</p>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

// ── PROFILE SCREEN ────────────────────────────────────────────────────────────
function InfoGroup({ title, rows }: { title: string; rows: [string, string, string][] }) {
  return (
    <Card>
      <p style={{ fontWeight: 600, fontSize: 10, color: MUTED, marginBottom: 4, textTransform:"uppercase", letterSpacing:"0.04em" }}>{title}</p>
      {rows.map(([icon, label, value], i) => (
        <div key={label} className="flex items-start gap-2 py-1.5"
          style={{ borderBottom: i < rows.length - 1 ? `1px solid ${GREY_BORDER}` : "none" }}>
          <Icon d={icon} size={12} color={GREEN} />
          <div className="flex-1 min-w-0">
            <p style={{ fontSize: 8.5, color: MUTED }}>{label}</p>
            <p style={{ fontSize: 9.5, fontWeight: 500, wordBreak:"break-word" }}>{value}</p>
          </div>
        </div>
      ))}
    </Card>
  );
}

const ICONS = {
  email:    "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  phone:    "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
  company:  "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  id:       "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1",
  doc:      "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  calendar: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  person:   "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  work:     "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01",
  location: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
  clock:    "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  contract: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
};

function ProfileScreen() {
  return (
    <div className="flex flex-col gap-2 px-3 pb-2 pt-2 flex-1" style={{ fontSize: 11, overflow:"hidden" }}>
      <p style={{ fontWeight: 700, fontSize: 14 }}>My Profile</p>

      {/* Avatar */}
      <div className="flex items-center gap-3">
        <div style={{ position:"relative", flexShrink: 0 }}>
          <div style={{ width:56, height:56, borderRadius:"50%", backgroundColor: GREEN_LIGHT, display:"flex", alignItems:"center", justifyContent:"center", border:`2.5px solid ${GREEN}` }}>
            <Icon d={ICONS.person} size={26} color={GREEN} />
          </div>
          {/* Upload button */}
          <button style={{
            position:"absolute", bottom:0, right:0,
            width:18, height:18, borderRadius:"50%",
            backgroundColor: GREEN, color:"#fff",
            fontSize:14, fontWeight:700,
            display:"flex", alignItems:"center", justifyContent:"center",
            border:"2px solid #fff", lineHeight:1,
          }}>+</button>
        </div>
        <div>
          <p style={{ fontWeight: 700, fontSize: 13 }}>Arif Hossain</p>
          <p style={{ fontSize: 9, color: MUTED }}>MBR-2847 · Member since Jan 2024</p>
          <div className="flex gap-1 mt-1">
            <Badge label="Active Member" />
            <Badge label="Dedicated Desk" color={BLUE} bg={BLUE_LIGHT} />
          </div>
        </div>
      </div>

      {/* Grouped info */}
      <InfoGroup title="Contact" rows={[
        [ICONS.email,   "Email",   "arif.hossain@gmail.com"],
        [ICONS.phone,   "Phone",   "+880 1712 345 678"],
        [ICONS.company, "Company", "Tech Solutions Ltd."],
      ]} />

      <InfoGroup title="Identity & Documents" rows={[
        [ICONS.id,       "Member ID",       "MBR-2847"],
        [ICONS.doc,      "NID",             "1234567890123"],
        [ICONS.doc,      "Trade License",   "TL-987654-2024"],
        [ICONS.contract, "Contract",        "View Contract →"],
      ]} />

      <InfoGroup title="Membership" rows={[
        [ICONS.clock,    "Member Since",  "15 January 2024"],
        [ICONS.calendar, "Date of Birth", "15 March 1990"],
        [ICONS.person,   "Nominee",       "Sadia Hossain"],
        [ICONS.work,     "Occupation",    "Software Engineer"],
      ]} />

      <InfoGroup title="Address" rows={[
        [ICONS.location, "Present Address", "House 12, Road 5, Dhanmondi, Dhaka 1205"],
        [ICONS.location, "Branch Location", "Gulshan Link Road, Dhaka"],
      ]} />

      {/* QR row */}
      <Card className="flex items-center gap-3">
        <div style={{ width:52, height:52, backgroundColor:"#fff", border:`1px solid ${GREY_BORDER}`, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <svg width="40" height="40" viewBox="0 0 56 56">
            {(() => {
              const pat = [[1,1,1,1,1,1,1],[1,0,0,0,0,0,1],[1,0,1,1,1,0,1],[1,0,1,0,1,0,1],[1,0,1,1,1,0,1],[1,0,0,0,0,0,1],[1,1,1,1,1,1,1]];
              const cells: React.ReactNode[] = [];
              for (let r=0;r<7;r++) for (let c=0;c<7;c++)
                if (pat[r][c]) cells.push(<rect key={`q-${r}-${c}`} x={c*8} y={r*8} width={7} height={7} fill="#111" rx={1} />);
              return cells;
            })()}
            <rect x={22} y={22} width={12} height={12} fill={GREEN} rx={2} />
          </svg>
        </div>
        <div className="flex-1">
          <p style={{ fontWeight:600, fontSize:10 }}>Member QR Code</p>
          <p style={{ fontSize:8.5, color:MUTED }}>Scan to verify membership</p>
          <button style={{ marginTop:4, backgroundColor: GREEN_LIGHT, color:GREEN, fontSize:8.5, fontWeight:600, borderRadius:6, padding:"2px 10px" }}>View Full QR</button>
        </div>
      </Card>
    </div>
  );
}

// ── PHONE FRAME ───────────────────────────────────────────────────────────────
function PhoneFrame({ screen, label }: { screen: string; label: string }) {
  const [active, setActive] = useState(screen);

  const renderScreen = () => {
    switch (active) {
      case "home":      return <HomeScreen />;
      case "orders":    return <OrdersScreen />;
      case "dashboard": return <DashboardScreen />;
      case "profile":   return <ProfileScreen />;
      default:          return <HomeScreen />;
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 flex-shrink-0">
      <p style={{ fontSize:10, fontWeight:600, color:MUTED, textTransform:"uppercase", letterSpacing:"0.06em" }}>{label}</p>
      <div style={{
        width: 300,
        height: 660,
        backgroundColor: "#fff",
        borderRadius: 32,
        border: `2px solid ${GREY_BORDER}`,
        boxShadow: "0 8px 36px rgba(0,0,0,0.11)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "Inter, system-ui, sans-serif",
      }}>
        {/* Status bar */}
        <div className="flex justify-between items-center px-4 pt-2.5 pb-1 flex-shrink-0">
          <span style={{ fontSize:10, fontWeight:700 }}>9:41</span>
          <div className="flex gap-1 items-center">
            <Icon d="M1.5 8.5c2.5-2.5 5.5-4 10.5-4s8 1.5 10.5 4" size={10} color={TEXT} sw={1.8} />
            <Icon d="M1 1h4v7H1zM9 3h4v5H9zM17 5h4v3h-4z" size={10} color={TEXT} sw={1.5} />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col min-h-0">
          {renderScreen()}
        </div>

        <BottomNav active={active} onTab={setActive} />
      </div>
    </div>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#EBEBEB",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      padding: "28px 20px",
      fontFamily: "Inter, system-ui, sans-serif",
      overflowX: "auto",
    }}>
      <div className="flex gap-5 items-start">
        <PhoneFrame screen="home"      label="Home" />
        <PhoneFrame screen="orders"    label="Orders" />
        <PhoneFrame screen="dashboard" label="Dashboard" />
        <PhoneFrame screen="profile"   label="Profile" />
      </div>
    </div>
  );
}

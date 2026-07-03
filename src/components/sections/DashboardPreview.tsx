"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Activity,
  Users,
  Compass,
  MapPin,
  Car,
  Bell,
  CheckCircle,
  Database,
  TrendingUp,
  FileText
} from "lucide-react";
import styles from "./DashboardPreview.module.css";

type TabId = "clinic" | "gym" | "travel" | "rideecho" | "leadengine";

export const DashboardPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>("rideecho");

  // State for Gym check-in stream simulation
  const [checkIns, setCheckIns] = useState([
    { id: 1, name: "Marcus Aurelius", time: "Just now", status: "Active" },
    { id: 2, name: "Sarah Jenkins", time: "2 min ago", status: "Active" },
    { id: 3, name: "David Miller", time: "5 min ago", status: "Expired" },
    { id: 4, name: "Elena Rostova", time: "8 min ago", status: "Active" },
  ]);

  // State for AI Lead Engine logs simulation
  const [leadLogs, setLeadLogs] = useState<string[]>([
    "System initialized. Global crawler pipeline active.",
    "Targeting SaaS firms matching parameters: size=10-100, funding=seed/series-A.",
    "Database Sync: Connected to Postgres lead queue.",
  ]);

  // Simulated live updates for Gym
  useEffect(() => {
    if (activeTab !== "gym") return;
    const interval = setInterval(() => {
      const names = ["John Connor", "Diana Prince", "Clark Kent", "Bruce Wayne", "Selina Kyle", "Arthur Curry"];
      const randomName = names[Math.floor(Math.random() * names.length)];
      setCheckIns((prev) => [
        {
          id: Date.now(),
          name: randomName,
          time: "Just now",
          status: Math.random() > 0.15 ? "Active" : "Expired",
        },
        ...prev.slice(0, 3),
      ]);
    }, 4500);

    return () => clearInterval(interval);
  }, [activeTab]);

  // Simulated live updates for AI Lead Engine
  useEffect(() => {
    if (activeTab !== "leadengine") return;
    const interval = setInterval(() => {
      const targets = [
        "Lara Croft (CTO, Croft Explorations)",
        "Stark Industries (VP Eng: Pepper Potts)",
        "Velo Corp (VP Operations: John Connor)",
        "Dunder Mifflin (Manager: Michael Scott)",
        "Wayne Enterprises (CIO: Lucius Fox)"
      ];
      const randomTarget = targets[Math.floor(Math.random() * targets.length)];
      
      const newLogs = [
        `[CRAWLER] Scraped profiles matching domain details for ${randomTarget.split(" (")[0]}`,
        `[LLM COGNITIVE] Analyzing tech stack and drafting highly personalized brief...`,
        `[SENDGRID API] Outbound intake brief successfully dispatched to inbox.`
      ];

      setLeadLogs((prev) => [...prev, ...newLogs].slice(-8));
    }, 4000);

    return () => clearInterval(interval);
  }, [activeTab]);

  return (
    <section id="demo" className={styles.section}>
      <div className="container">
        <div className={styles.headerArea}>
          <span className="gradient-accent-text font-bold text-sm tracking-wider uppercase">Enterprise Ecosystems</span>
          <h2 className={styles.title}>Explore the Systems We Engineer</h2>
          <p className={styles.subtitle}>
            We build production-grade, highly responsive web portals and management platforms using strict TypeScript architecture. Click the tabs below to interact with live dashboard previews.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className={styles.tabContainer}>
          <button
            onClick={() => setActiveTab("clinic")}
            className={`${styles.tabBtn} ${activeTab === "clinic" ? styles.activeTab : ""}`}
          >
            <Activity size={18} />
            <span>Clinic Management</span>
          </button>
          <button
            onClick={() => setActiveTab("gym")}
            className={`${styles.tabBtn} ${activeTab === "gym" ? styles.activeTab : ""}`}
          >
            <Users size={18} />
            <span>Gym Ecosystem</span>
          </button>
          <button
            onClick={() => setActiveTab("travel")}
            className={`${styles.tabBtn} ${activeTab === "travel" ? styles.activeTab : ""}`}
          >
            <Compass size={18} />
            <span>Travel Agency System</span>
          </button>
          <button
            onClick={() => setActiveTab("rideecho")}
            className={`${styles.tabBtn} ${activeTab === "rideecho" ? styles.activeTab : ""}`}
          >
            <Car size={18} />
            <span>RideEcho Mobility</span>
          </button>
          <button
            onClick={() => setActiveTab("leadengine")}
            className={`${styles.tabBtn} ${activeTab === "leadengine" ? styles.activeTab : ""}`}
          >
            <TrendingUp size={18} />
            <span>AI Lead Engine</span>
          </button>
        </div>

        {/* Mock Browser Frame */}
        <div className={styles.browserFrame}>
          <div className={styles.browserHeader}>
            <div className={styles.browserDots}>
              <span className={styles.dotRed}></span>
              <span className={styles.dotYellow}></span>
              <span className={styles.dotGreen}></span>
            </div>
            <div className={styles.browserAddress}>
              <span className={styles.lockIcon}>🔒</span>
              <span>https://client-portal.syntilo.tech/{activeTab}</span>
            </div>
            <div className={styles.statusIndicator}>
              <span className={styles.pulseDot}></span>
              <span className={styles.statusText}>LIVE SYSTEM</span>
            </div>
          </div>

          <div className={styles.browserBody}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className={styles.dashboardContainer}
              >
                {/* CLINIC MANAGEMENT */}
                {activeTab === "clinic" && (
                  <div className={styles.dashboardGrid}>
                    {/* Stats */}
                    <div className={styles.statsRow}>
                      <div className={styles.dashboardStatCard}>
                        <span className={styles.statTitle}>Active Patients</span>
                        <span className={styles.statValue}>1,482</span>
                        <span className={`${styles.statBadge} ${styles.greenBadge}`}>+12% this week</span>
                      </div>
                      <div className={styles.dashboardStatCard}>
                        <span className={styles.statTitle}>Lab Results Pending</span>
                        <span className={styles.statValue}>14</span>
                        <span className={`${styles.statBadge} ${styles.yellowBadge}`}>4 high priority</span>
                      </div>
                      <div className={styles.dashboardStatCard}>
                        <span className={styles.statTitle}>Prescriptions Processed</span>
                        <span className={styles.statValue}>384</span>
                        <span className={`${styles.statBadge} ${styles.greenBadge}`}>100% automated</span>
                      </div>
                    </div>

                    {/* Inner content widgets */}
                    <div className={styles.widgetsGrid}>
                      <div className={styles.widgetCard}>
                        <div className={styles.widgetHeader}>
                          <Calendar size={16} />
                          <h3>Patient Bookings Calendar</h3>
                        </div>
                        <ul className={styles.list}>
                          <li className={styles.listItem}>
                            <div>
                              <p className={styles.listMain}>Sarah Connor</p>
                              <p className={styles.listSub}>General Practitioner Checkup</p>
                            </div>
                            <span className={styles.listTime}>09:00 AM</span>
                          </li>
                          <li className={styles.listItem}>
                            <div>
                              <p className={styles.listMain}>Bruce Wayne</p>
                              <p className={styles.listSub}>Orthopedic Consultation</p>
                            </div>
                            <span className={styles.listTime}>10:30 AM</span>
                          </li>
                          <li className={styles.listItem}>
                            <div>
                              <p className={styles.listMain}>Clark Kent</p>
                              <p className={styles.listSub}>Ophthalmology Scan</p>
                            </div>
                            <span className={styles.listTime}>01:15 PM</span>
                          </li>
                        </ul>
                      </div>

                      <div className={styles.widgetCard}>
                        <div className={styles.widgetHeader}>
                          <Database size={16} />
                          <h3>Laboratory Queue Status</h3>
                        </div>
                        <ul className={styles.list}>
                          <li className={styles.listItem}>
                            <div>
                              <p className={styles.listMain}>Hematology Scan #408</p>
                              <p className={styles.listSub}>Patient: Diana Prince</p>
                            </div>
                            <span className={`${styles.statusLabel} ${styles.statusGreen}`}>Complete</span>
                          </li>
                          <li className={styles.listItem}>
                            <div>
                              <p className={styles.listMain}>Toxicology Report #901</p>
                              <p className={styles.listSub}>Patient: John Smith</p>
                            </div>
                            <span className={`${styles.statusLabel} ${styles.statusYellow}`}>Processing</span>
                          </li>
                          <li className={styles.listItem}>
                            <div>
                              <p className={styles.listMain}>DNA Sequence Analysis</p>
                              <p className={styles.listSub}>Patient: Barry Allen</p>
                            </div>
                            <span className={`${styles.statusLabel} ${styles.statusPurple}`}>Analyzing</span>
                          </li>
                        </ul>
                      </div>

                      <div className={styles.widgetCard}>
                        <div className={styles.widgetHeader}>
                          <TrendingUp size={16} />
                          <h3>Pharmacy Inventory Levels</h3>
                        </div>
                        <div className={styles.chartContainer}>
                          {/* Custom SVG Line Chart */}
                          <svg className={styles.chartSvg} viewBox="0 0 300 120">
                            <defs>
                              <linearGradient id="clinicGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                              </linearGradient>
                            </defs>
                            {/* Grid Lines */}
                            <line x1="0" y1="20" x2="300" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                            <line x1="0" y1="60" x2="300" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                            <line x1="0" y1="100" x2="300" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                            {/* Area Path */}
                            <path
                              d="M 0 100 Q 50 40 100 80 T 200 30 T 300 10 L 300 120 L 0 120 Z"
                              fill="url(#clinicGrad)"
                            />
                            {/* Line Path */}
                            <path
                              d="M 0 100 Q 50 40 100 80 T 200 30 T 300 10"
                              fill="none"
                              stroke="#6366f1"
                              strokeWidth="3"
                              strokeLinecap="round"
                            />
                            {/* Glowing Dots */}
                            <circle cx="100" cy="80" r="5" fill="#7c3aed" />
                            <circle cx="200" cy="30" r="5" fill="#7c3aed" />
                          </svg>
                          <div className={styles.chartLabels}>
                            <span>Mon</span>
                            <span>Wed</span>
                            <span>Fri</span>
                            <span>Sun</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* GYM ECOSYSTEM */}
                {activeTab === "gym" && (
                  <div className={styles.dashboardGrid}>
                    <div className={styles.statsRow}>
                      <div className={styles.dashboardStatCard}>
                        <span className={styles.statTitle}>Active Gym Members</span>
                        <span className={styles.statValue}>3,412</span>
                        <span className={`${styles.statBadge} ${styles.greenBadge}`}>+8.4% this month</span>
                      </div>
                      <div className={styles.dashboardStatCard}>
                        <span className={styles.statTitle}>Current Check-Ins</span>
                        <span className={styles.statValue}>184</span>
                        <span className={`${styles.statBadge} ${styles.greenBadge}`}>Peak hours active</span>
                      </div>
                      <div className={styles.dashboardStatCard}>
                        <span className={styles.statTitle}>Billing Collection</span>
                        <span className={styles.statValue}>98.9%</span>
                        <span className={`${styles.statBadge} ${styles.greenBadge}`}>0.2% delinquencies</span>
                      </div>
                    </div>

                    <div className={styles.widgetsGrid}>
                      <div className={styles.widgetCard}>
                        <div className={styles.widgetHeader}>
                          <TrendingUp size={16} />
                          <h3>Subscription Growth</h3>
                        </div>
                        <div className={styles.chartContainer}>
                          {/* SVG Bar Chart */}
                          <svg className={styles.chartSvg} viewBox="0 0 300 120">
                            {/* Bar 1 */}
                            <rect x="20" y="80" width="24" height="40" rx="4" fill="#e0e7ff" />
                            <rect x="20" y="90" width="24" height="30" rx="4" fill="#6366f1" />
                            {/* Bar 2 */}
                            <rect x="75" y="60" width="24" height="60" rx="4" fill="#e0e7ff" />
                            <rect x="75" y="75" width="24" height="45" rx="4" fill="#6366f1" />
                            {/* Bar 3 */}
                            <rect x="130" y="40" width="24" height="80" rx="4" fill="#e0e7ff" />
                            <rect x="130" y="50" width="24" height="70" rx="4" fill="#7c3aed" />
                            {/* Bar 4 */}
                            <rect x="185" y="20" width="24" height="100" rx="4" fill="#e0e7ff" />
                            <rect x="185" y="35" width="24" height="85" rx="4" fill="#7c3aed" />
                            {/* Bar 5 */}
                            <rect x="240" y="10" width="24" height="110" rx="4" fill="#e9e3ff" />
                            <rect x="240" y="15" width="24" height="105" rx="4" fill="#4f46e5" />
                          </svg>
                          <div className={styles.chartLabels}>
                            <span>Feb</span>
                            <span>Mar</span>
                            <span>Apr</span>
                            <span>May</span>
                            <span>Jun</span>
                          </div>
                        </div>
                      </div>

                      <div className={styles.widgetCard}>
                        <div className={styles.widgetHeader}>
                          <Users size={16} />
                          <h3>Live Member Check-Ins</h3>
                        </div>
                        <div className={styles.checkInStream}>
                          <AnimatePresence>
                            {checkIns.map((person) => (
                              <motion.div
                                key={person.id}
                                initial={{ opacity: 0, x: -20, height: 0 }}
                                animate={{ opacity: 1, x: 0, height: "auto" }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                                className={styles.checkInRow}
                              >
                                <div className={styles.checkInDot}></div>
                                <div className={styles.checkInInfo}>
                                  <span className={styles.checkInName}>{person.name}</span>
                                  <span className={styles.checkInTime}>{person.time}</span>
                                </div>
                                <span
                                  className={`${styles.checkInBadge} ${
                                    person.status === "Active" ? styles.greenCheck : styles.redCheck
                                  }`}
                                >
                                  {person.status}
                                </span>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                      </div>

                      <div className={styles.widgetCard}>
                        <div className={styles.widgetHeader}>
                          <Bell size={16} />
                          <h3>Automated Billing Alerts</h3>
                        </div>
                        <div className={styles.billingAlerts}>
                          <div className={`${styles.billingAlert} ${styles.alertWarn}`}>
                            <span className={styles.alertIcon}>⚠️</span>
                            <div>
                              <p className={styles.alertText}>Auto-Billing Fail</p>
                              <p className={styles.alertSub}>Card expired: Michael Scott</p>
                            </div>
                          </div>
                          <div className={`${styles.billingAlert} ${styles.alertSuccess}`}>
                            <span className={styles.alertIcon}>✓</span>
                            <div>
                              <p className={styles.alertText}>Invoice Dispatched</p>
                              <p className={styles.alertSub}>408 corporate plans billed</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TRAVEL AGENCY SYSTEM */}
                {activeTab === "travel" && (
                  <div className={styles.dashboardGrid}>
                    <div className={styles.statsRow}>
                      <div className={styles.dashboardStatCard}>
                        <span className={styles.statTitle}>Bookings Month-to-Date</span>
                        <span className={styles.statValue}>682</span>
                        <span className={`${styles.statBadge} ${styles.greenBadge}`}>+18.1% vs May</span>
                      </div>
                      <div className={styles.dashboardStatCard}>
                        <span className={styles.statTitle}>Commission Split</span>
                        <span className={styles.statValue}>15.2%</span>
                        <span className={`${styles.statBadge} ${styles.greenBadge}`}>Avg. margin target</span>
                      </div>
                      <div className={styles.dashboardStatCard}>
                        <span className={styles.statTitle}>Active Itineraries</span>
                        <span className={styles.statValue}>142</span>
                        <span className={`${styles.statBadge} ${styles.greenBadge}`}>Automated sync enabled</span>
                      </div>
                    </div>

                    <div className={styles.widgetsGrid}>
                      <div className={`${styles.widgetCard} ${styles.gridSpan2}`}>
                        <div className={styles.widgetHeader}>
                          <Compass size={16} />
                          <h3>Global Client Destination Map</h3>
                        </div>
                        <div className={styles.mapContainer}>
                          {/* Stylized World Outline Map */}
                          <svg className={styles.mapSvg} viewBox="0 0 600 240" fill="none" stroke="#e2e8f0" strokeWidth="1.5">
                            {/* North America */}
                            <path d="M 80 50 Q 120 40 140 70 T 160 110 T 120 130 Z" fill="#f8fafc" />
                            {/* South America */}
                            <path d="M 140 140 Q 180 150 170 190 T 150 230 Z" fill="#f8fafc" />
                            {/* Europe */}
                            <path d="M 280 40 Q 320 30 340 70 T 320 100 Z" fill="#f8fafc" />
                            {/* Africa */}
                            <path d="M 280 110 Q 330 110 350 150 T 310 210 Z" fill="#f8fafc" />
                            {/* Asia */}
                            <path d="M 360 40 Q 480 30 520 80 T 440 140 Z" fill="#f8fafc" />
                            {/* Australia */}
                            <path d="M 470 160 Q 530 170 510 210 Z" fill="#f8fafc" />

                            {/* Trip Routes - Dash Array Animations */}
                            <path d="M 120 80 Q 220 30 300 60" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="5,5" className={styles.routeAnimation} />
                            <path d="M 300 60 Q 400 90 480 100" fill="none" stroke="#7c3aed" strokeWidth="2" strokeDasharray="5,5" className={styles.routeAnimation} />
                            
                            {/* Pulsing City Nodes */}
                            <circle cx="120" cy="80" r="6" fill="#6366f1" className={styles.pulseNode} />
                            <circle cx="300" cy="60" r="6" fill="#7c3aed" className={styles.pulseNode} />
                            <circle cx="480" cy="100" r="6" fill="#4f46e5" className={styles.pulseNode} />

                            <text x="130" y="80" fill="#0f172a" fontSize="10" fontWeight="bold">New York</text>
                            <text x="310" y="55" fill="#0f172a" fontSize="10" fontWeight="bold">London</text>
                            <text x="490" y="105" fill="#0f172a" fontSize="10" fontWeight="bold">Tokyo</text>
                          </svg>
                        </div>
                      </div>

                      <div className={styles.widgetCard}>
                        <div className={styles.widgetHeader}>
                          <FileText size={16} />
                          <h3>Live Itinerary Status</h3>
                        </div>
                        <ul className={styles.list}>
                          <li className={styles.listItem}>
                            <div>
                              <p className={styles.listMain}>Itinerary #8942</p>
                              <p className={styles.listSub}>Client: Stark Industries</p>
                            </div>
                            <span className={`${styles.statusLabel} ${styles.statusGreen}`}>Generated</span>
                          </li>
                          <li className={styles.listItem}>
                            <div>
                              <p className={styles.listMain}>Itinerary #8943</p>
                              <p className={styles.listSub}>Client: Wayne Enterprises</p>
                            </div>
                            <span className={`${styles.statusLabel} ${styles.statusGreen}`}>Sent</span>
                          </li>
                          <li className={styles.listItem}>
                            <div>
                              <p className={styles.listMain}>Itinerary #8944</p>
                              <p className={styles.listSub}>Client: Croft Corp</p>
                            </div>
                            <span className={`${styles.statusLabel} ${styles.statusYellow}`}>Pending Sync</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* RIDEECHO MOBILITY */}
                {activeTab === "rideecho" && (
                  <div className={styles.dashboardGrid}>
                    <div className={styles.statsRow}>
                      <div className={styles.dashboardStatCard}>
                        <span className={styles.statTitle}>Online Fleet Drivers</span>
                        <span className={styles.statValue}>142</span>
                        <span className={`${styles.statBadge} ${styles.greenBadge}`}>94% utilization</span>
                      </div>
                      <div className={styles.dashboardStatCard}>
                        <span className={styles.statTitle}>Active Trips</span>
                        <span className={styles.statValue}>89</span>
                        <span className={`${styles.statBadge} ${styles.greenBadge}`}>12 in queue</span>
                      </div>
                      <div className={styles.dashboardStatCard}>
                        <span className={styles.statTitle}>Avg Dispatch Latency</span>
                        <span className={styles.statValue}>2.8s</span>
                        <span className={`${styles.statBadge} ${styles.greenBadge}`}>Sub-second routing</span>
                      </div>
                    </div>

                    <div className={styles.widgetsGrid}>
                      <div className={`${styles.widgetCard} ${styles.gridSpan2}`}>
                        <div className={styles.widgetHeader}>
                          <MapPin size={16} />
                          <h3>Real-time Fleet Dispatch Simulator</h3>
                        </div>
                        <div className={styles.mapContainer}>
                          {/* Mini Map simulation */}
                          <svg className={styles.mapSvg} viewBox="0 0 400 150">
                            {/* Grid/Streets */}
                            <line x1="0" y1="30" x2="400" y2="30" stroke="#e2e8f0" strokeWidth="4" />
                            <line x1="0" y1="75" x2="400" y2="75" stroke="#e2e8f0" strokeWidth="4" />
                            <line x1="0" y1="120" x2="400" y2="120" stroke="#e2e8f0" strokeWidth="4" />
                            
                            <line x1="50" y1="0" x2="50" y2="150" stroke="#e2e8f0" strokeWidth="4" />
                            <line x1="150" y1="0" x2="150" y2="150" stroke="#e2e8f0" strokeWidth="4" />
                            <line x1="250" y1="0" x2="250" y2="150" stroke="#e2e8f0" strokeWidth="4" />
                            <line x1="350" y1="0" x2="350" y2="150" stroke="#e2e8f0" strokeWidth="4" />

                            {/* Driver path */}
                            <path id="driverRoute" d="M 50 30 L 150 30 L 150 120 L 350 120" fill="none" stroke="rgba(99, 102, 241, 0.15)" strokeWidth="6" strokeLinecap="round" />

                            {/* Dotted path indicators */}
                            <path d="M 50 30 L 150 30 L 150 120 L 350 120" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="4,4" strokeLinecap="round" />

                            {/* Dispatch pickup & drop pins */}
                            <circle cx="50" cy="30" r="6" fill="#10b981" />
                            <circle cx="350" cy="120" r="6" fill="#ef4444" />

                            {/* Moving Car Icon along path using Framer Motion */}
                            <motion.g
                              animate={{
                                x: [50, 150, 150, 350],
                                y: [30, 30, 120, 120]
                              }}
                              transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "linear"
                              }}
                            >
                              <circle cx="0" cy="0" r="8" fill="#7c3aed" stroke="#ffffff" strokeWidth="2" />
                              <circle cx="0" cy="0" r="3" fill="#ffffff" />
                            </motion.g>
                          </svg>
                          <div className={styles.mapLegend}>
                            <span className={styles.legendItem}><span className={styles.dotGreen}></span> Pickup (Point A)</span>
                            <span className={styles.legendItem}><span className={styles.dotRed}></span> Dropoff (Point B)</span>
                            <span className={styles.legendItem}><span className={styles.dotPurple}></span> Active Transit (Driver)</span>
                          </div>
                        </div>
                      </div>

                      <div className={styles.widgetCard}>
                        <div className={styles.widgetHeader}>
                          <Car size={16} />
                          <h3>Operations Dispatch Log</h3>
                        </div>
                        <ul className={styles.list}>
                          <li className={styles.listItem}>
                            <div>
                              <p className={styles.listMain}>Ride #1094 Dispatched</p>
                              <p className={styles.listSub}>Driver ID: #302 (Model S)</p>
                            </div>
                            <span className={`${styles.statusLabel} ${styles.statusGreen}`}>Active</span>
                          </li>
                          <li className={styles.listItem}>
                            <div>
                              <p className={styles.listMain}>Routing Trigger #492</p>
                              <p className={styles.listSub}>Re-optimized path (Traffic)</p>
                            </div>
                            <span className={`${styles.statusLabel} ${styles.statusPurple}`}>Optimized</span>
                          </li>
                          <li className={styles.listItem}>
                            <div>
                              <p className={styles.listMain}>Booking #1095 Arrived</p>
                              <p className={styles.listSub}>Client: Sarah Connor</p>
                            </div>
                            <span className={`${styles.statusLabel} ${styles.statusGreen}`}>Completed</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* AI LEAD ENGINE */}
                {activeTab === "leadengine" && (
                  <div className={styles.dashboardGrid}>
                    <div className={styles.statsRow}>
                      <div className={styles.dashboardStatCard}>
                        <span className={styles.statTitle}>Active AI Crawlers</span>
                        <span className={styles.statValue}>8 Online</span>
                        <span className={`${styles.statBadge} ${styles.greenBadge}`}>100% thread safety</span>
                      </div>
                      <div className={styles.dashboardStatCard}>
                        <span className={styles.statTitle}>Global Outbox Actions</span>
                        <span className={styles.statValue}>1,482/day</span>
                        <span className={`${styles.statBadge} ${styles.greenBadge}`}>Automatic personalization</span>
                      </div>
                      <div className={styles.dashboardStatCard}>
                        <span className={styles.statTitle}>Conversion Lock Rate</span>
                        <span className={styles.statValue}>94.2%</span>
                        <span className={`${styles.statBadge} ${styles.greenBadge}`}>Qualified lead threshold</span>
                      </div>
                    </div>

                    <div className={styles.widgetsGrid}>
                      <div className={`${styles.widgetCard} ${styles.gridSpan2}`}>
                        <div className={styles.widgetHeader}>
                          <Database size={16} />
                          <h3>Live Outbound Scraper Logs</h3>
                        </div>
                        <div className={styles.leadConsole}>
                          <div className={styles.consoleWelcome}>
                            <span>SYNTILO OUTBOUND CRAWLER ENGINE v3.4.1</span>
                            <span>[TARGETING GLOBAL DIRECTORIES IN REAL TIME]</span>
                          </div>
                          <div className={styles.consoleLines}>
                            {leadLogs.map((log, idx) => (
                              <div key={idx} className={styles.consoleLine}>
                                <span className={styles.consolePrompt}>$&gt;</span>
                                <span className={styles.consoleText}>{log}</span>
                              </div>
                            ))}
                            <div className={styles.consoleBlink}>
                              <span className={styles.consolePrompt}>$&gt;</span>
                              <span className={styles.blinkingCursor}>|</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={styles.widgetCard}>
                        <div className={styles.widgetHeader}>
                          <CheckCircle size={16} />
                          <h3>Locked Deal Pipeline</h3>
                        </div>
                        <ul className={styles.list}>
                          <li className={styles.listItem}>
                            <div>
                              <p className={styles.listMain}>Lara Croft</p>
                              <p className={styles.listSub}>CTO, Croft Explorations</p>
                            </div>
                            <span className={`${styles.statusLabel} ${styles.statusGreen}`}>Meeting Booked</span>
                          </li>
                          <li className={styles.listItem}>
                            <div>
                              <p className={styles.listMain}>Pepper Potts</p>
                              <p className={styles.listSub}>VP Eng, Stark Industries</p>
                            </div>
                            <span className={`${styles.statusLabel} ${styles.statusGreen}`}>Call Scoped</span>
                          </li>
                          <li className={styles.listItem}>
                            <div>
                              <p className={styles.listMain}>John Connor</p>
                              <p className={styles.listSub}>VP Ops, Velo Corp</p>
                            </div>
                            <span className={`${styles.statusLabel} ${styles.statusYellow}`}>Email Dispatched</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

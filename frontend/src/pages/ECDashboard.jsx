import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Shield, Users, FileText, CheckCircle, Clock, XCircle,
  Search, Filter, Eye, ChevronDown, Download, LogOut,
  Menu, X, Home, Settings, BarChart3, AlertTriangle
} from "lucide-react";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "leaders", label: "Leader Submissions", icon: Users },
  { id: "verified", label: "Verified Leaders", icon: CheckCircle },
];

const leaderSubmissions = [
  {
    id: 1,
    name: "Rajesh Sharma",
    position: "Member of Parliament",
    constituency: "Mumbai North",
    submittedAt: "Jan 5, 2024",
    documents: { education: "pending", govtId: "verified", partyTicket: "pending", criminal: "pending" },
    status: "pending"
  },
  {
    id: 2,
    name: "Priya Patel",
    position: "MLA",
    constituency: "Ahmedabad East",
    submittedAt: "Jan 3, 2024",
    documents: { education: "verified", govtId: "verified", partyTicket: "verified", criminal: "verified" },
    status: "verified"
  },
  {
    id: 3,
    name: "Dr. Arun Kumar",
    position: "Municipal Councillor",
    constituency: "Bangalore Central",
    submittedAt: "Jan 2, 2024",
    documents: { education: "rejected", govtId: "verified", partyTicket: "pending", criminal: "pending" },
    status: "correction"
  },
];

const ECDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedLeader, setSelectedLeader] = useState(null);

  const stats = [
    { label: "Total Submissions", value: 156, icon: Users, color: "primary" },
    { label: "Pending Review", value: 42, icon: Clock, color: "accent" },
    { label: "Verified", value: 98, icon: CheckCircle, color: "secondary" },
    { label: "Needs Correction", value: 16, icon: AlertTriangle, color: "destructive" },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "verified":
        return <span className="px-2 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-medium">Verified</span>;
      case "pending":
        return <span className="px-2 py-1 rounded-full bg-accent/20 text-accent text-xs font-medium">Pending</span>;
      case "rejected":
        return <span className="px-2 py-1 rounded-full bg-destructive/20 text-destructive text-xs font-medium">Rejected</span>;
      case "correction":
        return <span className="px-2 py-1 rounded-full bg-accent/20 text-accent text-xs font-medium">Correction</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between">
        <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-primary-foreground/10 rounded-lg">
          <Menu className="w-6 h-6" />
        </button>
        <span className="font-heading font-bold">Election Commission</span>
        <div className="w-10" />
      </div>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-primary text-primary-foreground transform transition-transform lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 border-b border-primary-foreground/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-heading font-bold text-sm">Election Commission</h1>
                <p className="text-xs text-primary-foreground/70">Admin Portal</p>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <nav className="p-4">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeSection === item.id
                    ? 'bg-primary-foreground/20'
                    : 'hover:bg-primary-foreground/10'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-primary-foreground/20">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary-foreground/10 transition-all">
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </nav>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0">
        <div className="p-6 lg:p-8">
          {/* Dashboard */}
          {activeSection === "dashboard" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="font-heading text-2xl lg:text-3xl font-bold mb-6">Dashboard Overview</h1>

              {/* Stats */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-card border border-border"
                  >
                    <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${
                      stat.color === 'primary' ? 'bg-primary/10 text-primary' :
                      stat.color === 'secondary' ? 'bg-secondary/10 text-secondary' :
                      stat.color === 'accent' ? 'bg-accent/10 text-accent' :
                      'bg-destructive/10 text-destructive'
                    }`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <p className="text-3xl font-heading font-bold mb-1">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Recent Submissions */}
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="p-6 border-b border-border flex items-center justify-between">
                  <h2 className="font-heading font-semibold text-lg">Recent Submissions</h2>
                  <button
                    onClick={() => setActiveSection("leaders")}
                    className="text-sm text-primary font-medium hover:underline"
                  >
                    View All
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">Leader</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">Position</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">Submitted</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {leaderSubmissions.map((leader) => (
                        <tr key={leader.id} className="hover:bg-muted/30 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-sm font-medium text-primary">
                                  {leader.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium">{leader.name}</p>
                                <p className="text-sm text-muted-foreground">{leader.constituency}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm">{leader.position}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{leader.submittedAt}</td>
                          <td className="px-6 py-4">{getStatusBadge(leader.status)}</td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => setSelectedLeader(leader)}
                              className="flex items-center gap-1 text-sm text-primary font-medium hover:underline"
                            >
                              <Eye className="w-4 h-4" /> Review
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Leaders Section */}
          {activeSection === "leaders" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="font-heading text-2xl lg:text-3xl font-bold mb-6">Leader Submissions</h1>

              {/* Search & Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by name or constituency..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-card border border-border hover:bg-muted transition-colors">
                  <Filter className="w-5 h-5" />
                  Filter
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              {/* Table */}
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">Leader</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">Documents</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {leaderSubmissions.map((leader) => (
                        <tr key={leader.id} className="hover:bg-muted/30 transition-colors">
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-medium">{leader.name}</p>
                              <p className="text-sm text-muted-foreground">{leader.position} • {leader.constituency}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              {Object.entries(leader.documents).map(([key, status]) => (
                                <span
                                  key={key}
                                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                                    status === 'verified' ? 'bg-secondary/20 text-secondary' :
                                    status === 'pending' ? 'bg-accent/20 text-accent' :
                                    'bg-destructive/20 text-destructive'
                                  }`}
                                  title={`${key}: ${status}`}
                                >
                                  {status === 'verified' ? '✓' : status === 'pending' ? '?' : '✗'}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4">{getStatusBadge(leader.status)}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button className="px-3 py-1.5 rounded-lg bg-secondary/20 text-secondary text-sm font-medium hover:bg-secondary/30">
                                Approve
                              </button>
                              <button className="px-3 py-1.5 rounded-lg bg-destructive/20 text-destructive text-sm font-medium hover:bg-destructive/30">
                                Reject
                              </button>
                              <button className="px-3 py-1.5 rounded-lg bg-muted text-muted-foreground text-sm font-medium hover:bg-muted/80">
                                Request
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Verified Leaders */}
          {activeSection === "verified" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="font-heading text-2xl lg:text-3xl font-bold mb-6">Verified Leaders</h1>
              <p className="text-muted-foreground mb-8">
                Leaders who have completed verification and are published publicly.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {leaderSubmissions.filter(l => l.status === 'verified').map((leader) => (
                  <div key={leader.id} className="p-6 rounded-2xl bg-card border border-border">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-full bg-secondary/20 flex items-center justify-center">
                        <span className="text-lg font-heading font-bold text-secondary">
                          {leader.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold flex items-center gap-2">
                          {leader.name}
                          <CheckCircle className="w-4 h-4 text-secondary" />
                        </h3>
                        <p className="text-sm text-muted-foreground">{leader.position}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{leader.constituency}</p>
                    <div className="flex items-center gap-2">
                      <button className="flex-1 py-2 rounded-lg bg-muted text-sm font-medium hover:bg-muted/80 transition-colors">
                        View Profile
                      </button>
                      <button className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Review Modal */}
      {selectedLeader && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl bg-card rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="font-heading font-bold text-xl">Review Submission</h2>
              <button
                onClick={() => setSelectedLeader(null)}
                className="p-2 hover:bg-muted rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xl font-heading font-bold text-primary">
                    {selectedLeader.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg">{selectedLeader.name}</h3>
                  <p className="text-muted-foreground">{selectedLeader.position} • {selectedLeader.constituency}</p>
                </div>
              </div>

              <h4 className="font-semibold mb-4">Document Status</h4>
              <div className="space-y-3 mb-6">
                {Object.entries(selectedLeader.documents).map(([key, status]) => (
                  <div key={key} className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                    <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    {getStatusBadge(status)}
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button className="flex-1 py-3 rounded-xl bg-secondary text-secondary-foreground font-medium">
                  Approve All
                </button>
                <button className="flex-1 py-3 rounded-xl bg-destructive text-destructive-foreground font-medium">
                  Reject
                </button>
                <button className="flex-1 py-3 rounded-xl bg-muted font-medium">
                  Request Correction
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ECDashboard;

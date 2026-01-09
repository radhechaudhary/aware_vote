import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Shield, User, FileText, Upload, CheckCircle, Clock, 
  AlertCircle, GraduationCap, CreditCard, Users, 
  AlertTriangle, Camera, LogOut, Menu, X, Home, 
  MessageSquare, Settings, ChevronRight
} from "lucide-react";

const menuItems = [
  { id: "profile", label: "My Profile", icon: User },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "verification", label: "Verification Status", icon: CheckCircle },
  { id: "communities", label: "My Communities", icon: MessageSquare },
];

const documents = [
  { id: "education", label: "Education Certificates", icon: GraduationCap, status: "verified", file: "degree_certificate.pdf" },
  { id: "govtId", label: "Government ID", icon: CreditCard, status: "pending", file: "aadhar_card.pdf" },
  { id: "partyTicket", label: "Party Ticket", icon: Users, status: "pending", file: null },
  { id: "criminal", label: "Criminal Record Declaration", icon: AlertTriangle, status: "required", file: null },
];

const LeaderDashboard = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getStatusBadge = (status) => {
    switch (status) {
      case "verified":
        return (
          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-medium">
            <CheckCircle className="w-3.5 h-3.5" /> Verified
          </span>
        );
      case "pending":
        return (
          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-medium">
            <Clock className="w-3.5 h-3.5" /> Pending
          </span>
        );
      case "required":
        return (
          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-destructive/20 text-destructive text-xs font-medium">
            <AlertCircle className="w-3.5 h-3.5" /> Required
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-muted rounded-lg">
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-primary" />
          <span className="font-heading font-bold">Leader Dashboard</span>
        </div>
        <div className="w-10" />
      </div>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-heading font-bold">VoterAware</h1>
                <p className="text-xs text-muted-foreground">Leader Portal</p>
              </div>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 hover:bg-muted rounded">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
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
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-border">
            <Link 
              to="/home"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
            >
              <Home className="w-5 h-5" />
              Public View
            </Link>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-all">
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
          {/* Profile Section */}
          {activeSection === "profile" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="font-heading text-2xl lg:text-3xl font-bold mb-6">My Profile</h1>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="lg:col-span-1">
                  <div className="p-6 rounded-2xl bg-card border border-border text-center">
                    <div className="relative inline-block mb-4">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto">
                        <User className="w-16 h-16 text-primary" />
                      </div>
                      <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg">
                        <Camera className="w-5 h-5" />
                      </button>
                    </div>
                    <h2 className="font-heading font-bold text-xl mb-1">Rajesh Sharma</h2>
                    <p className="text-muted-foreground mb-4">Member of Parliament</p>
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-medium">
                      <Clock className="w-4 h-4" /> Verification Pending
                    </span>
                  </div>
                </div>

                {/* Profile Form */}
                <div className="lg:col-span-2">
                  <div className="p-6 rounded-2xl bg-card border border-border">
                    <h3 className="font-heading font-semibold text-lg mb-6">Personal Information</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name</label>
                        <input
                          type="text"
                          defaultValue="Rajesh Sharma"
                          className="w-full px-4 py-3 rounded-xl bg-muted border-none focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Position</label>
                        <input
                          type="text"
                          defaultValue="Member of Parliament"
                          className="w-full px-4 py-3 rounded-xl bg-muted border-none focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Constituency</label>
                        <input
                          type="text"
                          defaultValue="Mumbai North"
                          className="w-full px-4 py-3 rounded-xl bg-muted border-none focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Party</label>
                        <input
                          type="text"
                          defaultValue="Democratic Party"
                          className="w-full px-4 py-3 rounded-xl bg-muted border-none focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium mb-2">Bio</label>
                        <textarea
                          rows={4}
                          defaultValue="Experienced political leader with focus on urban development and infrastructure."
                          className="w-full px-4 py-3 rounded-xl bg-muted border-none focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                        />
                      </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-3 rounded-xl gradient-bg text-primary-foreground font-medium"
                      >
                        Save Changes
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Documents Section */}
          {activeSection === "documents" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="font-heading text-2xl lg:text-3xl font-bold mb-6">Document Uploads</h1>
              <p className="text-muted-foreground mb-8">
                Upload your verification documents for Election Commission review.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                {documents.map((doc) => (
                  <div key={doc.id} className="p-6 rounded-2xl bg-card border border-border">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <doc.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{doc.label}</h3>
                          {doc.file && (
                            <p className="text-sm text-muted-foreground">{doc.file}</p>
                          )}
                        </div>
                      </div>
                      {getStatusBadge(doc.status)}
                    </div>

                    <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        {doc.file ? 'Upload new file' : 'Drop file here or click to upload'}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">PDF, JPG up to 5MB</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Verification Status */}
          {activeSection === "verification" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="font-heading text-2xl lg:text-3xl font-bold mb-6">Verification Status</h1>

              <div className="max-w-2xl">
                <div className="p-6 rounded-2xl bg-card border border-border mb-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                      <Clock className="w-8 h-8 text-accent" />
                    </div>
                    <div>
                      <h2 className="font-heading font-bold text-xl">Pending Verification</h2>
                      <p className="text-muted-foreground">Your documents are being reviewed</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {documents.map((doc, index) => (
                      <div key={doc.id} className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          doc.status === 'verified' ? 'bg-secondary text-secondary-foreground' :
                          doc.status === 'pending' ? 'bg-accent text-accent-foreground' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {doc.status === 'verified' ? <CheckCircle className="w-4 h-4" /> : index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{doc.label}</p>
                        </div>
                        {getStatusBadge(doc.status)}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-primary/10 text-primary text-sm">
                  <p className="font-medium mb-1">What happens next?</p>
                  <p className="text-primary/80">
                    Once all documents are verified by the Election Commission, your profile will be published publicly with a verified badge.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Communities */}
          {activeSection === "communities" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h1 className="font-heading text-2xl lg:text-3xl font-bold">My Communities</h1>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 rounded-xl gradient-bg text-primary-foreground font-medium text-sm"
                >
                  Create Community
                </motion.button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Mumbai North Forum</h3>
                      <p className="text-sm text-muted-foreground">2,450 members</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Official community for Mumbai North constituency discussions.
                  </p>
                  <Link to="/communities" className="text-primary text-sm font-medium flex items-center gap-1 hover:underline">
                    Manage <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default LeaderDashboard;

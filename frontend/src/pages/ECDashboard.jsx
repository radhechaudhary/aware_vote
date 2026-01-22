import { useState } from "react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import { 
  Shield, Users, FileText, CheckCircle, Clock, XCircle,
  Eye, Download, LogOut, Menu, X, BarChart3, AlertTriangle,
  UsersRound, Plus, Image, Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "leaders", label: "Leader Submissions", icon: Users },
  { id: "verified", label: "Verified Leaders", icon: CheckCircle },
  { id: "community", label: "Community", icon: UsersRound },
];

const languages = [
  "English", "Hindi", "Tamil", "Telugu", "Bengali",
  "Marathi", "Gujarati", "Kannada", "Malayalam", "Punjabi",
];

const ECDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [leaders, setLeaderSubmissions] = useState([]);
  const [showCorrectionDialog, setShowCorrectionDialog] = useState(false);
  const [correctionMessage, setCorrectionMessage] = useState("");
  const [corrections, setCorrections] = useState([]);

  useEffect(()=>{
  (async ()=>{
    // Fetch leader submissions from API
    const response = await axios.post("http://localhost:3000/ec/submissions", {}, {withCredentials:true});
    const data = response.data.submissions;
    console.log(data);
    setLeaderSubmissions(data);
  })()
},[])

  const [communities, setCommunities] = useState([
    {
      id: 1,
      name: "Delhi Voters Forum",
      description: "A community for voters in Delhi to discuss civic issues and electoral matters.",
      image: "",
      language: "Hindi",
      createdAt: "Jan 10, 2024",
      members: 1250,
    },
    {
      id: 2,
      name: "South India Electoral Watch",
      description: "Monitoring elections and promoting voter awareness across South Indian states.",
      image: "",
      language: "English",
      createdAt: "Jan 8, 2024",
      members: 890,
    },
  ]);

  
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCommunity, setNewCommunity] = useState({
    name: "",
    description: "",
    image: "",
    language: "",
  });

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
        return <span className="px-2 py-1 rounded-full bg-accent/20 text-accent-foreground text-xs font-medium">Pending</span>;
      case "rejected":
        return <span className="px-2 py-1 rounded-full bg-destructive/20 text-destructive text-xs font-medium">Rejected</span>;
      case "correction":
        return <span className="px-2 py-1 rounded-full bg-accent/20 text-accent-foreground text-xs font-medium">Correction</span>;
      default:
        return null;
    }
  };

  const handleCreateCommunity = async() => {
    if (!newCommunity.name || !newCommunity.description || !newCommunity.language) return;

    const community = {
      id: Date.now(),
      name: newCommunity.name,
      description: newCommunity.description,
      image: newCommunity.image,
      language: newCommunity.language,
    };
    const res =  await axios.post("http://localhost:3000/ec/create-community", community, {withCredentials:true});
    setShowCreateForm(false);
  };


  const formik = useFormik({
  initialValues: {
    name: "",
    description: "",
    image: "",
    language: "",
  },
  validationSchema: Yup.object({
    name: Yup.string().required("Community name is required"),
    description: Yup.string().required("Description is required"),
    language: Yup.string().required("Language is required"),
  }),
  onSubmit: async(values) => {
    const community = {
      id: Date.now(),
      name: values.name,
      description: values.description,
      image: values.image,
      language: values.language,
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      members: 0,
    };
    const res =  await axios.post("http://localhost:3000/ec/create-community", community, {withCredentials:true});
    console.log("Community Created:", community);

    setCommunities((prev) => [community, ...prev]);
    formik.resetForm();
    setShowCreateForm(false);
  },
});


  return (
    <div className="min-h-screen bg-background flex">
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
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0">
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
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {leaders.map((leader) => (
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
                                <p className="text-sm text-muted-foreground">{leader.curr_pos}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm">{leader.curr_pos}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{leader.submittedAt}</td>
                          <td className="px-6 py-4">{getStatusBadge(leader.status)}</td>
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

              <div className="bg-card rounded-2xl border border-border overflow-hidden">
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
                      {leaders.map((leader) => (
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
                                <p className="text-sm text-muted-foreground">{leader.curr_pos}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm">{leader.position}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{leader.submitted_at}</td>
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

          {/* Verified Leaders Section */}
          {activeSection === "verified" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h1 className="font-heading text-2xl lg:text-3xl font-bold">Verified Leaders</h1>
                <p className="text-muted-foreground text-sm">
                  Total Verified: {leaders.filter(l => l.status === "verified").length}
                </p>
              </div>

              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Leader</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Position</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Submitted</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {leaders
                        .filter((leader) => leader.status === "verified")
                        .map((leader) => (
                          <tr key={leader.id} className="hover:bg-muted/30 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                  <span className="text-sm font-medium text-primary">
                                    {leader.name.split(" ").map((n) => n[0]).join("")}
                                  </span>
                                </div>
                                <div>
                                  <p className="font-medium text-sm">{leader.name}</p>
                                  <p className="text-xs text-muted-foreground">{leader.constituency}</p>
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
                                <Eye className="w-4 h-4" /> View
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

          {/* Community Section */}
          {activeSection === "community" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="font-heading text-2xl lg:text-3xl font-bold">Community</h1>
                  <p className="text-muted-foreground text-sm mt-1">
                    Create and manage voter communities
                  </p>
                </div>
                <Button
                  onClick={() => setShowCreateForm(true)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Create Community
                </Button>
              </div>

              {/* Create Community Form */}
              {showCreateForm && (
  <motion.form
    onSubmit={formik.handleSubmit}
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-card rounded-2xl border border-border p-6 mb-6"
  >
    <div className="flex items-center justify-between mb-6">
      <h2 className="font-heading font-semibold text-lg">
        Create New Community
      </h2>
      <button
        type="button"
        onClick={() => setShowCreateForm(false)}
        className="p-2 hover:bg-muted rounded-lg"
      >
        <X className="w-5 h-5" />
      </button>
    </div>

    <div className="grid gap-6 md:grid-cols-2">
      {/* Name */}
      <div className="space-y-2">
        <Label>Community Name *</Label>
        <Input
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-xs text-destructive">
            {formik.errors.name}
          </p>
        )}
      </div>

      {/* Language */}
      <div className="space-y-2">
        <Label>Language *</Label>
        <Select
          value={formik.values.language}
          onValueChange={(value) =>
            formik.setFieldValue("language", value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang} value={lang}>
                {lang}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {formik.touched.language && formik.errors.language && (
          <p className="text-xs text-destructive">
            {formik.errors.language}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2 md:col-span-2">
        <Label>Description *</Label>
        <Textarea
          name="description"
          rows={3}
          value={formik.values.description}
          onChange={formik.handleChange}
        />
        {formik.touched.description && formik.errors.description && (
          <p className="text-xs text-destructive">
            {formik.errors.description}
          </p>
        )}
      </div>

      {/* Image */}
      <div className="space-y-2 md:col-span-2">
        <Label>Image URL (Optional)</Label>
        <Input
          name="image"
          value={formik.values.image}
          onChange={formik.handleChange}
          placeholder="https://example.com/image.jpg"
        />
      </div>
    </div>

    <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-border">
      <Button
        type="button"
        variant="outline"
        onClick={() => setShowCreateForm(false)}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        className="bg-primary text-primary-foreground"
      >
        Create Community
      </Button>
    </div>
  </motion.form>
)}


             
            </motion.div>
          )}
        </div>
      </main>

      {/* Review Modal */}
     {/* Review Modal */}
{selectedLeader && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-3xl bg-card rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col"
    >
      {/* Header */}
      <div className="p-6 border-b border-border flex items-center justify-between">
        <h2 className="font-heading font-bold text-xl">Submitted Documents</h2>
        <button onClick={() => setSelectedLeader(null)} className="p-2 hover:bg-muted rounded-lg">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Leader Info */}
      <div className="flex items-center gap-4 px-6 py-4 border-b border-border">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-lg font-heading font-bold text-primary">
            {selectedLeader.name.split(" ").map(n => n[0]).join("")}
          </span>
        </div>
        <div>
          <h3 className="font-heading font-bold text-lg">{selectedLeader.name}</h3>
          <p className="text-muted-foreground">
            {selectedLeader.position} • {selectedLeader.constituency}
          </p>
        </div>
      </div>

      {/* Documents Carousel */}
      <div className="relative px-6 py-6 overflow-hidden flex-1">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none">
          {Object.entries(selectedLeader.documents).map(([docKey, docStatus]) => (
            <div
              key={docKey}
              className="flex-shrink-0 w-64 snap-center border border-border rounded-xl overflow-hidden bg-card"
            >
              <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                <span className="text-sm font-medium capitalize">
                  {docKey === "govtId" ? "Government ID" : docKey === "partyTicket" ? "Party Ticket" : docKey}
                </span>
                {getStatusBadge(docStatus)}
              </div>

              <div className="h-40 flex flex-col items-center justify-center gap-3 text-muted-foreground">
                <FileText className="w-10 h-10" />
                <p className="text-sm">Document Uploaded</p>
                <button className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline">
                  <Download className="w-4 h-4" />
                  View / Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 border-t border-border flex flex-col sm:flex-row gap-3 justify-end">
        <Button
          onClick={() => {
            setLeaderSubmissions(prev =>
              prev.map(l => l.id === selectedLeader.id ? { ...l, status: "verified" } : l)
            );
            setSelectedLeader(null);
          }}
          className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
        >
          Approve
        </Button>

        {/* Request Correction */}
        <Button
          onClick={() => setShowCorrectionDialog(true)}
          className="bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          Request Correction
        </Button>

        <Button
          onClick={() => {
            setLeaderSubmissions(prev =>
              prev.map(l => l.id === selectedLeader.id ? { ...l, status: "rejected" } : l)
            );
            setSelectedLeader(null);
          }}
          className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
        >
          Reject
        </Button>
      </div>

      {/* Correction Modal */}
     {showCorrectionDialog && selectedLeader && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md bg-card rounded-2xl shadow-xl overflow-hidden flex flex-col"
    >
      <div className="p-6 border-b border-border flex items-center justify-between">
        <h2 className="font-heading font-bold text-lg">
          Request Correction
        </h2>
        <button
          onClick={() => setShowCorrectionDialog(false)}
          className="p-2 hover:bg-muted rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 flex flex-col gap-4">
        <p>
          Send a correction request for <strong>{selectedLeader.name}</strong>
        </p>
        <Textarea
          rows={4}
          value={correctionMessage}
          onChange={(e) => setCorrectionMessage(e.target.value)}
          placeholder="Write the correction message here..."
        />

        <div className="flex justify-end gap-3 mt-2">
          <Button
            variant="outline"
            onClick={() => setShowCorrectionDialog(false)}
          >
            Cancel
          </Button>
          <Button
            className="bg-accent text-accent-foreground"
            onClick={() => {
              // Update leader status
              setLeaderSubmissions(prev =>
                prev.map(l =>
                  l.id === selectedLeader.id
                    ? { ...l, status: "correction" }
                    : l
                )
              );

              // Add correction to state
              const correctionObj = {
                leaderId: selectedLeader.id,
                leaderName: selectedLeader.name,
                message: correctionMessage,
                date: new Date().toISOString(),
              };
              setCorrections(prev => [...prev, correctionObj]);

              // Console log the object
              console.log("Correction submitted:", correctionObj);

              // Close modal
              setShowCorrectionDialog(false);
              setSelectedLeader(null);
              setCorrectionMessage("");
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </motion.div>
  </div>
)}
    </motion.div>
  </div>
)}

    </div>
  );
};

export default ECDashboard;
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, BadgeCheck, MapPin, Briefcase, GraduationCap, 
  Calendar, ThumbsUp, ThumbsDown, MessageSquare, AlertTriangle,
  FileText, Award, Users, TrendingUp, ExternalLink
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AIChatbot from "../components/AIChatbot";

const leaderData = {
  id: 1,
  name: "Rajesh Sharma",
  position: "Member of Parliament",
  party: "Democratic Party",
  constituency: "Mumbai North",
  image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
  verified: true,
  upvotes: 1250,
  downvotes: 180,
  education: [
    { degree: "PhD in Economics", institution: "Delhi University", year: "2005" },
    { degree: "M.A. in Political Science", institution: "Mumbai University", year: "2000" },
    { degree: "B.A. (Hons)", institution: "St. Xavier's College", year: "1998" }
  ],
  experience: [
    { role: "Member of Parliament", duration: "2019 - Present", description: "Representing Mumbai North constituency" },
    { role: "State Minister", duration: "2014 - 2019", description: "Minister of Urban Development, Maharashtra" },
    { role: "MLA", duration: "2009 - 2014", description: "Andheri East constituency" }
  ],
  workDone: [
    "Led urban infrastructure development worth ₹5000 crores",
    "Initiated 'Clean Mumbai' campaign benefiting 2 million citizens",
    "Established 50+ skill development centers",
    "Improved road connectivity in rural areas"
  ],
  criminalRecord: {
    status: "No Criminal Cases",
    details: "Clean record as per Election Commission verification"
  },
  stats: {
    projectsCompleted: 47,
    budgetUtilized: "₹892 Cr",
    constituencyRanking: "#12"
  }
};

const discussions = [
  { id: 1, user: "Amit K.", comment: "Good work on the infrastructure projects!", time: "2 hours ago", likes: 24 },
  { id: 2, user: "Priya M.", comment: "When will the metro extension be completed?", time: "5 hours ago", likes: 18 },
  { id: 3, user: "Rahul S.", comment: "Need more focus on healthcare facilities.", time: "1 day ago", likes: 45 }
];

const LeaderProfile = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [userVote, setUserVote] = useState(null);

  const leader = leaderData; // In real app, fetch based on id

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "education", label: "Education" },
    { id: "work", label: "Work Done" },
    { id: "criminal", label: "Criminal Record" },
    { id: "discussion", label: "Discussion" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="pt-24 pb-8 hero-gradient">
        <div className="container mx-auto px-4">
          <Link 
            to="/leaders" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Leaders
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row gap-8 items-start"
          >
            {/* Profile Image */}
            <div className="relative">
              <img
                src={leader.image}
                alt={leader.name}
                className="w-40 h-40 md:w-48 md:h-48 rounded-2xl object-cover shadow-lg"
              />
              {leader.verified && (
                <div className="absolute -bottom-3 -right-3 bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 shadow-lg">
                  <BadgeCheck className="w-4 h-4" />
                  Verified
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">
                    {leader.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4" />
                      {leader.position}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      {leader.constituency}
                    </span>
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    {leader.party}
                  </span>
                </div>

                {/* Voting */}
                <div className="flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setUserVote(userVote === 'up' ? null : 'up')}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                      userVote === 'up' 
                        ? 'bg-secondary text-secondary-foreground' 
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    <ThumbsUp className="w-5 h-5" />
                    {leader.upvotes + (userVote === 'up' ? 1 : 0)}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setUserVote(userVote === 'down' ? null : 'down')}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                      userVote === 'down' 
                        ? 'bg-destructive text-destructive-foreground' 
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    <ThumbsDown className="w-5 h-5" />
                    {leader.downvotes + (userVote === 'down' ? 1 : 0)}
                  </motion.button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="p-4 rounded-xl bg-card border border-border">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Award className="w-4 h-4" />
                    <span className="text-xs">Projects</span>
                  </div>
                  <p className="font-heading font-bold text-xl">{leader.stats.projectsCompleted}</p>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-xs">Budget</span>
                  </div>
                  <p className="font-heading font-bold text-xl">{leader.stats.budgetUtilized}</p>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Users className="w-4 h-4" />
                    <span className="text-xs">Ranking</span>
                  </div>
                  <p className="font-heading font-bold text-xl">{leader.stats.constituencyRanking}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b border-border sticky top-16 md:top-20 bg-background/95 backdrop-blur-sm z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "overview" && (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-card border border-border">
                    <h3 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-primary" />
                      Education
                    </h3>
                    <div className="space-y-4">
                      {leader.education.slice(0, 2).map((edu, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                          <div>
                            <p className="font-medium">{edu.degree}</p>
                            <p className="text-sm text-muted-foreground">{edu.institution}, {edu.year}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-card border border-border">
                    <h3 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-primary" />
                      Political Experience
                    </h3>
                    <div className="space-y-4">
                      {leader.experience.map((exp, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-secondary mt-2" />
                          <div>
                            <p className="font-medium">{exp.role}</p>
                            <p className="text-sm text-muted-foreground">{exp.duration}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-card border border-border">
                    <h3 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      Key Achievements
                    </h3>
                    <ul className="space-y-3">
                      {leader.workDone.map((work, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm">
                          <span className="text-secondary mt-0.5">✓</span>
                          {work}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={`p-6 rounded-2xl border ${
                    leader.criminalRecord.status === "No Criminal Cases" 
                      ? "bg-secondary/10 border-secondary/30" 
                      : "bg-destructive/10 border-destructive/30"
                  }`}>
                    <h3 className="font-heading font-semibold text-lg mb-2 flex items-center gap-2">
                      <AlertTriangle className={`w-5 h-5 ${
                        leader.criminalRecord.status === "No Criminal Cases" ? "text-secondary" : "text-destructive"
                      }`} />
                      Criminal Record Status
                    </h3>
                    <p className={`font-medium ${
                      leader.criminalRecord.status === "No Criminal Cases" ? "text-secondary" : "text-destructive"
                    }`}>
                      {leader.criminalRecord.status}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">{leader.criminalRecord.details}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "education" && (
              <div className="max-w-2xl">
                <h2 className="font-heading text-2xl font-bold mb-6">Education History</h2>
                <div className="space-y-6">
                  {leader.education.map((edu, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative pl-8 pb-6 border-l-2 border-primary/30 last:border-l-0"
                    >
                      <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-primary" />
                      <div className="p-5 rounded-xl bg-card border border-border">
                        <p className="text-sm text-muted-foreground mb-1">{edu.year}</p>
                        <h3 className="font-semibold text-lg">{edu.degree}</h3>
                        <p className="text-muted-foreground">{edu.institution}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "work" && (
              <div>
                <h2 className="font-heading text-2xl font-bold mb-6">Work & Contributions</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {leader.workDone.map((work, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 rounded-xl bg-card border border-border flex items-start gap-4"
                    >
                      <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                        <Award className="w-5 h-5 text-secondary" />
                      </div>
                      <p className="text-foreground">{work}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "criminal" && (
              <div className="max-w-2xl">
                <h2 className="font-heading text-2xl font-bold mb-6">Criminal Record Declaration</h2>
                <div className={`p-8 rounded-2xl border-2 ${
                  leader.criminalRecord.status === "No Criminal Cases"
                    ? "bg-secondary/10 border-secondary/30"
                    : "bg-destructive/10 border-destructive/30"
                }`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      leader.criminalRecord.status === "No Criminal Cases" ? "bg-secondary" : "bg-destructive"
                    }`}>
                      {leader.criminalRecord.status === "No Criminal Cases" ? (
                        <BadgeCheck className="w-8 h-8 text-secondary-foreground" />
                      ) : (
                        <AlertTriangle className="w-8 h-8 text-destructive-foreground" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-xl">{leader.criminalRecord.status}</h3>
                      <p className="text-muted-foreground">{leader.criminalRecord.details}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This information is verified by the Election Commission of India and updated as per the latest affidavit filed.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "discussion" && (
              <div className="max-w-3xl">
                <h2 className="font-heading text-2xl font-bold mb-6">Citizen Feedback & Discussion</h2>
                
                {/* Add Comment */}
                <div className="p-6 rounded-2xl bg-card border border-border mb-8">
                  <textarea
                    placeholder="Share your feedback or ask a question..."
                    className="w-full p-4 rounded-xl bg-muted border-none resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
                    rows={3}
                  />
                  <div className="flex justify-end mt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-2.5 rounded-xl gradient-bg text-primary-foreground font-medium"
                    >
                      Post Comment
                    </motion.button>
                  </div>
                </div>

                {/* Comments */}
                <div className="space-y-4">
                  {discussions.map((discussion) => (
                    <motion.div
                      key={discussion.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-5 rounded-xl bg-card border border-border"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="font-medium text-primary">
                              {discussion.user.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{discussion.user}</p>
                            <p className="text-xs text-muted-foreground">{discussion.time}</p>
                          </div>
                        </div>
                        <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                          <ThumbsUp className="w-4 h-4" />
                          {discussion.likes}
                        </button>
                      </div>
                      <p className="text-foreground">{discussion.comment}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
      <AIChatbot />
    </div>
  );
};

export default LeaderProfile;

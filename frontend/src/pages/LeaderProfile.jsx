import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, BadgeCheck, MapPin, Briefcase, GraduationCap, 
  Calendar, ThumbsUp, ThumbsDown, MessageSquare, AlertTriangle,
  FileText, Award, Users, TrendingUp, ExternalLink
} from "lucide-react";
import Footer from "../components/Footer";
import AIChatbot from "../components/AIChatbot";
import axios from 'axios'
import { useEffect } from "react";

const data = {
  id: 1,
  name: "Rajesh Sharma",
  position: "Member of Parliament",
  party: "Democratic Party",
  constituency_code: "Mumbai North",
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
  promises_resolved: [
    "Led urban infrastructure development worth ₹5000 crores",
    "Initiated 'Clean Mumbai' campaign benefiting 2 million citizens",
    "Established 50+ skill development centers",
    "Improved road connectivity in rural areas"
  ],
  criminal_cases: [],
  stats: {
    projectsCompleted: 47,
    budgetUtilized: "₹892 Cr",
    constituencyRanking: "#12"
  }
};


const LeaderProfile = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [userVote, setUserVote] = useState(null);
  const [leader, setLeaderData] = useState({...data})
  const [comments, setComments] = useState(leader.comments || []) 
  const [newComment, setNewComment] = useState("")

  useEffect(()=>{
    (async ()=>{
      const res = await axios.post("http://localhost:3000/leaders/get-leader-by-id",{id:id} , {withCredentials:true});
      setLeaderData(res.data.leader);
      setComments(res.data.comments || []);
    })()
  },[])

  const handleCommentPost = async(e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const res = await axios.post("http://localhost:3000/leaders/post-comment",{leaderId:id, comment:newComment} , {withCredentials:true});

      setComments(res.data.comments);
      setNewComment(""); 
    }
    catch(err){
      alert("Could not post comment");
    } 
  }         


  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "work", label: "Work Done" },
    { id: "criminal", label: "Criminal Record" },
    { id: "discussion", label: "Discussion" }
  ];

  return (
    <div className="min-h-screen bg-background">

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
              {true && (
                <div className="absolute -bottom-3 -right-3 bg-orange-600 text-secondary-foreground px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 shadow-lg">
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
                      {leader.current_position}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      {leader.constituency_code}
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
  
                          <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                          <div>
                            <p className="font-medium">{leader.highest_education}</p>
                            
                          </div>
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
                      {leader.promises_resolved.map((work, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm">
                          <span className="text-secondary mt-0.5">✓</span>
                          {work}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={`p-6 rounded-2xl border ${
                    leader.criminal_cases.length !== 0
                      ? "bg-secondary/10 border-secondary/30" 
                      : "bg-destructive/10 border-destructive/30"
                  }`}>
                    <h3 className="font-heading font-semibold text-lg mb-2 flex items-center gap-2">
                      <AlertTriangle className={`w-5 h-5 ${
                        leader.criminal_cases.length === 0  ? "text-secondary" : "text-destructive"
                      }`} />
                      Criminal Record Status
                    </h3>
                    <p className={`font-medium ${
                      leader.criminal_cases.length === 0 ? "text-secondary" : "text-destructive"
                    }`}>
                      {leader.criminal_cases.length === 0 ? "No Criminal Cases" : "Criminal Cases Found"}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">{leader.criminal_cases.length === 0 ? "No criminal cases found." : "Criminal cases found."}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "work" && (
              <div>
                <h2 className="font-heading text-2xl font-bold mb-6">Work & Contributions</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {leader.promises_resolved.map((work, index) => (
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
                  leader.criminal_cases.length === 0
                    ? "bg-secondary/10 border-secondary/30"
                    : "bg-destructive/10 border-destructive/30"
                }`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      leader.criminal_cases.length === 0 ? "bg-secondary" : "bg-destructive"
                    }`}>
                      {leader.criminal_cases.length === 0 ? (
                        <BadgeCheck className="w-8 h-8 text-secondary-foreground" />
                      ) : (
                        <AlertTriangle className="w-8 h-8 text-destructive-foreground" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-xl">{leader.criminal_cases.length === 0 ? "No Criminal Cases" : "Criminal Cases Found"}</h3>
                      <p className="text-muted-foreground">{leader.criminal_cases.length === 0 ? "Clean record as per Election Commission verification" : "Criminal cases found."}</p>
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
                <form onSubmit={handleCommentPost} className="p-6 rounded-2xl bg-card border border-border mb-8">
                  <textarea
                    value = {newComment}
                    name = 'comment'
                    placeholder="Share your feedback or ask a question..."
                    className="w-full p-4 rounded-xl bg-muted border-none resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
                    rows={3}
                    onChange={(e)=>setNewComment(e.target.value)}
                  />
                  <div className="flex justify-end mt-4">
                    <motion.button
                    type = "submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-2.5 rounded-xl gradient-bg text-primary-foreground font-medium"
                    >
                      Post Comment
                    </motion.button>
                  </div>
                </form>

                {/* Comments */}
                <div className="space-y-4">
                  {comments.map((discussion) => (
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
                            </span>
                          </div>
                        </div>
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
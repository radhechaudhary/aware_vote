import { useState } from "react";
import { motion } from "framer-motion";
import { Users, MapPin, TrendingUp, Bell, ChevronRight } from "lucide-react";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import LeaderCard from "../components/LeaderCard";
import AIChatbot from "../components/AIChatbot";
import axios from 'axios'
import { useEffect } from "react";



const announcements = [
  { id: 1, title: "Voter Registration Deadline Extended", date: "Jan 15, 2024" },
  { id: 2, title: "New Polling Stations Added in Rural Areas", date: "Jan 12, 2024" },
  { id: 3, title: "Community Discussion on ONOE Policy", date: "Jan 10, 2024" }
];

const Home = () => {
  const [sampleLeaders, setSampleLeaders] = useState([]);
  const [searchResults, setSearchResults] = useState("");


  useEffect(()=>{
    (async ()=>{
      try{
      const res = await axios.post("http://localhost:3000/leaders/get-sample-leaders",{} , {withCredentials:true});
      setSampleLeaders(res.data.sampleLeaders);
      }
      catch(err){

      }
    })()
  },[])

  const handleSearch = async(data) => {
    const res = await axios.post("http://localhost:3000/leaders/name-search", {value:data.query}, {withCredentials:true});
    setSampleLeaders(res.data.filtered_leaders);
    setSearchResults(data.query);
  };

  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="pt-28 pb-12 hero-gradient">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">
              Welcome to <span className="gradient-text">VoterAware</span>
            </h1>
            <p className="text-muted-foreground">
              Search for your constituency leaders and stay informed
            </p>
          </motion.div>

          <SearchBar onSearch={handleSearch} />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Leaders Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-2xl font-bold">
                  {searchResults ? `Results for "${searchResults}"` : "Your Constituency Leaders"}
                </h2>
                <a href="/leaders" className="text-primary text-sm font-medium flex items-center gap-1 hover:underline">
                  View All <ChevronRight className="w-4 h-4" />
                </a>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {sampleLeaders.map((leader, index) => (
                  <LeaderCard key={leader.id} leader={leader} index={index} />
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Announcements */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-6 rounded-2xl bg-card border border-border"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Bell className="w-5 h-5 text-primary" />
                  <h3 className="font-heading font-semibold text-lg">Announcements</h3>
                </div>
                <div className="space-y-4">
                  {announcements.map((item) => (
                    <a
                      key={item.id}
                      href="#"
                      className="block p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <p className="font-medium text-sm mb-1">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border"
              >
                <h3 className="font-heading font-semibold text-lg mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-sm">Registered Voters</span>
                    </div>
                    <span className="font-semibold">2.4M</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-secondary" />
                      </div>
                      <span className="text-sm">Constituencies</span>
                    </div>
                    <span className="font-semibold">543</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-accent" />
                      </div>
                      <span className="text-sm">Active Discussions</span>
                    </div>
                    <span className="font-semibold">1.2K</span>
                  </div>
                </div>
              </motion.div>

              {/* Community Highlight */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 rounded-2xl gradient-bg text-primary-foreground"
              >
                <h3 className="font-heading font-semibold text-lg mb-2">Join Communities</h3>
                <p className="text-sm text-primary-foreground/80 mb-4">
                  Connect with fellow citizens, discuss policies, and share your voice.
                </p>
                <a
                  href="/communities"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-foreground/20 text-sm font-medium hover:bg-primary-foreground/30 transition-colors"
                >
                  Explore Communities <ChevronRight className="w-4 h-4" />
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <AIChatbot />
    </div>
  );
};

export default Home;

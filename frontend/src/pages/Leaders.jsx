import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, SlidersHorizontal, Grid, List } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LeaderCard from "../components/LeaderCard";
import AIChatbot from "../components/AIChatbot";
import axios from "axios";

const filters = ["All", "Parliament", "State", "Municipal", "Verified Only"];

const Leaders = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLeaders, setFilteredLeaders] = useState([]);

  
  useEffect(()=>{
      (async ()=>{
        try{
        const res = await axios.post("http://localhost:3000/leaders/get-sample-leaders",{} , {withCredentials:true});
        console.log(res.data.sampleLeaders)
        setFilteredLeaders(res.data.sampleLeaders);
        }
        catch(err){
          console.log(err)
        }
      })()
    },[])

    useEffect(() => {
      const timeOut = setTimeout(async () => {
      try {
        console.log("Searching for:", searchQuery);
        const res = await axios.post( "http://localhost:3000/leaders/all-search", { value: searchQuery }, { withCredentials: true });  
        setFilteredLeaders(res.data.filtered_leaders);
      } catch (err) {
        console.log(err);
      }
    }, 1000)

    return () => clearTimeout(timeOut);

    },[searchQuery] 
  )

  return (
    <div className="min-h-screen bg-background">

      {/* Header */}
      <section className="pt-28 pb-8 hero-gradient">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">
              <span className="gradient-text">Elected Leaders</span> Directory
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore verified profiles of elected representatives across all levels of government.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, constituency, or party..."
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-card border border-border shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters & Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredLeaders.length}</span> leaders
            </p>
          </div>

          {/* Leaders Grid */}
          <div className={`grid gap-6 ${
            viewMode === "grid" 
              ? "sm:grid-cols-2 lg:grid-cols-3" 
              : "grid-cols-1"
          }`}>
            {filteredLeaders.map((leader, index) => (
              <LeaderCard key={leader.id} leader={leader} index={index} />
            ))}
          </div>

          {filteredLeaders.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground text-lg">No leaders found matching your criteria.</p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
      <AIChatbot />
    </div>
  );
};

export default Leaders;

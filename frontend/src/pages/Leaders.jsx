import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, SlidersHorizontal, Grid, List } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LeaderCard from "../components/LeaderCard";
import AIChatbot from "../components/AIChatbot";

const allLeaders = [
  {
    id: 1,
    name: "Rajesh Sharma",
    position: "Member of Parliament",
    party: "Democratic Party",
    constituency: "Mumbai North",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
    verified: true,
    upvotes: 1250,
    downvotes: 180
  },
  {
    id: 2,
    name: "Priya Patel",
    position: "MLA",
    party: "National Party",
    constituency: "Ahmedabad East",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    verified: true,
    upvotes: 980,
    downvotes: 120
  },
  {
    id: 3,
    name: "Dr. Arun Kumar",
    position: "Municipal Councillor",
    party: "People's Party",
    constituency: "Bangalore Central",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    verified: true,
    upvotes: 756,
    downvotes: 89
  },
  {
    id: 4,
    name: "Sunita Reddy",
    position: "Member of Parliament",
    party: "Progressive Alliance",
    constituency: "Hyderabad",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    verified: false,
    upvotes: 543,
    downvotes: 201
  },
  {
    id: 5,
    name: "Vikram Singh",
    position: "MLA",
    party: "National Party",
    constituency: "Jaipur East",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    verified: true,
    upvotes: 890,
    downvotes: 156
  },
  {
    id: 6,
    name: "Meera Nair",
    position: "Municipal Councillor",
    party: "Democratic Party",
    constituency: "Kochi Central",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop",
    verified: true,
    upvotes: 678,
    downvotes: 89
  }
];

const filters = ["All", "Parliament", "State", "Municipal", "Verified Only"];

const Leaders = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLeaders = allLeaders.filter((leader) => {
    const matchesSearch = leader.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leader.constituency.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === "All") return matchesSearch;
    if (activeFilter === "Verified Only") return matchesSearch && leader.verified;
    if (activeFilter === "Parliament") return matchesSearch && leader.position.includes("Parliament");
    if (activeFilter === "State") return matchesSearch && leader.position.includes("MLA");
    if (activeFilter === "Municipal") return matchesSearch && leader.position.includes("Councillor");
    return matchesSearch;
  });

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
          {/* Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-between gap-4 mb-8"
          >
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-5 h-5 text-muted-foreground" />
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilter === filter
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

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

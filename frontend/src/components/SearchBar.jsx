import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Building2, User } from "lucide-react";

const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All", icon: Search },
    { id: "city", label: "City", icon: Building2 },
    { id: "district", label: "District", icon: MapPin },
    { id: "leader", label: "Leader", icon: User },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch && onSearch({ query: searchValue, type: activeTab });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto"
    >
      {/* Search Tabs */}
      <div className="flex items-center gap-2 mb-4 justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <form onSubmit={handleSearch}>
        <div className="relative">
          <div className="absolute left-5 top-1/2 -translate-y-1/2">
            <Search className="w-5 h-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={`Search by ${activeTab === "all" ? "city, district, state, or leader name" : activeTab}...`}
            className="w-full pl-14 pr-32 py-4 rounded-2xl bg-card border border-border shadow-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
          <button
            
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 rounded-xl gradient-bg text-primary-foreground font-medium hover:scale-105 active:scale-96 transition-all"
          >
            Search
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default SearchBar;

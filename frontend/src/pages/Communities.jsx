import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, Users, MessageSquare, TrendingUp, 
  Plus, AlertTriangle, Heart, Share2, MoreHorizontal,
  Send, Image, Smile, ThumbsUp, ChevronRight, Shield
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AIChatbot from "../components/AIChatbot";

const communities = [
  {
    id: 1,
    name: "Mumbai Voters Forum",
    description: "Discussion forum for Mumbai constituency voters",
    members: 12500,
    posts: 3420,
    image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=400&h=200&fit=crop",
    type: "public",
    trending: true
  },
  {
    id: 2,
    name: "ONOE Policy Discussion",
    description: "Debate and discuss One Nation One Election",
    members: 45000,
    posts: 8900,
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&h=200&fit=crop",
    type: "public",
    trending: true
  },
  {
    id: 3,
    name: "Youth Voters Initiative",
    description: "Engaging young voters in democratic process",
    members: 28000,
    posts: 5600,
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=200&fit=crop",
    type: "public",
    trending: false
  },
  {
    id: 4,
    name: "Rural Development Watch",
    description: "Tracking development projects in rural constituencies",
    members: 8900,
    posts: 2100,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=200&fit=crop",
    type: "leader-managed",
    trending: false
  }
];

const chatMessages = [
  { id: 1, user: "Amit Kumar", message: "Has anyone read the latest ONOE proposal document?", time: "10:30 AM", isAbusive: false },
  { id: 2, user: "Priya Shah", message: "Yes! I found the cost analysis particularly interesting.", time: "10:32 AM", isAbusive: false },
  { id: 3, user: "Rahul M", message: "I think simultaneous elections will be beneficial for governance continuity.", time: "10:35 AM", isAbusive: false },
  { id: 4, user: "Anonymous", message: "This is a terrible idea and anyone who supports it is...", time: "10:37 AM", isAbusive: true },
  { id: 5, user: "Meera N", message: "Let's keep the discussion civil and focused on policy.", time: "10:38 AM", isAbusive: false }
];

const Communities = () => {
  const [activeCommunity, setActiveCommunity] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const filteredCommunities = communities.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              <span className="gradient-text">Communities</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join public discussions, share your views, and connect with fellow citizens.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search communities..."
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-card border border-border shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Communities List */}
            <div className={`${activeCommunity ? 'hidden lg:block' : ''} lg:col-span-1`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-xl font-bold">All Communities</h2>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Suggest
                </motion.button>
              </div>

              <div className="space-y-4">
                {filteredCommunities.map((community, index) => (
                  <motion.div
                    key={community.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setActiveCommunity(community)}
                    className={`p-4 rounded-xl bg-card border cursor-pointer transition-all ${
                      activeCommunity?.id === community.id 
                        ? 'border-primary shadow-lg' 
                        : 'border-border hover:border-primary/30'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={community.image}
                        alt={community.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground truncate">{community.name}</h3>
                          {community.trending && (
                            <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent text-xs font-medium">
                              Trending
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                          {community.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5" />
                            {(community.members / 1000).toFixed(1)}k
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3.5 h-3.5" />
                            {(community.posts / 1000).toFixed(1)}k posts
                          </span>
                          {community.type === 'leader-managed' && (
                            <span className="flex items-center gap-1 text-primary">
                              <Shield className="w-3.5 h-3.5" />
                              Leader
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className={`${!activeCommunity ? 'hidden lg:block' : ''} lg:col-span-2`}>
              {activeCommunity ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-card rounded-2xl border border-border overflow-hidden h-[600px] flex flex-col"
                >
                  {/* Chat Header */}
                  <div className="p-4 border-b border-border flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setActiveCommunity(null)}
                        className="lg:hidden p-2 rounded-lg hover:bg-muted"
                      >
                        <ChevronRight className="w-5 h-5 rotate-180" />
                      </button>
                      <img
                        src={activeCommunity.image}
                        alt={activeCommunity.name}
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <div>
                        <h3 className="font-heading font-semibold">{activeCommunity.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {activeCommunity.members.toLocaleString()} members
                        </p>
                      </div>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-muted">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {chatMessages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex items-start gap-3 ${msg.isAbusive ? 'opacity-60' : ''}`}
                      >
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-medium text-primary">
                            {msg.user.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{msg.user}</span>
                            <span className="text-xs text-muted-foreground">{msg.time}</span>
                            {msg.isAbusive && (
                              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-destructive/20 text-destructive text-xs">
                                <AlertTriangle className="w-3 h-3" />
                                Flagged
                              </span>
                            )}
                          </div>
                          <p className={`text-sm ${msg.isAbusive ? 'blur-sm hover:blur-none transition-all' : ''}`}>
                            {msg.message}
                          </p>
                          {!msg.isAbusive && (
                            <div className="flex items-center gap-4 mt-2">
                              <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                                <ThumbsUp className="w-3.5 h-3.5" /> Like
                              </button>
                              <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                                <MessageSquare className="w-3.5 h-3.5" /> Reply
                              </button>
                              <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                                <Share2 className="w-3.5 h-3.5" /> Share
                              </button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-border">
                    <div className="flex items-center gap-3">
                      <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground">
                        <Image className="w-5 h-5" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground">
                        <Smile className="w-5 h-5" />
                      </button>
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-3 rounded-xl bg-muted border-none focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center"
                      >
                        <Send className="w-5 h-5 text-primary-foreground" />
                      </motion.button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Abusive language is automatically detected and flagged
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div className="hidden lg:flex h-[600px] rounded-2xl bg-card border border-border items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2">Select a Community</h3>
                    <p className="text-muted-foreground">Choose a community to start participating in discussions</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <AIChatbot />
    </div>
  );
};

export default Communities;

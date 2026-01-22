import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search, Users, MessageSquare, Plus, AlertTriangle,
  Share2, MoreHorizontal, Send, Image, Smile,
  ThumbsUp, ChevronRight, Shield
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AIChatbot from "../components/AIChatbot";
import axios from 'axios';
import { io } from 'socket.io-client'

const Communities = () => {
  const [communities, setCommunities] = useState([]); 
  const [activeCommunity, setActiveCommunity] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(()=>{
    (async ()=>{
      try{
      const res =  await axios.post("http://localhost:3000/community/getCommunities",{} , {withCredentials:true});
      if(res.status === 200){
        setCommunities(res.data.communities);
      }
      else{
        alert("Could not fetch communities");}
    }
    catch(err){
      alert("Could not fetch communities")
    }
    })();
    var socket = io('http://localhost:3000') // establish socket connection
    
  },[])

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    console.log("Uploaded file:", file);

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "image",
        content: imageUrl,
        user: "You",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    axios.post("http://localhost:3000/community/verifyMessage", {message:newMessage}, {withCredentials:true})
    .then((res)=>{

      if(!res.data.valid){
        console.log('invalid message detected');
      }
      else{
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            type: "text",
            content: newMessage,
            user: "You",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      }
    })
    .catch((err)=>{
      console.error("Error sending message to server:", err);
    })

    

    setNewMessage("");
  };

  const filteredCommunities = communities.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-8 hero-gradient">
        <div className="container mx-auto px-4">
          <h1 className="text-center text-3xl font-bold mb-6">Communities</h1>

          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search communities..."
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-card border"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-8">
          <div className={`${activeCommunity ? "hidden lg:block" : ""}`}>
            {filteredCommunities.map((c) => (
              <div
                key={c.id}
                onClick={() => setActiveCommunity(c)}
                className="p-4 bg-card border rounded-xl cursor-pointer mb-4"
              >
                <div className="flex gap-4">
                  <img src={c.image} className="w-16 h-16 rounded-xl object-cover" />
                  <div>
                    <h3 className="font-semibold">{c.name}</h3>
                    <p className="text-sm text-muted-foreground">{c.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`${!activeCommunity ? "hidden lg:block" : ""} lg:col-span-2`}>
            {activeCommunity && (
              <div className="h-[600px] bg-card border rounded-2xl flex flex-col">
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setActiveCommunity(null)} className="lg:hidden">
                      <ChevronRight className="rotate-180" />
                    </button>
                    <img src={activeCommunity.image} className="w-10 h-10 rounded-xl" />
                    <div>
                      <h3 className="font-semibold">{activeCommunity.name}</h3>
                      
                    </div>
                  </div>
                  <MoreHorizontal />
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.map((msg) => (
                    <div key={msg.id}>
                      <div className="text-xs text-muted-foreground mb-1">
                        {msg.user} · {msg.time}
                      </div>
                      {msg.type === "text" && (
                        <div className="px-4 py-2 bg-muted rounded-xl w-fit">
                          {msg.content}
                        </div>
                      )}
                      {msg.type === "image" && (
                        <img
                          src={msg.content}
                          className="max-w-xs rounded-xl border"
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  <div className="flex items-center gap-3">
                    <button onClick={() => fileInputRef.current.click()}>
                      <Image />
                    </button>

                    <button>
                      <Smile />
                    </button>

                    <input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-3 rounded-xl bg-muted"
                    />

                    <motion.button
                      onClick={sendMessage}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center"
                    >
                      <Send />
                    </motion.button>
                  </div>

                  <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    Abusive language is automatically detected and flagged
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
      <AIChatbot />
    </div>
  );
};

export default Communities;
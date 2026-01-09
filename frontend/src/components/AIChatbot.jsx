import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";

const sampleResponses = [
  "One Nation One Election proposes conducting simultaneous elections for the Lok Sabha and State Assemblies to reduce election-related expenditure and policy paralysis.",
  "To verify any election-related claim, please check with the official Election Commission of India website or your local electoral office.",
  "Voter ID cards can be applied for online through the NVSP portal or at your nearest electoral registration office.",
  "The Election Commission of India is the autonomous constitutional authority responsible for administering election processes in India.",
];

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: "Hello! I'm your AI Fact-Check Assistant. Ask me anything about elections, voting, or verify any political claims.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      text: inputValue,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: "bot",
        text: sampleResponses[Math.floor(Math.random() * sampleResponses.length)],
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full gradient-bg shadow-lg flex items-center justify-center ${
          isOpen ? "hidden" : ""
        }`}
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <MessageCircle className="w-7 h-7 text-primary-foreground" />
        </motion.div>
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
          <Sparkles className="w-3 h-3 text-accent-foreground" />
        </span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-100px)] bg-card rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="gradient-bg px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-primary-foreground">
                    AI Fact-Check Bot
                  </h3>
                  <p className="text-xs text-primary-foreground/80">
                    Verify claims instantly
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
              >
                <X className="w-4 h-4 text-primary-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-start gap-2 max-w-[85%] ${
                      message.type === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === "user"
                          ? "bg-accent"
                          : "bg-secondary"
                      }`}
                    >
                      {message.type === "user" ? (
                        <User className="w-4 h-4 text-accent-foreground" />
                      ) : (
                        <Bot className="w-4 h-4 text-secondary-foreground" />
                      )}
                    </div>
                    <div
                      className={`px-4 py-3 rounded-2xl ${
                        message.type === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-sm"
                          : "bg-muted text-foreground rounded-tl-sm"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <Bot className="w-4 h-4 text-secondary-foreground" />
                  </div>
                  <div className="bg-muted px-4 py-3 rounded-2xl rounded-tl-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0.1s]" />
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about elections or verify a claim..."
                  className="flex-1 px-4 py-3 rounded-xl bg-muted border-none outline-none text-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center disabled:opacity-50"
                >
                  <Send className="w-5 h-5 text-primary-foreground" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;

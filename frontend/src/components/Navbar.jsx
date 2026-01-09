import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, ChevronDown, User, Shield, UserCheck } from "lucide-react";

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिंदी" },
  { code: "ta", name: "தமிழ்" },
  { code: "te", name: "తెలుగు" },
  { code: "bn", name: "বাংলা" },
  { code: "mr", name: "मराठी" },
];

const Navbar = ({ variant = "default" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const location = useLocation();

  const isLanding = variant === "landing";

  const navLinks = isLanding
    ? [
        { name: "Home", path: "/" },
        { name: "About", path: "#about" },
        { name: "Features", path: "#features" },
        { name: "FAQs", path: "#faqs" },
      ]
    : [
        { name: "Home", path: "/home" },
        { name: "Leaders", path: "/leaders" },
        { name: "Communities", path: "/communities" },
      ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 ${
        isLanding ? "bg-background/80" : "bg-card/95"
      } backdrop-blur-md border-b border-border`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center"
            >
              <Shield className="w-6 h-6 text-primary-foreground" />
            </motion.div>
            <div className="hidden sm:block">
              <h1 className="font-heading font-bold text-lg text-foreground">
                VoterAware
              </h1>
              <p className="text-xs text-muted-foreground">One Nation One Election</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                <Globe className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {languages.find((l) => l.code === currentLang)?.name}
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${langOpen ? "rotate-180" : ""}`} />
              </motion.button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-40 bg-card rounded-xl shadow-lg border border-border overflow-hidden"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setCurrentLang(lang.code);
                          setLangOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-sm hover:bg-muted transition-colors ${
                          currentLang === lang.code ? "bg-primary/10 text-primary font-medium" : ""
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Auth Buttons */}
            {isLanding && (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/voter-auth">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border hover:bg-muted transition-colors font-medium"
                  >
                    <User className="w-4 h-4" />
                    Voter
                  </motion.button>
                </Link>
                <Link to="/leader-auth">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg btn-primary-gradient transition-all"
                  >
                    <UserCheck className="w-4 h-4" />
                    Leader
                  </motion.button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border"
            >
              <div className="py-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 rounded-lg hover:bg-muted transition-colors font-medium"
                  >
                    {link.name}
                  </Link>
                ))}
                {isLanding && (
                  <div className="pt-4 border-t border-border space-y-2">
                    <Link
                      to="/voter-auth"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 rounded-lg bg-muted font-medium"
                    >
                      <User className="w-4 h-4" />
                      Voter Login
                    </Link>
                    <Link
                      to="/leader-auth"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 rounded-lg btn-primary-gradient font-medium"
                    >
                      <UserCheck className="w-4 h-4" />
                      Leader Login
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;

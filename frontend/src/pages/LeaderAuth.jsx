import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LeaderRegistration from "./LeaderVerification";
import { motion } from "framer-motion";
import {
  Shield,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";

const LeaderAuth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:3000/leader-auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      localStorage.setItem("leaderToken", res.data.token);
      navigate("/leader-dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Backend not responding");
    } finally {
      setIsLoading(false);
    }
  };

  // 👉 Show verification screen
  if (showVerification) {
    return <LeaderRegistration onBack={() => setShowVerification(false)} />;
  }

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
            <Shield className="w-7 h-7 text-primary-foreground" />
          </div>
          <div className="text-center">
            <h1 className="font-bold text-xl">VoterAware</h1>
            <p className="text-xs text-muted-foreground">Leader Portal</p>
          </div>
        </Link>

        {/* Auth Card */}
        <div className="bg-card rounded-2xl shadow-xl border p-8">
          <h2 className="text-lg font-semibold text-center mb-6">
            Leader Sign In
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                name="email"
                placeholder="Email"
                onChange={handleChange}
                className="w-full pl-12 py-4 rounded-xl bg-muted"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full pl-12 pr-12 py-4 rounded-xl bg-muted"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              disabled={isLoading}
              className="w-full py-4 rounded-xl gradient-bg text-white font-semibold flex justify-center gap-2"
            >
              {isLoading ? "Signing In..." : "Sign In"}
              <ArrowRight />
            </motion.button>
          </form>

          {/* 🔹 Verification link */}
          <p
            onClick={() => setShowVerification(true)}
            className="mt-6 text-sm text-center text-primary cursor-pointer hover:underline"
          >
            Not verified yet? Click here to complete verification
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LeaderAuth;
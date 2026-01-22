import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, User, Phone, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import axios from 'axios';

const VoterAuth = () => {
  const [step, setStep] = useState(1);
  const [voterId, setVoterId] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(true);
  const navigate = useNavigate();

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!voterId.trim()) return;
    setIsLoading(true);
    axios.post('http://localhost:3000/voter-auth/send-otp', ({ voterId }))
    .catch(err=>{console.log(err)})
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 1500);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) return;
    setIsLoading(true);
    // Simulate verification
    axios.post(
      "http://localhost:3000/voter-auth/verify-otp",
      { otp },
      { withCredentials: true }
    )
    .then((res) => {
      if (!res.data.success) {
        alert("Wrong OTP");
      } else {
        localStorage.setItem("loggedIn", "true");
        navigate("/home");
      }
    })
    .catch(err=>{
      alert("Something went wrong");
    })
    setTimeout(() => {
      setIsLoading(false);
      navigate("/home");
    }, 1500);
  };

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center p-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-3 mb-8">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center"
          >
            <Shield className="w-7 h-7 text-primary-foreground" />
          </motion.div>
          <div className="text-center">
            <h1 className="font-heading font-bold text-xl">VoterAware</h1>
            <p className="text-xs text-muted-foreground">One Nation One Election</p>
          </div>
        </Link>

        {/* Card */}
        <div className="bg-card rounded-2xl shadow-xl border border-border p-8">
          {/* Steps Indicator */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}>
                {step > 1 ? <CheckCircle className="w-5 h-5" /> : '1'}
              </div>
              <span className="text-sm font-medium hidden sm:inline">Voter ID</span>
            </div>
            <div className={`w-12 h-0.5 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}>
                2
              </div>
              <span className="text-sm font-medium hidden sm:inline">Verify OTP</span>
            </div>
          </div>

          {step === 1 ? (
            <motion.form
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={handleSendOtp}
            >
              <h2 className="font-heading text-2xl font-bold text-center mb-2">
                Voter Login
              </h2>
              <p className="text-muted-foreground text-center mb-8">
                Enter your Voter ID to receive an OTP
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Voter ID</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      value={voterId}
                      onChange={(e) => setVoterId(e.target.value.toUpperCase())}
                      placeholder="Enter your Voter ID (e.g., ABC1234567)"
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-muted border-none focus:outline-none focus:ring-2 focus:ring-primary/30 uppercase"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={!voterId.trim() || isLoading}
                  className="w-full py-4 rounded-xl gradient-bg text-primary-foreground font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  ) : (
                    <>
                      Send OTP <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </div>
            </motion.form>
          ) : (
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={handleVerifyOtp}
            >
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>

              <h2 className="font-heading text-2xl font-bold text-center mb-2">
                Verify OTP
              </h2>
              <p className="text-muted-foreground text-center mb-8">
                Enter the 6-digit code sent to your registered mobile
              </p>

              <div className="space-y-6">
                <div className="flex justify-center gap-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace' && !digit && index > 0) {
                          document.getElementById(`otp-${index - 1}`)?.focus();
                        }
                      }}
                      className="w-12 h-14 text-center text-xl font-bold rounded-xl bg-muted border-none focus:outline-none focus:ring-2 focus:ring-primary"
                      maxLength={1}
                    />
                  ))}
                </div>

                <p className="text-center text-sm text-muted-foreground">
                  Didn't receive code?{" "}
                  <button type="button" className="text-primary font-medium hover:underline">
                    Resend OTP
                  </button>
                </p>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={otp.join("").length !== 6 || isLoading}
                  className="w-full py-4 rounded-xl gradient-bg text-primary-foreground font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  ) : (
                    <>
                      Verify & Login <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </div>
            </motion.form>
          )}

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              Are you a Leader?{" "}
              <Link to="/leader-auth" className="text-primary font-medium hover:underline">
                Leader Login
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VoterAuth;

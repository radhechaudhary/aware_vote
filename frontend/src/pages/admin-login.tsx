import { useState, useCallback } from "react";
import { Shield, Lock, User, AlertTriangle, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Captcha from "@/components/captcha";
import { useToast } from "@/hooks/use-toast";
import axios from 'axios'

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 30; // seconds

const AdminLogin = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTimer, setLockoutTimer] = useState(0);

  const handleCaptchaValidate = useCallback((isValid: boolean) => {
    setIsCaptchaValid(isValid);
  }, []);

  // const validateForm = (): boolean => {
  //   const newErrors: typeof errors = {};

  //   if (!formData.username.trim()) {
  //     newErrors.username = "Admin ID is required";
  //   } else if (formData.username.trim().length < 3) {
  //     newErrors.username = "Admin ID must be at least 3 characters";
  //   }

  //   if (!formData.password) {
  //     newErrors.password = "Password is required";
  //   } else if (formData.password.length < 6) {
  //     newErrors.password = "Password must be at least 6 characters";
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const startLockout = () => {
    setIsLocked(true);
    setLockoutTimer(LOCKOUT_DURATION);
    
    const interval = setInterval(() => {
      setLockoutTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsLocked(false);
          setLoginAttempts(0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isCaptchaValid) {
      setErrors({ general: "Please complete the security verification" });
      return;
    }

    setIsLoading(true);
    setErrors({});

    axios.post("http://localhost:3000/admin/login", {
      username: formData.username,
      password: formData.password
    });

    // Demo: Check credentials (in production, this would be a secure API call)
    const isValidCredentials = formData.username === "admin" && formData.password === "admin123";

    if (isValidCredentials) {
      toast({
        title: "Login Successful",
        description: "Welcome back, Administrator",
      });
      // In production: redirect to dashboard
    } else {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      
      if (newAttempts >= MAX_ATTEMPTS) {
        startLockout();
        setErrors({ 
          general: `Too many failed attempts. Account locked for ${LOCKOUT_DURATION} seconds.` 
        });
      } else {
        setErrors({ 
          general: `Invalid credentials. ${MAX_ATTEMPTS - newAttempts} attempts remaining.` 
        });
      }
    }

    setIsLoading(false);
  };

  const isFormValid = formData.username.trim().length >= 3 && 
                      formData.password.length >= 6 && 
                      isCaptchaValid && 
                      !isLocked;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-3xl"></div>
      
      <Card className="w-full max-w-md relative z-10 bg-card/95 backdrop-blur border-border shadow-2xl">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 border border-primary/20">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Admin Portal</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Secure access to administration dashboard
          </p>
        </CardHeader>

        <CardContent className="pt-6">
          {isLocked && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-destructive">Account Temporarily Locked</p>
                <p className="text-sm text-destructive/80 mt-1">
                  Please wait {lockoutTimer} seconds before trying again.
                </p>
              </div>
            </div>
          )}

          {errors.general && !isLocked && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive">{errors.general}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Field */}
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-foreground flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                Admin ID
              </label>
              <Input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="Enter your admin ID"
                className={`bg-input-bg border-input-border focus:border-primary focus:ring-primary h-12 ${
                  errors.username ? "border-destructive" : ""
                }`}
                disabled={isLocked}
                autoComplete="username"
                aria-describedby={errors.username ? "username-error" : undefined}
              />
              {errors.username && (
                <p id="username-error" className="text-sm text-destructive">{errors.username}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground flex items-center gap-2">
                <Lock className="w-4 h-4 text-muted-foreground" />
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter your password"
                  className={`bg-input-bg border-input-border focus:border-primary focus:ring-primary h-12 pr-12 ${
                    errors.password ? "border-destructive" : ""
                  }`}
                  disabled={isLocked}
                  autoComplete="current-password"
                  aria-describedby={errors.password ? "password-error" : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            {/* Captcha */}
            <Captcha onValidate={handleCaptchaValidate} />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold"
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></span>
                  Authenticating...
                </span>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Forgot Password Link */}
          <div className="mt-6 text-center">
            <a 
              href="#" 
              className="text-sm text-primary hover:text-primary/80 transition-colors hover:underline"
              onClick={(e) => {
                e.preventDefault();
                toast({
                  title: "Password Recovery",
                  description: "Contact your system administrator for password reset.",
                });
              }}
            >
              Forgot your password?
            </a>
          </div>

          {/* Security Notice */}
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-2">
              <Lock className="w-3 h-3" />
              Protected by IPU-DEVS security
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
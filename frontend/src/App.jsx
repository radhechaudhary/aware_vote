import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Leaders from "./pages/Leaders";
import LeaderProfile from "./pages/LeaderProfile";
import Communities from "./pages/Communities";
import VoterAuth from "./pages/VoterAuth";
import LeaderAuth from "./pages/LeaderAuth";
import LeaderDashboard from "./pages/LeaderDashboard";
import ECDashboard from "./pages/ECDashboard";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import AdminLogin from './pages/admin-login';
import AdminProtectedRoute from "./admin-protected";
import LeaderProtectedRoute from './leader-protected'

const queryClient = new QueryClient();

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/ec-dashboard" && location.pathname !== "/ec-login" && location.pathname !== "/leader-auth"  && <Navbar />}
      {children}
    </>
  );
};


const App = () =>{ 
  return(<QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout/>
        <Routes>
          
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/leaders" element={<Leaders />} />
          <Route path="/leader/:id" element={<LeaderProfile />} />
          <Route path="/communities" element={<Communities />} />
          <Route path="/voter-auth" element={<VoterAuth />} />
          <Route path="/leader-auth" element={<LeaderAuth />} />
          <Route element={<LeaderProtectedRoute />}>
            <Route path="/leader-dashboard" element={<LeaderDashboard />} />
          </Route>
          <Route path="/ec-login" element={<AdminLogin />} />
          <Route element={<AdminProtectedRoute />}>
            <Route path="/ec-dashboard" element={<ECDashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
}

export default App;

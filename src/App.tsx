
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Admin Pages
import Dashboard from "./pages/Dashboard";
import Therapists from "./pages/Therapists";
import UserManagement from "./pages/UserManagement";
import RoleManagement from "./pages/RoleManagement";
import SystemSettings from "./pages/SystemSettings";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

// Supervisor Pages
import SupervisorDashboard from "./pages/supervisor/Dashboard";
import SupervisorTherapists from "./pages/supervisor/Therapists";
import SupervisorChildren from "./pages/supervisor/Children";
import SupervisorChildProgress from "./pages/supervisor/ChildProgress";
import SupervisorRecommendations from "./pages/supervisor/Recommendations";
import SupervisorSessions from "./pages/supervisor/Sessions";
import SupervisorReports from "./pages/supervisor/Reports";
import SupervisorProfile from "./pages/supervisor/Profile";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Admin Routes */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/therapists" element={<Therapists />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/role-management" element={<RoleManagement />} />
            <Route path="/system-settings" element={<SystemSettings />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/profile" element={<Profile />} />
            
            {/* Supervisor Routes */}
            <Route path="/supervisor/dashboard" element={<SupervisorDashboard />} />
            <Route path="/supervisor/therapists" element={<SupervisorTherapists />} />
            <Route path="/supervisor/children" element={<SupervisorChildren />} />
            <Route path="/supervisor/child-progress" element={<SupervisorChildProgress />} />
            <Route path="/supervisor/recommendations" element={<SupervisorRecommendations />} />
            <Route path="/supervisor/sessions" element={<SupervisorSessions />} />
            <Route path="/supervisor/reports" element={<SupervisorReports />} />
            <Route path="/supervisor/profile" element={<SupervisorProfile />} />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { SurveyProvider } from "@/contexts/SurveyContext";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DepartmentSelection from "./pages/DepartmentSelection";
import SurveyForm from "./pages/SurveyForm";
import SubmissionSuccess from "./pages/SubmissionSuccess";
import ExcelExport from "./pages/ExcelExport";
import RemarksResponse from "./pages/RemarksResponse";
import Account from "./pages/Account";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/" />;
  }
  
  return children;
};

const AppRoutes = () => {
  const { user } = useAuth();
  
  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/departments" element={<ProtectedRoute><DepartmentSelection /></ProtectedRoute>} />
      <Route path="/survey/:departmentId" element={<ProtectedRoute><SurveyForm /></ProtectedRoute>} />
      <Route path="/submission-success" element={<ProtectedRoute><SubmissionSuccess /></ProtectedRoute>} />
      <Route path="/excel" element={<ProtectedRoute><ExcelExport /></ProtectedRoute>} />
      <Route path="/remarks-response" element={<ProtectedRoute><RemarksResponse /></ProtectedRoute>} />
      <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
      <Route path="/help" element={<ProtectedRoute><Help /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <SurveyProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </SurveyProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

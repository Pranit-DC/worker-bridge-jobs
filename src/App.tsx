import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import WorkerAuth from "./pages/auth/WorkerAuth";
import CustomerAuth from "./pages/auth/CustomerAuth";
import WorkerDashboard from "./pages/worker/WorkerDashboard";
import BrowseJobs from "./pages/worker/BrowseJobs";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import PostJob from "./pages/customer/PostJob";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth/worker" element={<WorkerAuth />} />
          <Route path="/auth/customer" element={<CustomerAuth />} />
          <Route path="/worker" element={<WorkerDashboard />} />
          <Route path="/worker/browse" element={<BrowseJobs />} />
          <Route path="/customer" element={<CustomerDashboard />} />
          <Route path="/customer/post-job" element={<PostJob />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Associates from "./pages/Associates";
import FamilyManagement from "./pages/FamilyManagement";
import DocumentUpload from "./pages/DocumentUpload";
import DocumentApproval from "./pages/DocumentApproval";
import AssociateDocuments from "./pages/AssociateDocuments";
import NotFound from "./pages/NotFound";
import UserProfile from "./pages/account/UserProfile";
import ResetPassword from "./pages/account/ResetPassword";
import ChangeEmail from "./pages/account/ChangeEmail";
import ManageAdmins from "./pages/account/ManageAdmins";
import ManageVolunteers from "./pages/account/ManageVolunteers";
import ManageAssociates from "./pages/account/ManageAssociates";
import FamilyLeaders from "./pages/account/FamilyLeaders";
import Coordinators from "./pages/account/Coordinators";
import TextInformative from "./pages/informatives/TextInformative";
import FileInformative from "./pages/informatives/FileInformative";
import FormInformative from "./pages/informatives/FormInformative";
import NewsInformative from "./pages/informatives/NewsInformative";
import RequestInformative from "./pages/informatives/RequestInformative";
import AttachmentInformative from "./pages/informatives/AttachmentInformative";
import ManageInformatives from "./pages/informatives/ManageInformatives";
import ProfileEdit from "./pages/account/ProfileEdit";
import ProfileSearch from "./pages/account/ProfileSearch";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/associates" element={<Associates />} />
          <Route path="/family-management" element={<FamilyManagement />} />
          <Route path="/document-upload" element={<DocumentUpload />} />
          <Route path="/document-approval" element={<DocumentApproval />} />
          <Route path="/associate-documents" element={<AssociateDocuments />} />
          <Route path="/donations" element={<Index />} />
          
          {/* Account Management Routes */}
          <Route path="/account/profile" element={<UserProfile />} />
          <Route path="/account/profile/edit" element={<ProfileEdit />} />
          <Route path="/account/search" element={<ProfileSearch />} />
          <Route path="/account/reset-password" element={<ResetPassword />} />
          <Route path="/account/change-email" element={<ChangeEmail />} />
          <Route path="/account/admins" element={<ManageAdmins />} />
          <Route path="/account/volunteers" element={<ManageVolunteers />} />
          <Route path="/account/managed-associates" element={<ManageAssociates />} />
          <Route path="/account/family-leaders" element={<FamilyLeaders />} />
          <Route path="/account/coordinators" element={<Coordinators />} />
          
          {/* Informative Routes */}
          <Route path="/informatives/text" element={<TextInformative />} />
          <Route path="/informatives/file" element={<FileInformative />} />
          <Route path="/informatives/form" element={<FormInformative />} />
          <Route path="/informatives/news" element={<NewsInformative />} />
          <Route path="/informatives/request" element={<RequestInformative />} />
          <Route path="/informatives/attachment" element={<AttachmentInformative />} />
          <Route path="/informatives/manage" element={<ManageInformatives />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;


import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "./Sidebar";

interface AccountLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const AccountLayout = ({ children, title, description }: AccountLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full">
        <Navbar />
        <div className="flex flex-1 pt-16">
          <Sidebar />
          <div className="flex-grow p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-indigo-600">{title}</CardTitle>
                {description && <p className="text-muted-foreground mt-2">{description}</p>}
              </CardHeader>
              <CardContent>
                {children}
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default AccountLayout;

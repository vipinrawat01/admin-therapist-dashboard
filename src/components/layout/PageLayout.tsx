
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { cn } from '@/lib/utils';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  containerClassName?: string;
}

const PageLayout = ({ children, title, containerClassName }: PageLayoutProps) => {
  // Use a ref-based approach for animations to avoid issues
  React.useEffect(() => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
      observer.observe(element);
    });
    
    return () => {
      animatedElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <Header title={title} />
        
        <main className={cn("flex-1 p-6", containerClassName)}>
          {children}
        </main>
        
        <footer className="border-t border-border p-4 text-center text-sm text-muted-foreground">
          <p>© 2023 Therapy Management System. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default PageLayout;

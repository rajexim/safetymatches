import React, { useState, useEffect } from 'react';
import { Router, useRouter } from './router/Router';
import { ContentProvider } from './content/ContentContext';
import { LocaleProvider } from './i18n/LocaleContext';
import Seo from './seo/Seo';
import Analytics from './components/Analytics';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RfqModal from './components/RfqModal';
import WhatsAppFloat from './components/WhatsAppFloat';
import TawkToChat from './components/TawkToChat';

import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import OurTeamsPage from './pages/OurTeamsPage';
import VideosPage from './pages/VideosPage';
import ContactUsPage from './pages/ContactUsPage';
import OurClientsPage from './pages/OurClientsPage';
import OurProductsPage from './pages/OurProductsPage';
import PromotionalMatchesPage from './pages/PromotionalMatchesPage';
import HouseholdMatchesPage from './pages/HouseholdMatchesPage';
import WaxMatchesPage from './pages/WaxMatchesPage';
import BarbequeMatchesPage from './pages/BarbequeMatchesPage';
import KitchenMatchesPage from './pages/KitchenMatchesPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import AdminPage from './pages/AdminPage';
import { getBlogPostByPath } from './config/blogPosts';

function PageContent({ onOpenRfq }) {
  const { routePath } = useRouter();
  const cleanPath = routePath.length > 1 && routePath.endsWith('/') ? routePath.slice(0, -1) : routePath;

  let PageComponent = HomePage;

  if (cleanPath === '/blog') {
    PageComponent = BlogPage;
  } else if (getBlogPostByPath(cleanPath)) {
    PageComponent = BlogPostPage;
  } else {
    switch (cleanPath) {
      case '/':
        PageComponent = HomePage;
        break;
      case '/about-us':
        PageComponent = AboutUsPage;
        break;
      case '/our-teams':
        PageComponent = OurTeamsPage;
        break;
      case '/videos':
        PageComponent = VideosPage;
        break;
      case '/contact-us':
        PageComponent = ContactUsPage;
        break;
      case '/our-clients':
        PageComponent = OurClientsPage;
        break;
      case '/our-products':
        PageComponent = OurProductsPage;
        break;
      case '/promotional-matches':
        PageComponent = PromotionalMatchesPage;
        break;
      case '/household-matches':
        PageComponent = HouseholdMatchesPage;
        break;
      case '/wax-matches':
        PageComponent = WaxMatchesPage;
        break;
      case '/barbeque-matches':
        PageComponent = BarbequeMatchesPage;
        break;
      case '/kitchen-matches':
        PageComponent = KitchenMatchesPage;
        break;
      default:
        PageComponent = HomePage;
    }
  }

  return <PageComponent onOpenRfq={onOpenRfq} />;
}

function AppShell() {
  const { path, routePath } = useRouter();
  const cleanPath = routePath.length > 1 && routePath.endsWith('/') ? routePath.slice(0, -1) : routePath;
  const [rfqOpen, setRfqOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');

  const handleOpenRfq = (productName = '') => {
    setSelectedProduct(productName || 'Standard Wooden Matches');
    setRfqOpen(true);
  };

  useEffect(() => {
    if (path !== '/admin') return undefined;
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex, nofollow';
    document.head.appendChild(robots);
    document.title = 'Content Admin | Glovel Matches LLP';
    return () => document.head.removeChild(robots);
  }, [path]);

  if (path === '/admin') {
    return <AdminPage />;
  }

  return (
    <LocaleProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-amber-500 selection:text-white">
        <Seo />
        <Analytics />
        <Navbar onOpenRfq={() => handleOpenRfq()} />
        <main className="flex-grow">
          <PageContent onOpenRfq={handleOpenRfq} />
        </main>
        <Footer onOpenRfq={handleOpenRfq} />
        <TawkToChat />
        <WhatsAppFloat />

        <RfqModal
          isOpen={rfqOpen}
          onClose={() => setRfqOpen(false)}
          selectedProductName={selectedProduct}
        />
      </div>
    </LocaleProvider>
  );
}

export default function App() {
  return (
    <ContentProvider>
      <Router>
        <AppShell />
      </Router>
    </ContentProvider>
  );
}

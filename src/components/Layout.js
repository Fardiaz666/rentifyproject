// src/components/Layout.js
import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({
  children,
  currentPage,
  onPageChange,
  setViewMode,
  setShowSidebar,
  setSearchTerm,
}) => {
  const hideChrome =
    currentPage === 'login' || currentPage === 'payment' || currentPage === 'confirmation';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {!hideChrome && (
        <Header
          onPageChange={onPageChange}
          setViewMode={setViewMode}
          setShowSidebar={setShowSidebar}
          setSearchTerm={setSearchTerm}
        />
      )}

      <main className="flex-1">
        {children}
      </main>

      {!hideChrome && <Footer onPageChange={onPageChange} />}
    </div>
  );
};

export default Layout;

import Layout from './components/Layout';

// di dalam return BuyerApp:
return (
  <Layout
    currentPage={currentPage}
    onPageChange={handlePageChange}
    setViewMode={setViewMode}
    setShowSidebar={setShowSidebar}
    setSearchTerm={setSearchTerm}
  >
    <div className={`transition-opacity duration-200 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      {renderPage()}
    </div>
  </Layout>
);

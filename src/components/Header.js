import SearchBar from './SearchBar';

const Header = ({ onPageChange, setShowSidebar, setViewMode, setSearchTerm }) => {
  // ...state & logic lama

  const handleSearch = (keyword) => {
    setSearchTerm(keyword);
    onPageChange('products');
  };

  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex items-center gap-4">
        {/* Logo */}
        <button onClick={handleLogoClick} className="flex items-center shrink-0">
          <img
            src="/Rentify-Logo.png"
            alt="Rentify Logo"
            className="h-10 md:h-12"
          />
        </button>

        {/* Search (hidden di mobile kalau mau lebih simple) */}
        <div className="flex-1 hidden md:flex justify-center">
          <SearchBar
            placeholder="Cari motor, kamera, kosan..."
            onSearch={handleSearch}
          />
        </div>

        {/* Right section: cart + user */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Cart, user avatar, dropdown, dll -> pakai style yang konsisten */}
        </div>
      </div>
    </header>
  );
};

'use client';

import { useState } from 'react';

interface HeaderProps {
  navigation: any[];
  normalizedSlug: string;
}

export function Header({ navigation, normalizedSlug }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="header-left">
            <a href="/">
              <img 
                src="/NMMTG_Tekst_farge_26.svg" 
                alt="NM Magic: The Gathering 2026" 
                className="logo-with-text"
              />
            </a>
          </div>

          {/* Hamburger Menu Button - Only visible on mobile */}
          <button 
            className="menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Desktop Navigation Menu */}
          <nav className="nav-menu">
            {Array.isArray(navigation) &&
              navigation.map((item: any) => {
                const href = item.fields?.url || item.fields?.slug || '/';
                const itemSlug = item.fields?.slug?.toLowerCase().trim() || '';
                const isActive = normalizedSlug === itemSlug;

                return (
                  <a
                    key={item.sys.id}
                    href={href}
                    target={item.fields?.isExternal ? '_blank' : undefined}
                    className={isActive ? 'active' : ''}
                  >
                    {String(item.fields?.label || item.fields?.title || 'Link')}
                  </a>
                );
              })}
          </nav>

          {/* Mobile Navigation Dropdown */}
          {isMenuOpen && (
            <nav className="nav-menu-mobile">
              {Array.isArray(navigation) &&
                navigation.map((item: any) => {
                  const href = item.fields?.url || item.fields?.slug || '/';
                  const itemSlug = item.fields?.slug?.toLowerCase().trim() || '';
                  const isActive = normalizedSlug === itemSlug;

                  return (
                    <a
                      key={item.sys.id}
                      href={href}
                      target={item.fields?.isExternal ? '_blank' : undefined}
                      className={isActive ? 'active' : ''}
                      onClick={closeMenu}
                    >
                      {String(item.fields?.label || item.fields?.title || 'Link')}
                    </a>
                  );
                })}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
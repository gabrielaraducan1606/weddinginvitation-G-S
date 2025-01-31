import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import styles from "./SideBar.module.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.hamburgerContainer}>
      {/* Hamburger Menu - Only visible on mobile */}
      {!isOpen && (
        <button
          className={styles.hamburgerButton}
          onClick={toggleSidebar}
          aria-label="Open menu"
        >
          <Menu size={28} />
        </button>
      )}

      {/* Sidebar */}
      <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}>
        {/* Close Button - Only visible when sidebar is open */}
        {isOpen && (
          <button
            className={styles.closeButton}
            onClick={toggleSidebar}
            aria-label="Close menu"
          >
            <X size={28} />
          </button>
        )}

        <svg
          width="20"
          height="20"
          fill="currentColor"
          className={styles.iconHeart}
        >
          <use xlinkHref="#icon-logo-heart" />
        </svg>
        <h2 className={styles.titleSideBar}> Gabriela & Silviu</h2>
        <h4 className={styles.subtitle}>17 Mai 2025</h4>
        <nav className={styles.nav}>
          <a href="#home" className={styles.navItem} onClick={handleLinkClick}>
            Acasă
          </a>
          <a href="#about-us" className={styles.navItem} onClick={handleLinkClick}>
            Mirii
          </a>
          <a href="#godparents" className={styles.navItem} onClick={handleLinkClick}>
            Nașii
          </a>
          <a href="#parents" className={styles.navItem} onClick={handleLinkClick}>
            Părinții
          </a>
          <a href="#countdown" className={styles.navItem} onClick={handleLinkClick}>
            Cât mai este
          </a>
          <a href="#wherewhen" className={styles.navItem} onClick={handleLinkClick}>
            Unde și Când
          </a>
          <a href="#form" className={styles.navItem} onClick={handleLinkClick}>
            Confirmare
          </a>
          <a href="#faq" className={styles.navItem} onClick={handleLinkClick}>
            Întrebări Frecvente
          </a>
        </nav>

        <div className={styles.footerSidebar}>
          <hr className={styles.decorativeLine} />
          <p className={styles.footerText}>Gabriela & Silviu</p>
          <p className={styles.footerDate}>17 Mai 2025</p>
        </div>
        
      </div>
    </div>
  );
};

export default Sidebar;

import './Sidebar.css'

const NAV_ITEMS = [
  { icon: 'spellcheck',       label: 'Alumni' },
  { icon: 'document_scanner', label: 'Certifikatë e Nënshkruar' },
  { icon: 'schedule',         label: 'Orari i Studentëve' },
  { icon: 'how_to_reg',       label: 'Regjistrime' },
  { icon: 'menu_book',        label: 'Libreza e Notave' },
  { icon: 'lightbulb',        label: 'Study Room', active: true, iconClass: 'study-room-icon' },
]

function Sidebar({ collapsed, onToggle }) {
  return (
    <>
      {/* Backdrop shown on mobile when sidebar is open */}
      {!collapsed && <div className="sidebar-backdrop" onClick={onToggle} />}

      <div className={`sidenav${collapsed ? ' collapsed' : ''}`}>
        <div className="mat-drawer-inner-container alegreya-sans-regular">

          {/* Toolbar */}
          <div className="mat-toolbar mat-primary">
            {/* Hamburger always at top-right */}
            <button
              className="hamburger-btn"
              onClick={onToggle}
              title={collapsed ? 'Hap menunë' : 'Mbyll menunë'}
            >
              <span className="material-icons">
                {collapsed ? 'menu' : 'menu_open'}
              </span>
            </button>

            {/* Logo + name side by side */}
            <a className="home-link" href="/pitagora">
              <img
                alt="Logo"
                className="logo"
                src="https://uamd.pitagora.rash.al/assets/images/uamd_logo_header.svg"
              />
              <span className="pre-wrapped">
                {`UNIVERSITETI
“ALEKSANDËR MOISIU”,
DURRËS`}
              </span>
            </a>
          </div>

          {/* Nav */}
          <nav className="mat-nav-list">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                className={`mat-list-item${item.active ? ' active' : ''}`}
                href="#"
                title={collapsed ? item.label : ''}
              >
                <div className="mat-list-item-content">
                  <span className={`material-icons${item.iconClass ? ' ' + item.iconClass : ''}`}>
                    {item.icon}
                  </span>
                  <span className="nav-label">{item.label}</span>
                </div>
              </a>
            ))}
          </nav>

        </div>
      </div>
    </>
  )
}

export default Sidebar

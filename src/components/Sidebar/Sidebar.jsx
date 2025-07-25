import { useState, useEffect } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../assets/logo.png';

const themes = {
  light: {
    sidebarBg: 'var(--color-sidebar-background-light-default)',
    sidebarHover: 'var(--color-sidebar-background-light-hover)',
    sidebarActive: 'var(--color-sidebar-background-light-active)',
    textDefault: 'var(--color-text-light-default)',
    textHover: 'var(--color-text-light-hover)',
    textActive: 'var(--color-text-light-active)',
    textLogo: 'var(--color-text-logo-light-default)',
    buttonBg: 'var(--color-button-background-light-default)',
    buttonActive: 'var(--color-button-background-light-active)',
  },
  dark: {
    sidebarBg: 'var(--color-sidebar-background-dark-default)',
    sidebarHover: 'var(--color-sidebar-background-dark-hover)',
    sidebarActive: 'var(--color-sidebar-background-dark-active)',
    textDefault: 'var(--color-text-dark-default)',
    textHover: 'var(--color-text-dark-hover)',
    textActive: 'var(--color-text-dark-active)',
    textLogo: 'var(--color-text-logo-dark-default)',
    buttonBg: 'var(--color-button-background-dark-default)',
    buttonActive: 'var(--color-button-background-dark-active)',
  },
};

const GlobalStyle = createGlobalStyle`
  :root {
    /* dark theme */
    --color-sidebar-background-dark-default: #202127;
    --color-sidebar-background-dark-hover: #2D2E34;
    --color-sidebar-background-dark-active: #393A3F;
    --color-text-dark-default: #f0f2ff;
    --color-text-dark-hover: #f0f2ff;
    --color-text-dark-active: #f0f2ff;
    --color-text-logo-dark-default: #3B82F6;
    --color-button-background-dark-default: #202127;
    --color-button-background-dark-active: #4B5966;

    /* light theme */
    --color-sidebar-background-light-default: #fff;
    --color-sidebar-background-light-hover: #f0f2ff;
    --color-sidebar-background-light-active: #f0f2ff;
    --color-text-light-default: #97a5b9;
    --color-text-light-hover: #091b31;
    --color-text-light-active: #0000b5;
    --color-text-logo-light-default: #0000b5;
    --color-button-background-light-default: #fff;
    --color-button-background-light-active: #e2e8f0;
  }

  html {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    font-weight: 400;
    line-height: 1.5;
    background-color: #e2e8f0;
    color: rgba(255, 255, 255, 0.87);
  }
`;

const SidebarContainer = styled.div`
  width: ${({ isOpened }) => (isOpened ? '240px' : '60px')};
  height: 100vh;
  background-color: ${(props) => props.theme.sidebarBg};
  color: ${(props) => props.theme.textDefault};
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ddd;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 100;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  gap: 12px;
  position: relative;
  min-height: 56px;

  img {
    width: 32px;
    height: 32px;
    border-radius: 8px;
  }

  span {
    font-weight: 600;
    color: ${(props) => props.theme.textLogo};
    white-space: nowrap;
    opacity: ${({ isOpened }) => (isOpened ? 1 : 0)};
    transition: opacity 0.3s;
  }

  > div {
    position: absolute;
    top: 50%;
    right: ${({ isOpened }) => (isOpened ? '-1rem' : '-3rem')};
    transform: translateY(-50%);
    cursor: pointer;
    color: ${(props) => props.theme.textHover};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    transition: all 0.2s;

    &:hover {
      background-color: ${(props) => props.theme.sidebarHover};
      color: ${(props) => props.theme.textActive};
    }
  }
`;

const NavSection = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const NavItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0.75rem 1rem;
  cursor: pointer;
  color: ${(props) => props.theme.textDefault};
  border-radius: 6px;
  margin: 0 0.5rem;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    background-color: ${(props) => props.theme.sidebarHover};
    color: ${(props) => props.theme.textHover};
  }

  &:active {
    background-color: ${(props) => props.theme.sidebarActive};
    color: ${(props) => props.theme.textActive};
  }

  .svg-inline--fa {
    font-size: 1rem;
    min-width: 1rem;
  }

  span {
    opacity: ${({ isOpened }) => (isOpened ? 1 : 0)};
    transition: opacity 0.3s;
  }

  ${({ isOpened, theme }) => !isOpened && `
    &:hover::after {
      content: attr(data-title);
      position: absolute;
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      background-color: ${theme.sidebarHover};
      color: ${theme.textHover};
      padding: 8px 12px;
      border-radius: 6px;
      margin-left: 12px;
      white-space: nowrap;
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      font-size: 0.9rem;
      transition: all 0.2s;
      
      &::before {
        content: '';
        position: absolute;
        right: 100%;
        top: 50%;
        transform: translateY(-50%);
        border: 6px solid transparent;
        border-right-color: ${theme.sidebarHover};
      }
    }
    
    &:hover {
      background-color: ${theme.sidebarHover};
      color: ${theme.textHover};
      
      &::after {
        background-color: ${theme.sidebarActive};
        color: ${theme.textActive};
      }
      
      &::after::before {
        border-right-color: ${theme.sidebarActive};
      }
    }
  `}
`;

const ToggleButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0.6rem 1rem;
  margin: 0 0.5rem;
  background-color: ${(props) => props.theme.sidebarHover};
  border: none;
  border-radius: 6px;
  color: ${(props) => props.theme.textDefault};
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.sidebarActive};
    color: ${(props) => props.theme.textHover};
  }

  .svg-inline--fa {
    font-size: 0.9em;
  }

  span {
    opacity: ${({ isOpened }) => (isOpened ? 1 : 0)};
    white-space: nowrap;
    transition: opacity 0.3s;
  }

  ${({ isOpened, theme }) => !isOpened && `
    &:hover::after {
      content: attr(data-title);
      position: absolute;
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      background-color: ${theme.sidebarHover};
      color: ${theme.textHover};
      padding: 8px 12px;
      border-radius: 6px;
      margin-left: 12px;
      white-space: nowrap;
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      font-size: 0.9rem;
      transition: all 0.2s;
      
      &::before {
        content: '';
        position: absolute;
        right: 100%;
        top: 50%;
        transform: translateY(-50%);
        border: 6px solid transparent;
        border-right-color: ${theme.sidebarHover};
      }
    }
    
    &:hover {
      background-color: ${theme.sidebarActive};
      color: ${theme.textActive};
      
      &::after {
        background-color: ${theme.sidebarHover};
        color: ${theme.textHover};
      }
      
      &::after::before {
        border-right-color: ${theme.sidebarHover};
      }
    }
  `}
`;

const routes = [
  { title: 'Home', icon: 'house', path: '/' },
  { title: 'Sales', icon: 'chart-line', path: '/sales' },
  { title: 'Costs', icon: 'chart-column', path: '/costs' },
  { title: 'Payments', icon: 'wallet', path: '/payments' },
  { title: 'Finances', icon: 'chart-pie', path: '/finances' },
  { title: 'Messages', icon: 'envelope', path: '/messages' },
];

const bottomRoutes = [
  { title: 'Settings', icon: 'sliders', path: '/settings' },
  { title: 'Support', icon: 'phone-volume', path: '/support' },
];

const Sidebar = () => {
  const [isOpened, setIsOpened] = useState(true);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('sidebar-theme');
    if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sidebar-theme', theme);
  }, [theme]);

  const toggleSidebar = () => {
    setIsOpened((v) => !v);
  };

  const toggleTheme = () => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={themes[theme]}>
      <GlobalStyle />
      <SidebarContainer className={classnames('sidebar', { opened: isOpened })} isOpened={isOpened}>
        <Header isOpened={isOpened}>
          <img src={logo} alt="TensorFlow logo" />
          <span>TensorFlow</span>
          <div onClick={toggleSidebar}>
            <FontAwesomeIcon icon={isOpened ? 'angle-left' : 'angle-right'} />
          </div>
        </Header>

        <NavSection>
          {routes.map((route) => (
            <NavItem 
              key={route.title} 
              isOpened={isOpened}
              data-title={route.title}
              theme={themes[theme]}
            >
              <FontAwesomeIcon icon={['fas', route.icon]} />
              <span>{route.title}</span>
            </NavItem>
          ))}
        </NavSection>

        <div style={{ marginTop: 'auto' }}>
          <NavSection>
            {bottomRoutes.map((route) => (
              <NavItem 
                key={route.title} 
                isOpened={isOpened}
                data-title={route.title}
                theme={themes[theme]}
              >
                <FontAwesomeIcon icon={['fas', route.icon]} />
                <span>{route.title}</span>
              </NavItem>
            ))}

            <ToggleButton 
              onClick={toggleTheme} 
              isOpened={isOpened}
              data-title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              theme={themes[theme]}
            >
              <FontAwesomeIcon icon={theme === 'dark' ? 'sun' : 'moon'} />
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </ToggleButton>
          </NavSection>
        </div>
      </SidebarContainer>
    </ThemeProvider>
  );
};

export default Sidebar;
import Footer from './Footer';
import Navbar from './Navbar';
import { LayoutProps } from './types';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;


import Navbar from "@/components/Shared/Navbar/Navbar";

interface ILayoutProps {
  children: React.ReactNode;
  className: string
}
const Layout: React.FC<ILayoutProps> = ({ className, children }) => {
  return (
    <div className={className}>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
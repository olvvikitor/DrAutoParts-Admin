import useWindowSize from "../hooks/useWindowSize";
import useToggle from "../hooks/useToggle";
import SidebarDesktop from "../components/sidebar/SidebarDesktop";
import SidebarMobile from "../components/sidebar/SidebarMobile";
import Header from "../components/header/Header";
import { Outlet } from "react-router";

export default function DefaultLayout() {
  const [isOpen, toggleSidebar] = useToggle(false);
  const [isMobileSidebarOpen, toggleMobileSidebar] = useToggle(false);
  const { width } = useWindowSize();

  const isDesktop = width >= 1024;

  return (
    <div className="h-screen flex">
      {isDesktop ? (
        <aside
          className={`h-screen fixed z-20 bg-white dark:bg-gray-900 transition-all duration-500 ${isOpen ? 'w-60' : 'w-20'}`}
        >
          <SidebarDesktop isOpen={isOpen} />
        </aside>
      ) : (
        <SidebarMobile isOpen={isMobileSidebarOpen} toggleSidebar={toggleMobileSidebar} />
      )}

      <div className={`flex flex-col flex-1 min-w-[300px] transition-all duration-500 ${isOpen && isDesktop ? 'ml-60' : isDesktop ? 'ml-20' : ''}`}>
        <header className="sticky top-0 z-10 bg-white dark:bg-gray-900">
          <Header toggleSidebar={isDesktop ? toggleSidebar : toggleMobileSidebar} />
        </header>

        <main className="flex-1 p-6 bg-gray-300/60 dark:bg-gray-800 border-1 border-zinc-400">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

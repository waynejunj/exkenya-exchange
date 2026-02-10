import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { DesktopSidebar } from './DesktopSidebar';

export function AppLayout() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <DesktopSidebar />
      <main className="flex-1 pb-20 md:pb-0 overflow-auto">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}

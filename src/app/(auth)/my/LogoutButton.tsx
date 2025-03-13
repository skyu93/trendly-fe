'use client';
import { useAuth } from '@/hooks/auth/useAuth';
import { Button } from '@/components/ui/button/Button';
import { useRouter } from 'next/navigation';
import { ROUTE_PATH } from '@/constants/route';

export default function LogoutButton() {
  const { logout } = useAuth();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.push(ROUTE_PATH.LOGIN);
  };
  return (
    <Button variant="outline" className="mb-6" onClick={handleLogout}>
      로그아웃
    </Button>
  );
}

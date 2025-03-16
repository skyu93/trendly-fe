'use client';
import { useAuth } from '@/hooks/auth/useAuth';
import { Button } from '@/components/ui/button/Button';
import { useRouter } from 'next/navigation';
import { ROUTE_PATH } from '@/constants/route';
import { useErrorHandler } from '@/hooks/useErrorHandler';

export default function LogoutButton() {
  const { logout } = useAuth();
  const router = useRouter();
  const { handleError } = useErrorHandler();
  const handleLogout = () => {
    try {
      logout();
      router.push(ROUTE_PATH.LOGIN);
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <Button variant="outline" className="mb-6" onClick={handleLogout}>
      로그아웃
    </Button>
  );
}

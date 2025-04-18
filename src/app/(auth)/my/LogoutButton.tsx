'use client';
import { useUser } from '@/hooks/user/useUser';
import { Button } from '@/components/ui/button/Button';
import { useRouter } from 'next/navigation';
import { ROUTE_PATH } from '@/constants/route';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useChat } from '@/hooks/useChat';

export default function LogoutButton() {
  const { logout } = useUser();
  const router = useRouter();
  const { handleError } = useErrorHandler();
  const { disconnect } = useChat();
  const handleLogout = () => {
    try {
      logout();
      disconnect();
    } catch (error) {
      handleError(error);
    } finally {
      router.push(ROUTE_PATH.LOGIN);
    }
  };
  return (
    <Button variant="outline" className="mb-6" onClick={handleLogout}>
      로그아웃
    </Button>
  );
}

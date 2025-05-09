'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { login, loginAnonymously, sendPasswordResetEmail, sendMagicLink } from '@/app/login/actions';
import { useState } from 'react';
import { AuthenticationForm } from '@/components/authentication/authentication-form';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const [magicLinkOpen, setMagicLinkOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [magicLinkEmail, setMagicLinkEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogin() {
    setIsSubmitting(true);
    try {
      const result = await login({ email, password });
      
      // Check if result exists and handle it properly
      if (result && result.error) {
        toast({ 
          title: 'Login failed',
          description: result.message || 'Invalid email or password', 
          variant: 'destructive' 
        });
      } else if (result && result.success) {
        toast({
          title: 'Login successful',
          description: 'You are being redirected...',
        });
        
        // Use router instead of direct window location for better Next.js integration
        router.push(result.redirectTo || '/');
      }
    } catch (error) {
      // Explicitly handle the error object
      console.error('Login error:', error);
      
      let errorMessage = 'An unexpected error occurred';
      if (error && typeof error === 'object') {
        errorMessage = (error as { message?: string }).message || JSON.stringify(error);
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      toast({ 
        title: 'Login error',
        description: errorMessage, 
        variant: 'destructive' 
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  
  async function handleAnonymousLogin() {
    setIsSubmitting(true);
    try {
      const data = await loginAnonymously();
      // We don't need to handle redirects here as the server action does it
      if (data && data.error) {
        toast({ 
          title: 'Login failed',
          description: data.message || 'Something went wrong. Please try again', 
          variant: 'destructive' 
        });
      }
    } catch (error) {
      console.error('Anonymous login error:', error);
      
      let errorMessage = 'An unexpected error occurred';
      if (error && typeof error === 'object') {
        errorMessage = (error as { message?: string }).message || JSON.stringify(error);
      }
      
      toast({ 
        description: errorMessage, 
        variant: 'destructive' 
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handlePasswordReset(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await sendPasswordResetEmail({ email: resetEmail });
      
      if (result && result.error) {
        toast({
          title: 'Error',
          description: result.message || 'Failed to send reset email',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Email sent',
          description: 'Check your inbox for password reset instructions',
        });
        setResetPasswordOpen(false);
        setResetEmail('');
      }
    } catch (error) {
      console.error('Password reset error:', error);
      
      let errorMessage = 'Failed to send reset email';
      if (error && typeof error === 'object') {
        errorMessage = (error as { message?: string }).message || errorMessage;
      }
      
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleMagicLink(e: { preventDefault: () => void; }) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = await sendMagicLink({ email: magicLinkEmail });
      if (data && data.error) {
        toast({ 
          title: 'Error',
          description: data.message || 'Failed to send magic link', 
          variant: 'destructive' 
        });
      } else {
        toast({ 
          title: 'Magic link sent',
          description: 'Check your inbox for a link to log in',
        });
        setMagicLinkOpen(false);
      }
    } catch (error) {
      console.error('Magic link error:', error);
      
      let errorMessage = 'An error occurred';
      if (error && typeof error === 'object') {
        errorMessage = (error as { message?: string }).message || errorMessage;
      }
      
      toast({ description: errorMessage, variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <form action={'#'} className={'px-6 md:px-16 pb-6 py-8 gap-6 flex flex-col items-center justify-center'}>
        <Image src={'/assets/icons/logo/aeroedit-icon.svg'} alt={'AeroEdit'} width={80} height={80} />
        <div className={'text-[30px] leading-[36px] font-medium text-black dark:text-white tracking-[-0.6px] text-center'}>
          Log in to your account
        </div>
        <Button
          onClick={handleAnonymousLogin}
          type={'button'}
          variant={'secondary'}
          className={'w-full mt-6 font-medium text-black dark:text-white border-2 border-gray-300 dark:border-red-500'}
          disabled={isSubmitting}
        >
          Log in as Guest
        </Button>
        <div className={'flex w-full items-center justify-center'}>
          <Separator className={'w-5/12 bg-gray-300 dark:bg-red-500'} />
          <div className={'text-gray-500 dark:text-gray-300 text-xs font-medium px-4'}>or</div>
          <Separator className={'w-5/12 bg-gray-300 dark:bg-red-500'} />
        </div>
        <AuthenticationForm
          email={email}
          onEmailChange={(email) => setEmail(email)}
          password={password}
          onPasswordChange={(password) => setPassword(password)}
        />
        <Button
          onClick={handleLogin}
          type={'button'}
          variant={'secondary'}
          className={'w-full text-black dark:text-white'}
          disabled={isSubmitting}
        >
          Log in
        </Button>
        
        <Button
          onClick={() => setMagicLinkOpen(true)}
          type={'button'}
          variant={'link'}
          className={'text-sm text-blue-600 dark:text-blue-400 mt-2'}
        >
          Log in with magic link
        </Button>
        
        <div className="flex w-full justify-end mt-2">
          <Button
            onClick={() => setResetPasswordOpen(true)}
            type={'button'}
            variant={'link'}
            className={'text-sm text-blue-600 dark:text-blue-400'}
          >
            Forgot password?
          </Button>
        </div>
      </form>

      {/* Reset Password Dialog */}
      <Dialog open={resetPasswordOpen} onOpenChange={setResetPasswordOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reset your password</DialogTitle>
            <DialogDescription>
              Enter your email address and we wll send you a link to reset your password.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePasswordReset} className="space-y-4 py-4">
            <Input
              id="reset-email"
              type="email"
              placeholder="Email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              required
              className="w-full"
            />
            <DialogFooter>
              <Button 
                type="submit" 
                disabled={isSubmitting || !resetEmail}
                className="w-full"
              >
                Send reset link
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Magic Link Dialog */}
      <Dialog open={magicLinkOpen} onOpenChange={setMagicLinkOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Login with magic link</DialogTitle>
            <DialogDescription>
              Enter your email address and we will send you a magic link to log in.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleMagicLink} className="space-y-4 py-4">
            <Input
              id="magic-link-email"
              type="email"
              placeholder="Email"
              value={magicLinkEmail}
              onChange={(e) => setMagicLinkEmail(e.target.value)}
              required
              className="w-full"
            />
            <DialogFooter>
              <Button 
                type="submit" 
                disabled={isSubmitting || !magicLinkEmail}
                className="w-full"
              >
                Send magic link
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
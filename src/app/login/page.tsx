import '../../styles/login.css';
import { LoginForm } from '@/components/authentication/login-form';
import { GhLoginButton } from '@/components/authentication/gh-login-button';

export default function LoginPage() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Removed LoginGradient */}
      <div className="flex flex-col">
        <div
          className={
            'mx-auto mt-[112px] bg-white dark:bg-gray-800 w-[343px] md:w-[488px] gap-5 flex-col rounded-lg rounded-b-none border border-gray-300 dark:border-gray-700 backdrop-blur-none'
          }
        >
          {/* Removed LoginCardGradient */}
          <LoginForm />
        </div>
        <GhLoginButton label={'Log in with GitHub'} />
        <div
          className={
            'mx-auto w-[343px] md:w-[488px] bg-white dark:bg-gray-800 px-6 md:px-16 pt-0 py-8 gap-6 flex flex-col items-center justify-center rounded-b-lg border border-gray-300 dark:border-gray-700'
          }
        >
          <div className="text-center text-black dark:text-white text-sm mt-4 font-medium">
            Don’t have an account?{' '}
            <a href={'/signup'} className="text-blue-600 dark:text-blue-400 hover:underline">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

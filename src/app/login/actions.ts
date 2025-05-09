'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

interface FormData {
  email: string;
  password: string;
}

interface EmailData {
  email: string;
}

// Define a custom error type
interface CustomError {
  message: string;
  [key: string]: unknown;
}

export async function login(data: FormData) {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword(data);
   
    if (error) {
      return { error: true, message: error.message };
    }
   
    revalidatePath('/', 'layout');
    // Return a success status instead of redirecting directly
    return { success: true, redirectTo: '/dashboard' };
  } catch (error: unknown) {
    const err = error as CustomError;
    return { error: true, message: err.message || 'Login failed' };
  }
}

export async function signInWithGithub() {
  try {
    const supabase = await createClient();
   
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });
   
    if (error) {
      return { error: true, message: error.message };
    }
   
    if (data.url) {
      redirect(data.url);
    }
  } catch (error: unknown) {
    const err = error as CustomError;
    return { error: true, message: err.message || 'GitHub sign-in failed' };
  }
}

export async function loginAnonymously() {
  try {
    const supabase = await createClient();
   
    const { error: signInError } = await supabase.auth.signInAnonymously();
    const { error: updateUserError } = await supabase.auth.updateUser({
      email: `aeroedit+${Date.now().toString(36)}@paddle.com`,
    });
   
    if (signInError || updateUserError) {
      return {
        error: true,
        message: signInError?.message || updateUserError?.message
      };
    }
   
    revalidatePath('/', 'layout');
    redirect('/');
  } catch (error: unknown) {
    const err = error as CustomError;
    return { error: true, message: err.message || 'Anonymous login failed' };
  }
}

export async function sendMagicLink(data: EmailData) {
  try {
    const supabase = await createClient();
   
    const { error } = await supabase.auth.signInWithOtp({
      email: data.email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });
   
    if (error) {
      return { error: true, message: error.message };
    }
   
    return { success: true };
  } catch (error: unknown) {
    const err = error as CustomError;
    return { error: true, message: err.message || 'Failed to send magic link' };
  }
}

export async function sendPasswordResetEmail(data: EmailData) {
  try {
    const supabase = await createClient();
   
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/update-password`,
    });
   
    if (error) {
      return { error: true, message: error.message };
    }
   
    return { success: true };
  } catch (error: unknown) {
    const err = error as CustomError;
    return { error: true, message: err.message || 'Failed to send password reset email' };
  }
}
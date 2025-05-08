'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function updatePassword(formData: FormData) {
  // Get form data
  const token = formData.get('token') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  // Validate inputs
  if (!token) {
    return { error: true, message: 'Missing password reset token' };
  }

  if (!password || !confirmPassword) {
    return { error: true, message: 'Please fill in all fields' };
  }

  if (password !== confirmPassword) {
    return { error: true, message: 'Passwords do not match' };
  }

  if (password.length < 8) {
    return { error: true, message: 'Password must be at least 8 characters' };
  }

  try {
    // Initialize Supabase client
    const supabase = await createClient();

    // Verify the token first
    const { error: verifyError } = await supabase.auth.verifyOtp({
      token_hash: token,
      type: 'recovery',
    });

    if (verifyError) {
      return {
        error: true,
        message: 'Invalid or expired token. Please request a new password reset link.',
      };
    }

    // Update the password
    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });

    if (updateError) {
      return { error: true, message: updateError.message };
    }

    // Sign out all existing sessions
    await supabase.auth.signOut();

    // Return success message
    return {
      success: true,
      message: 'Password updated successfully. You can now log in with your new password.',
    };
  } catch (error: any) {
    console.error('Password update error:', error);
    return {
      error: true,
      message: error.message || 'An unexpected error occurred. Please try again.',
    };
  }
}

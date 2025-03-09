import { z } from 'zod'


export const SignUpFormSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required.')
        .email('Enter a valid email address.')
        .trim(),
    password: z
        .string()
        .min(1, 'Password is required.')
        .min(8, 'Password must be at least 8 characters long.')
        .regex(/[a-zA-Z]/, 'Contain at least one letter.')
        .regex(/[0-9]/, 'Contain at least one number.')
        .regex(/[^a-zA-Z0-9]/, 'Contain at least one special character.')
        .trim(),
    confirmPassword: z
        .string()
        .min(1, 'Confirmation is required.')
}).refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
})

export const SignInFormSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required.')
        .email('Enter a valid email address.')
        .trim(),
    password: z
        .string()
        .min(1, 'Password is required.')
        .trim()
})
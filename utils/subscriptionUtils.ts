
import { UserProfile } from '../types';

export const canViewBilling = (user: UserProfile | null): boolean => {
    return user?.role === 'SuperAdmin' || user?.role === 'Admin';
};

export const hasActiveSubscription = (user: UserProfile | null): boolean => {
    if (!user) return false;
    // SuperAdmin always has access
    if (user.role === 'SuperAdmin') return true;

    // Check status logic - assuming status is on Organization which we merge or fetch
    // For now, MVP assumes active if not explicitly blocked
    // Ideally this comes from user.organization.status check

    return true;
};

// Middleware-like function to guard routes
export const checkSubscriptionStatus = (user: UserProfile | null, currentPath: string): { allowed: boolean; redirect?: string } => {
    if (!user) return { allowed: true }; // Let auth handle this

    // Mock organization status check - in real app would be user.organization?.status
    const orgStatus: string = 'active'; // This should be dynamic

    if (orgStatus === 'past_due' || orgStatus === 'canceled') {
        if (currentPath !== '/billing') {
            return { allowed: false, redirect: '/billing' };
        }
    }

    return { allowed: true };
};

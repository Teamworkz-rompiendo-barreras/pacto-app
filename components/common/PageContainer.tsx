import React, { ReactNode } from 'react';

interface PageContainerProps {
    children: ReactNode;
    className?: string;
}

/**
 * A standardized container for all main views.
 * Enforces consistent padding, max-width, and centering.
 */
export const PageContainer: React.FC<PageContainerProps> = ({ children, className = '' }) => {
    return (
        <div className={`w-full max-w-7xl mx-auto animate-fade-in font-display pb-12 px-6 md:px-10 pt-8 md:pt-12 ${className}`}>
            {children}
        </div>
    );
};

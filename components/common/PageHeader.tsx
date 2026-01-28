import React, { ReactNode } from 'react';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    badge?: ReactNode; // Can be string or JSX Element (icon + text)
    badgeColor?: string; // Optional override class for badge bg/text
    actionButton?: ReactNode;
    onBack?: () => void;
    backLabel?: string;
}

/**
 * A standardized header for all pages.
 * Ensures titles, subtitles, badges, and action buttons are always aligned consistently.
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    subtitle,
    badge,
    badgeColor = 'bg-primary/10 text-primary',
    actionButton,
    onBack,
    backLabel = 'Volver'
}) => {
    return (
        <div className="flex flex-col gap-6 mb-10">
            {/* Back Button Row (if provided) */}
            {onBack && (
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-bold text-sm w-fit group"
                >
                    <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">arrow_back</span>
                    {backLabel}
                </button>
            )}

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="flex flex-col gap-3">
                    {/* Badge */}
                    {badge && (
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider w-fit ${badgeColor}`}>
                            {badge}
                        </div>
                    )}

                    {/* Title */}
                    <h1 className="text-3xl md:text-5xl font-black text-text-n900 tracking-tight leading-tight">
                        {title}
                    </h1>

                    {/* Subtitle */}
                    {subtitle && (
                        <p className="text-lg md:text-xl text-gray-600 font-medium max-w-2xl">
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Primary Action Button */}
                {actionButton && (
                    <div className="flex-shrink-0">
                        {actionButton}
                    </div>
                )}
            </div>
        </div>
    );
};

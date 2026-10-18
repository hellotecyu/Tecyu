import React from 'react';

export type LogoVariant = 'primary' | 'horizontal' | 'dark' | 'compact' | 'icon';

interface TecyuLogoProps {
  variant?: LogoVariant;
  className?: string;
  tagline?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const TecyuLogo: React.FC<TecyuLogoProps> = ({
  variant = 'primary',
  className = '',
  tagline = 'Technology For You',
  size = 'md',
}) => {
  // Gradients for SVG
  const gradientId = React.useId();
  const blueCyanGrad = `url(#blueCyanGrad-${gradientId})`;
  const darkStemGrad = `url(#darkStemGrad-${gradientId})`;

  const sizeClasses = {
    sm: variant === 'icon' ? 'w-8 h-8' : 'h-7',
    md: variant === 'icon' ? 'w-10 h-10' : 'h-9',
    lg: variant === 'icon' ? 'w-14 h-14' : 'h-12',
    xl: variant === 'icon' ? 'w-20 h-20' : 'h-16',
  }[size];

  const isDark = variant === 'dark';
  const navyColor = isDark ? '#FFFFFF' : '#08152F';
  const tagColor = isDark ? '#94A3B8' : '#64748B';

  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <svg
          viewBox="0 0 100 100"
          className={`${sizeClasses}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="TECYU Icon"
        >
          <defs>
            <linearGradient id={`blueCyanGrad-${gradientId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
            <linearGradient id={`topBarGrad-${gradientId}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={isDark ? '#FFFFFF' : '#08152F'} />
              <stop offset="70%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
          <rect width="100" height="100" rx="22" fill={isDark ? '#08152F' : '#0B172E'} />
          {/* Top Bar of T */}
          <path
            d="M 16 32 C 16 32 46 25 82 25 C 84 25 85 27 84 29 L 80 37 C 79 39 77 40 75 40 C 58 40 46 41 39 45 L 34 48 C 28 44 21 38 16 32 Z"
            fill={`url(#topBarGrad-${gradientId})`}
          />
          {/* Stem of T with aerodynamic curve */}
          <path
            d="M 39 45 C 47 48 48 54 44 65 C 40 76 33 83 26 84 C 23 84 21 82 22 79 C 25 66 31 52 28 42 C 32 43 36 44 39 45 Z"
            fill={blueCyanGrad}
          />
        </svg>
      </div>
    );
  }

  // Pure SVG Wordmark matching reference image
  const WordmarkSvg = (
    <svg
      viewBox="0 0 460 110"
      className="h-full w-auto max-w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="TECYU"
    >
      <defs>
        <linearGradient id={`blueCyanGrad-${gradientId}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
        <linearGradient id={`darkStemGrad-${gradientId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1D4ED8" />
          <stop offset="60%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>

      {/* --- LETTER T (Aerodynamic curved top bar + swooping blue stem) --- */}
      {/* Top Crossbar */}
      <path
        d="M 12 36 C 24 25 58 22 108 22 C 114 22 118 25 116 30 L 111 41 C 109 44 105 45 101 45 C 80 45 66 47 56 52 C 48 56 42 63 38 72 C 34 81 29 96 23 97 C 19 97 18 93 20 86 C 25 67 31 50 18 47 C 13 46 10 40 12 36 Z"
        fill={navyColor}
      />
      {/* Blue dynamic stem swoop */}
      <path
        d="M 44 48 C 55 48 57 58 53 71 C 48 85 41 97 31 99 C 27 99 26 95 28 89 C 33 73 39 57 32 47 C 36 47.5 40 47.8 44 48 Z"
        fill={darkStemGrad}
      />

      {/* --- LETTER E (Three futuristic streamlined parallel bars) --- */}
      {/* Top bar */}
      <path
        d="M 124 29 C 124 26 127 24 130 24 L 176 24 C 182 24 186 28 186 34 C 186 40 182 44 176 44 L 138 44 C 133 44 128 41 125 36 Z"
        fill={navyColor}
      />
      {/* Middle bar */}
      <path
        d="M 124 57 C 124 53 128 50 132 50 L 168 50 C 174 50 178 54 178 60 C 178 66 174 70 168 70 L 138 70 C 132 70 126 66 124 60 Z"
        fill={navyColor}
      />
      {/* Bottom bar */}
      <path
        d="M 124 82 C 124 78 128 76 132 76 L 178 76 C 184 76 188 80 188 86 C 188 92 184 96 178 96 L 134 96 C 127 96 124 90 124 82 Z"
        fill={navyColor}
      />

      {/* --- LETTER C (Bold modern geometric circular contour) --- */}
      <path
        d="M 262 39 C 255 29 242 22 224 22 C 197 22 180 41 180 61 C 180 81 198 98 226 98 C 245 98 258 90 264 80 C 267 76 264 71 259 71 L 244 71 C 241 71 238 73 236 75 C 233 79 229 82 224 82 C 210 82 199 72 199 61 C 199 49 210 38 224 38 C 230 38 235 41 238 45 C 240 48 244 49 247 49 L 260 49 C 264 49 266 44 262 39 Z"
        fill={navyColor}
      />

      {/* --- LETTER Y (Electric Blue to Cyan Gradient) --- */}
      <path
        d="M 284 25 C 288 25 292 27 294 31 L 312 60 L 330 31 C 332 27 336 25 340 25 L 354 25 C 359 25 362 31 358 35 L 324 76 L 324 93 C 324 96 321 98 318 98 L 306 98 C 303 98 300 96 300 93 L 300 76 L 267 35 C 263 31 266 25 271 25 Z"
        fill={blueCyanGrad}
      />

      {/* --- LETTER U (Bold clean rounded electric-cyan finish) --- */}
      <path
        d="M 370 25 C 374 25 378 28 378 33 L 378 64 C 378 77 387 83 398 83 C 409 83 418 77 418 64 L 418 33 C 418 28 422 25 426 25 L 439 25 C 443 25 447 28 447 33 L 447 64 C 447 88 427 99 398 99 C 369 99 349 88 349 64 L 349 33 C 349 28 353 25 357 25 Z"
        fill={blueCyanGrad}
      />
    </svg>
  );

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center ${sizeClasses} ${className}`}>
        {WordmarkSvg}
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className={`inline-flex items-center gap-3 ${className}`}>
        <div className={sizeClasses}>{WordmarkSvg}</div>
        <div className="h-6 w-[1.5px] bg-slate-300 dark:bg-slate-700 hidden sm:block" />
        <div className="hidden sm:flex flex-col text-[11px] font-medium tracking-wider text-slate-500 uppercase leading-tight">
          <span>Technology</span>
          <span className="text-[#2563EB] font-semibold">For You</span>
        </div>
      </div>
    );
  }

  // Primary or Dark (default layout with tagline underneath)
  return (
    <div className={`inline-flex flex-col items-start ${className}`}>
      <div className={sizeClasses}>{WordmarkSvg}</div>
      {tagline && (
        <span
          className="text-[10px] md:text-[11px] font-medium tracking-[0.28em] uppercase mt-1 pl-1 transition-colors"
          style={{ color: tagColor }}
        >
          {tagline}
        </span>
      )}
    </div>
  );
};

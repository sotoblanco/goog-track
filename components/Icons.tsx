
import React from 'react';

export const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
  </svg>
);

export const ChevronRightIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
  </svg>
);

export const XMarkIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);

export const TrashIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.067-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  </svg>
);

export const FireIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 0 0-1.071 1.052A9.75 9.75 0 0 1 12 12.75v-5.464a.75.75 0 0 0-1.5 0v5.464a9.75 9.75 0 0 1-1.071-1.052.75.75 0 0 0-1.052 1.071A11.25 11.25 0 0 0 12 24a11.25 11.25 0 0 0 9.214-5.503.75.75 0 0 0-1.052-1.071A9.75 9.75 0 0 1 12 19.5v-5.464a.75.75 0 0 0-1.5 0v5.464a9.75 9.75 0 0 1-1.071-1.052.75.75 0 0 0-1.052 1.071A11.25 11.25 0 0 0 12 24a11.25 11.25 0 0 0 9.214-5.503.75.75 0 0 0-1.052-1.071A9.75 9.75 0 0 1 12 19.5v-5.464a.75.75 0 0 0-1.5 0v5.464a9.75 9.75 0 0 1-1.071-1.052.75.75 0 0 0-1.052 1.071A11.25 11.25 0 0 0 12 24a11.25 11.25 0 0 0 9.214-5.503.75.75 0 0 0-1.052-1.071A9.75 9.75 0 0 1 12 19.5V2.25a.75.75 0 0 0-.75-.75.75.75 0 0 0-.75.75v17.25a9.75 9.75 0 0 1-1.071-1.052.75.75 0 0 0-1.052 1.071A11.25 11.25 0 0 0 12 24a11.25 11.25 0 0 0 9.214-5.503.75.75 0 0 0-1.052-1.071A9.75 9.75 0 0 1 12 19.5v-5.464a.75.75 0 0 0-1.5 0v5.464a9.75 9.75 0 0 1-1.071-1.052.75.75 0 0 0-1.052 1.071A11.25 11.25 0 0 0 12 24a11.25 11.25 0 0 0 9.214-5.503.75.75 0 0 0-1.052-1.071A9.75 9.75 0 0 1 12 19.5V2.25a.75.75 0 0 0-.75-.75.75.75 0 0 0-.75.75v17.25a9.75 9.75 0 0 1-1.071-1.052.75.75 0 0 0-1.052 1.071A11.25 11.25 0 0 0 12 24a11.25 11.25 0 0 0 9.214-5.503.75.75 0 0 0-1.052-1.071A9.75 9.75 0 0 1 12 19.5V2.25a.75.75 0 0 0-1.5 0v17.25a9.75 9.75 0 0 1-1.071-1.052.75.75 0 0 0-1.052 1.071A11.25 11.25 0 0 0 12 24a11.25 11.25 0 0 0 9.214-5.503.75.75 0 0 0-1.052-1.071A9.75 9.75 0 0 1 12 19.5V2.25a.75.75 0 0 0-1.5 0Z" clipRule="evenodd" />
    </svg>
);

export const TrophyIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9c-1.657 0-3-1.343-3-3V12.75c0-1.657 1.343-3 3-3h9c1.657 0 3 1.343 3 3v2.25c0 1.657-1.343 3-3 3Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 18.75v-1.5a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5v1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 8.25V6a2.25 2.25 0 0 1 2.25-2.25h0a2.25 2.25 0 0 1 2.25 2.25v2.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12.75H4.5a2.25 2.25 0 0 0-2.25 2.25v.75" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 12.75h1.5a2.25 2.25 0 0 1 2.25 2.25v.75" />
    </svg>
);

export const Bars3Icon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);

export const TagIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
    </svg>
);

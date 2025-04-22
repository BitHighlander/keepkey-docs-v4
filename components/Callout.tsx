import React from 'react';

interface CalloutProps {
  emoji?: string;
  children: React.ReactNode;
  type?: 'default' | 'info' | 'warning' | 'error';
}

export function Callout({ emoji, children, type = 'default' }: CalloutProps) {
  const bgColors = {
    default: 'bg-gray-100 dark:bg-gray-800',
    info: 'bg-blue-100 dark:bg-blue-900/30',
    warning: 'bg-yellow-100 dark:bg-yellow-900/30',
    error: 'bg-red-100 dark:bg-red-900/30',
  };

  const borderColors = {
    default: 'border-gray-200 dark:border-gray-700',
    info: 'border-blue-200 dark:border-blue-800',
    warning: 'border-yellow-200 dark:border-yellow-800',
    error: 'border-red-200 dark:border-red-800',
  };

  return (
    <div
      className={`${bgColors[type]} ${borderColors[type]} border-l-4 p-4 my-4 rounded-r`}
      style={{ 
        padding: '1rem',
        marginBottom: '1.5rem',
        borderLeftWidth: '4px',
        borderRadius: '0 0.375rem 0.375rem 0',
        backgroundColor: type === 'default' ? '#f3f4f6' : 
                         type === 'info' ? '#dbeafe' : 
                         type === 'warning' ? '#fef3c7' : 
                         '#fee2e2'
      }}
    >
      {emoji && <span style={{ marginRight: '0.5rem' }}>{emoji}</span>}
      <div style={{ display: 'inline' }}>{children}</div>
    </div>
  );
}

// For backward compatibility
export default Callout;

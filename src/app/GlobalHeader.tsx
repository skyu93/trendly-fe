import React from 'react';

interface IconProps {
  children: React.ReactNode;
  className?: string;
}

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface HeaderComponent extends React.FC<HeaderProps> {
  Icon: React.FC<IconProps>;
  Title: React.FC<TitleProps>;
}

const Icon: React.FC<IconProps> = ({ children, className = '' }) => {
  return <div className={`flex items-center ${className}`}>{children}</div>;
};

const Title: React.FC<TitleProps> = ({ children, className = '' }) => {
  return (
    <h1 className={`absolute left-1/2 transform -translate-x-1/2 font-bold text-greyscale-10 ${className}`}>
      {children}
    </h1>
  );
};

const GlobalHeader: HeaderComponent = ({ children, className = '' }) => {
  return (
    <header className={`absolute top-0 left-0 right-0 z-10 h-[49px] flex items-center p-4 ${className}`}>
      {children}
    </header>
  );
};

GlobalHeader.Icon = Icon;
GlobalHeader.Title = Title;

export default GlobalHeader;

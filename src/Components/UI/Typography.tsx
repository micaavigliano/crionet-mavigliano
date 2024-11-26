import { ReactNode } from 'react';

//add more variants and element types in the future
type VariantType = 'h1' | 'p';
type ElementType = 'p' | 'h1' | 'span';

interface TypographyProps {
  children: ReactNode;
  variant?: VariantType;
  className?: string;
  colorClass?: string;
  as?: ElementType;
}

const Typography = ({
  children,
  variant = 'p',
  className = '',
  colorClass = '',
  as: Component = 'p',
}: TypographyProps) => {
  const baseStyles = {
    h1: 'text-4xl text-center font-bold',
    p: 'text-xl',
  }[variant] || 'text-xl';


  return (
    <Component className={`${baseStyles} ${colorClass} ${className}`}>
      {children}
    </Component>
  );
};

export default Typography;
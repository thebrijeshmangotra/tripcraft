import { Suspense, ComponentType, ReactNode } from "react";

interface LazyComponentProps {
  component: ComponentType<any>;
  fallback?: ReactNode;
  condition?: boolean;
  children?: ReactNode;
  [key: string]: any;
}

const LazyComponent = ({ 
  component: Component, 
  fallback = <div className="animate-pulse bg-muted rounded h-32" />, 
  condition = true,
  children,
  ...props 
}: LazyComponentProps) => {
  if (!condition) {
    return children || null;
  }

  return (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  );
};

export default LazyComponent;

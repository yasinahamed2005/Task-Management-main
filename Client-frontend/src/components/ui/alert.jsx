// src/components/ui/alert.jsx
import React from 'react'
import { cn } from '../../lib/utils'
import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react'

const alertVariants = {
  default: 'border-border text-foreground',
  destructive: 'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
  success: 'border-green-500/50 text-green-600 [&>svg]:text-green-600',
  warning: 'border-amber-500/50 text-amber-600 [&>svg]:text-amber-600'
}

const alertIcons = {
  default: <Info className="w-4 h-4" />,
  destructive: <XCircle className="w-4 h-4" />,
  success: <CheckCircle className="w-4 h-4" />,
  warning: <AlertTriangle className="w-4 h-4" />
}

const Alert = React.forwardRef(
  ({ className, variant = 'default', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4',
          'text-sm [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11',
          alertVariants[variant],
          className
        )}
        {...props}
      >
        {alertIcons[variant]}
        <div>{children}</div>
      </div>
    )
  }
)
Alert.displayName = 'Alert'

const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('mb-1 font-medium leading-none tracking-tight', className)}
    {...props}
  />
))
AlertTitle.displayName = 'AlertTitle'

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
))
AlertDescription.displayName = 'AlertDescription'

export { Alert, AlertTitle, AlertDescription }
import React from 'react'

const BoxContainer = ({children, className}: {children?: React.ReactNode, className?: string}) => {
  return (
    <div className={`shadow-[3px_4px_12.3px_rgba(0,0,0,0.25)] inline-block ${className}`}>
      {children}
    </div>
  )
}

export default BoxContainer
/* Rectangle 14 */


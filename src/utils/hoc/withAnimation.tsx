import { ComponentType } from "react"

const withAnimation = (Component: ComponentType, animateType?: string) => {
  return function(props: any) {
    
    const handleAnimateType = (animation: string) => {

    }

    return (
      <div className="animate-fade-in">
        <Component {...props} />
      </div>
    )
  }
} 

export default withAnimation
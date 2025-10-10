import React from 'react'

interface TextProps {
  size?: string,
  weight?: string,
  type?: string,
  className?: string
}

const Text = ({ size, type, weight, className }: TextProps) => {

  const handleWeight = () => {

    //should return tailwind css weight class based on the weight props
  }

  const handleSize = () => {
    //should return tailwind css font class based on the size props
  }

  return (
    <p className="font-avenir-regular">
      
    </p>
  )
}

export default Text

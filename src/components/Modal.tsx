import React from 'react'

interface ModalProps {
  position?: "right" | "left" | "center"
  open?:boolean
  close?: () => {}
  fullWidth?: boolean
  fullHeight?: boolean
  children?: React.ReactNode
}

const Modal = ({ position = "center", open, close, fullHeight, fullWidth, children  }: ModalProps) => {

  const handleContentPosition = (pos: string) => {
    switch (pos) {
      case "right":
        return ""
        break

      case "left":
        return ""
        break

      default:
        return "justify-center items-center"

    }
  } 

  if (!open) return null

  return (
    <div className={`overlay flex ${handleContentPosition(position)}`}>
      <div className=''>
        { children }
      </div>
    </div>
  )
}

export default Modal

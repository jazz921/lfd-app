import React from 'react'

const TestComponent = ({ text = 'Hello Wlrd'}: { text?: string }) => {
  return (
    <div>
      {text}
    </div>
  )
}

export default TestComponent

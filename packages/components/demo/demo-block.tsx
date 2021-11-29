import React from 'react'

interface IDemoProps {
  title?: string
  subtitle?: string
  style?: React.CSSProperties
}

export const DemoBlock: React.FC<IDemoProps> = ({title, subtitle, style, children}) => {
  return (
    <div className="formily-demo">
      {title && <div className="formily-demo-title">{title}</div>}
      {subtitle && <div className="subtitle">{subtitle}</div>}
      <div className="formily-demo-content" style={style}>
        {children}
      </div>
    </div>
  )
}

export default DemoBlock

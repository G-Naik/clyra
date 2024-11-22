"use client"

interface ButtonProps {
    ClassName?:string,
    disabled?:boolean,
    children?: string | JSX.Element | number,
    onClick?: () => void
}

const Button = ({ClassName,disabled,children,onClick}:ButtonProps) => {
  return (
    <button
    disabled={disabled}
    className={ClassName}
    onClick={onClick}
    >{children}</button>
  )
}
export default Button
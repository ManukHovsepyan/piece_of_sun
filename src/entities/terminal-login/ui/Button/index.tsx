import { HTMLProps } from "react"

interface Props {
  type: "button" | "submit" | "reset" | undefined
}

export const TerminalButton: React.FC<HTMLProps<HTMLButtonElement> & Props> = ({children, ...props}) => {
  return (
    <button {...props}>{children}</button>
  )
}
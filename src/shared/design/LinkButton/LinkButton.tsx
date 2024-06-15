import { Link } from "expo-router"

import Button, { ButtonProps } from "../Button"

export interface LinkButtonProps extends ButtonProps {
  href: string
}

const LinkButton: React.FC<LinkButtonProps> = ({ href, ...props }) => {
  return (
    <Link href={href} asChild>
      <Button {...props} />
    </Link>
  )
}

export default LinkButton

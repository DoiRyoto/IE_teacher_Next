import { Button } from '@chakra-ui/react'
import { login, logout } from '@/lib/firebase/auth'

export function LoginButton() {
  return (
    <Button
      fontSize={'sm'}
      fontWeight={600}
      variant={'link'}
      onClick={() => {
        login()
      }}
    >
      Log in
    </Button>
  )
}

export function LogoutButton() {
  return (
    <Button
      fontSize={'sm'}
      fontWeight={600}
      variant={'link'}
      onClick={() => {
        logout()
      }}
    >
      Log out
    </Button>
  )
}

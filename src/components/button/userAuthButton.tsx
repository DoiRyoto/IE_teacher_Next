import { login, logout } from "@/lib/firebase/auth"
import { Button } from "@chakra-ui/react"

export function LoginButton () {
    return (
        <Button
        fontSize={"sm"}
        fontWeight={600}
        variant={"link"}
        onClick={() => {login()}}
        >
            Log in
        </Button>
    )
}

export function LogoutButton () {
    return (
        <Button
        fontSize={"sm"}
        fontWeight={600}
        variant={"link"}
        onClick={() => {logout()}}
        >
            Log out
        </Button>
    )
}
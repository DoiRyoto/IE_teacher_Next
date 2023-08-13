"use client"

import { FormLabel, Input, Button, VStack } from '@chakra-ui/react'
import { useState } from 'react'
 
export default function HookForm() {
 const [name, setName] = useState('')
 const [password, setPassword] = useState('')
 
 const handleClick = () => {
   console.log({ name, password })
   setName('')
   setPassword('')
 }
 
 return (
   <VStack>
     <VStack w="30vw">
       <FormLabel htmlFor="name">First name</FormLabel>
       <Input
         id="name"
         placeholder="name"
         value={name}
         onChange={(e) => setName(e.target.value)}
       />
 
       <FormLabel htmlFor="password">Password</FormLabel>
       <Input
         id="password"
         placeholder="password"
         type="password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
       />
 
       <Button mt={4} colorScheme="teal" onClick={handleClick}>
         Submit
       </Button>
     </VStack>
   </VStack>
 )
}
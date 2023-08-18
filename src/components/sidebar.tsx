'use client'

import React, { ReactNode } from 'react'
import {
  Box,
  Button,
  Flex,
  Icon,
  useColorModeValue,
  FlexProps,
  Spacer,
  Stack
} from '@chakra-ui/react'
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiBarChart2,
  FiSettings,
  FiMenu,
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import { ReactText } from 'react'
import { useAuthContext } from '@/libs/provider/authContextProvider'
import { login, logout } from '@/libs/firebase/auth'

interface LinkItemProps {
  name: string
  icon: IconType
  linkFor?: string
}

export default function SimpleSidebar() {
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <Box ml={{ base: "20", md: "60" }} >
          {/* Content */}
      </Box>
      <SidebarContent />
    </Box>
  )
}

const SidebarContent = () => {

  const user = useAuthContext()

  const LinkItems: Array<LinkItemProps> = [
    { name: 'Statistics', icon: FiBarChart2, linkFor: `/${user.user?.uid}/statistics`},
    { name: 'Favourites', icon: FiStar, linkFor: `/${user.user?.uid}/favorites`},
  ]

  return (
    <Flex
      direction={"column"}
			pt={"4"}
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 20, md: 60 }}
      pos="fixed"
      h="full"
      >
      {user.user && LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} linkFor={link.linkFor as string}>
          {link.name}
        </NavItem>
      ))}
      <Spacer />
      <Box >
        {user.user && (
            <Flex justify={"center"}>
            <Button
                fontSize={"sm"}
                fontWeight={600}
                variant={"link"}
                onClick={() => {logout()}}
              >
                Sign out
            </Button>
          </Flex>
          )}
        {!user.user && (
          <Flex justify={"center"}>
          <Button
              fontSize={"sm"}
              fontWeight={600}
              onClick={() => {login()}}
              variant={"link"}
            >
              Sign In
          </Button>
        </Flex>
        )}
      </Box>
      <Box pb="28">
      </Box>
    </Flex>
  )
}

interface NavItemProps extends FlexProps {
  icon: IconType
  children: ReactText
  linkFor: string
}
const NavItem = ({ icon, children, linkFor }: NavItemProps) => {
  return (
    <Box
      as="a"
      href={linkFor}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
				<Flex display={{ base: 'none', md: "flex" }}>
					{children}
				</Flex>
      </Flex>
    </Box>
  )
}
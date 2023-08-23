'use client'

import {
  Box,
  Flex,
  Icon,
  useColorModeValue,
  FlexProps,
  Spacer,
} from '@chakra-ui/react'
import React, { ReactText } from 'react'
import { IconType } from 'react-icons'
import { FiStar, FiBarChart2, FiHome } from 'react-icons/fi'
import { LoginButton, LogoutButton } from './button/userAuthButton'
import { useAuthContext } from '@/lib/provider/authContextProvider'

interface LinkItemProps {
  name: string
  icon: IconType
  linkFor?: string
}

export default function SimpleSidebar() {
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <Box ml={{ base: '20', md: '60' }}>{/* Content */}</Box>
      <SidebarContent />
    </Box>
  )
}

const SidebarContent = () => {
  const user = useAuthContext()

  const LinkItems: Array<LinkItemProps> = [
    {
      name: 'Home',
      icon: FiHome,
      linkFor: `/${user.user?.uid}/home`,
    },
    {
      name: 'Favourites',
      icon: FiStar,
      linkFor: `/${user.user?.uid}/favorites`,
    },
    {
      name: 'Statistics [β]',
      icon: FiBarChart2,
      linkFor: `/${user.user?.uid}/statistics`,
    },
  ]

  return (
    <Flex
      direction={'column'}
      pt={'4'}
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: '20', md: '60' }}
      pos="fixed"
      h="full"
    >
      {user.user &&
        LinkItems.map((link) => (
          <NavItem
            key={link.name}
            icon={link.icon}
            linkFor={link.linkFor as string}
          >
            {link.name}
          </NavItem>
        ))}
      <Spacer />
      <Box>
        {user.user && (
          <Flex justify={'center'}>
            <LogoutButton />
          </Flex>
        )}
        {!user.user && (
          <Flex justify={'center'}>
            <LoginButton />
          </Flex>
        )}
      </Box>
      <Box pb="28"></Box>
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
      _focus={{ boxShadow: 'none' }}
    >
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
        <Flex display={{ base: 'none', md: 'flex' }}>{children}</Flex>
      </Flex>
    </Box>
  )
}

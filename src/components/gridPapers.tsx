'use client'

import {
  Box,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Stack,
  StackDivider,
  Text,
  SimpleGrid,
  IconButton,
  Spacer,
} from '@chakra-ui/react'
import { User } from 'firebase/auth'
import Link from 'next/link'
import React from 'react'
import { FiStar } from 'react-icons/fi'
import { paperData } from '@/app/utils/type'
import styles from '@/styles/animation.module.css'

export default function GridPapers(params: {
  user: User | null
  papers: paperData[]
  onClickLikeButton: Function
}) {
  const myCallback = (run: any) => {
    return run()
  }

  function colorCitationCount(count: string | null) {
    if (count) {
      if (Number(count) > 10000) {
        return styles.gold
      } else if (Number(count) > 5000) {
        return styles.silver
      } else if (Number(count) > 1000) {
        return styles.bronze
      }
    }
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={4}>
      {myCallback(() => {
        const list = []
        for (const paper of params.papers) {
          list.push(
            <Box key={paper.paperId}>
              <Card className={colorCitationCount(paper.citationCount)}>
                <Link href={`/reference/${paper.paperId}`}>
                  <CardHeader
                    _hover={{
                      color: 'blue.400',
                      fontSize: 'xl',
                      cursor: 'pointer',
                    }}
                  >
                    <Heading size="md">{paper.title}</Heading>
                  </CardHeader>
                </Link>
                <CardBody>
                  <Stack divider={<StackDivider />} spacing="4">
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        TLDR
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        {paper.tldr}
                      </Text>
                    </Box>
                    <Stack direction={'row'} spacing="4">
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          Citations
                        </Heading>
                        <Text pt="2" fontSize="sm">
                          {paper.citationCount}
                        </Text>
                      </Box>
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          Year
                        </Heading>
                        <Text pt="2" fontSize="sm">
                          {paper.year}
                        </Text>
                      </Box>
                      <Spacer />
                      {params.user && (
                        <Box>
                          <IconButton
                            aria-label="like"
                            icon={<FiStar />}
                            onClick={() => params.onClickLikeButton(paper)}
                            bg={'white'}
                            color={paper.isLike ? 'red' : 'black'}
                          />
                        </Box>
                      )}
                    </Stack>
                  </Stack>
                </CardBody>
              </Card>
            </Box>,
          )
        }

        return list
      })}
    </SimpleGrid>
  )
}

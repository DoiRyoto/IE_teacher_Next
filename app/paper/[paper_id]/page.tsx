"use client"

import React, { useState, useEffect } from "react";
import { Box, Flex, Card, CardHeader, Heading, CardBody, Stack, StackDivider, Text, SimpleGrid } from "@chakra-ui/react";
import WithSubnavigation from "@/app/components/navbar_index";
import Link from "next/link";

type data = {
    paperId: string | null,
    title: string | null,
    year: string | null,
    citationCount: string | null,
    tldr: string | null
}

export default function Home({ params: { paper_id }} : { params: { paper_id: string }}) {
    const [papers, setPapers] = useState<data[]>([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`/api/paper/${paper_id}`)
            const data = await response.json()
            setPapers(data.data.reference_papers)
        }
        fetchData()
    }, [])

    const myCallback = (run: any) => {
        return run();
      };

    return (
        <Box>
            <Flex direction={"column"} height="100%">
                <WithSubnavigation />
                <Box p={4}>
                    <SimpleGrid columns={2} spacing={4}>
                    {myCallback(() => {
                        const list = [];
                        for (const paper of papers) {
                            list.push(
                            <Link key={paper.paperId} href={`/paper/${paper.paperId}`}>
                                <Box>
                                    <Card _hover={{color: "blue.400", fontSize: "xl", cursor: "pointer" }}>
                                        <CardHeader>
                                            <Heading size='md'>{ paper.title }</Heading>
                                        </CardHeader>
                                        <CardBody>
                                            <Stack divider={<StackDivider />} spacing='4'>
                                                <Box>
                                                    <Heading size='xs' textTransform='uppercase'>
                                                    TLDR
                                                    </Heading>
                                                    <Text pt='2' fontSize='sm'>
                                                    { paper.tldr }
                                                    </Text>
                                                </Box>
                                                <Stack direction={"row"} spacing='4'>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                        Citations
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                        { paper.citationCount }
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                        Year
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                        { paper.year }
                                                        </Text>
                                                    </Box>
                                                </Stack>
                                            </Stack>
                                        </CardBody>
                                    </Card>
                                </Box>
                            </Link>
                            )
                        }

                        return list
                    })}
                    </SimpleGrid>
                </Box>
            </Flex>
        </Box>
    )
}
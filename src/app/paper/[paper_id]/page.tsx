"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
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
} from "@chakra-ui/react";
import {
  FiStar,
} from 'react-icons/fi'
import HeaderPapers from "@/components/header_papers";
import Link from "next/link";
import SidebarWithHeader from "@/components/sidebar";
import { useAuthContext } from "@/libs/provider/authContextProvider";
import { addDoc, collection, doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/libs/firebase/store";


type data = {
  paperId: string | null;
  title: string | null;
  year: string | null;
  citationCount: string | null;
  tldr: string | null;
};

export default function Home({
  params: { paper_id },
}: {
  params: { paper_id: string };
}) {
  const [papers, setPapers] = useState<data[]>([]);
  const [uid, setUid] = useState<string>("");
  const user = useAuthContext()

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/paper/${paper_id}`);
      const data = await response.json();
      setPapers(data.data.reference_papers);
    }

    async function getLike() {
        
    }

    fetchData();
  }, []);

  const pushLikeButton = async (paper: data) => {
      if(user.user){
        setUid(user.user.uid)
      } else {
        return
      }

      await updateDoc(doc(db, "users", uid), {likes: arrayUnion(paper)})
    }

  const myCallback = (run: any) => {
    return run();
  };

  return (
    <Box>
      <Stack direction={"column"} height="100%">
        <HeaderPapers />
        <Stack direction={"row"}>
          <Box mt={"20"}>
            <SidebarWithHeader />
          </Box>
          <Box p={4} mt={"20"}>
            <SimpleGrid columns={2} spacing={4}>
              {myCallback(() => {
                const list = [];
                for (const paper of papers) {
                  list.push(
                      <Box>
                        <Card>
                          <Link key={paper.paperId} href={`/paper/${paper.paperId}`}>
                            <CardHeader _hover={{
                            color: "blue.400",
                            fontSize: "xl",
                            cursor: "pointer",
                            }}>
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
                              <Stack direction={"row"} spacing="4">
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
                                {user.user && (
                                  <Box>
                                    <IconButton aria-label='like' icon={<FiStar />} onClick={() => pushLikeButton(paper)} bg={"white"}/>
                                  </Box>
                                )
                                }
                              </Stack>
                            </Stack>
                          </CardBody>
                        </Card>
                      </Box>
                  );
                }

                return list;
              })}
            </SimpleGrid>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}

"use client";

import { Box, calc } from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/libs/firebase/store";
import { paperData } from "@/app/utils/type";
import { Wordcloud } from "@visx/wordcloud";
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import MyWordcloud from "./wordcloud";

const colors = ['#143059', '#2F6B9A', '#82a6c2'];

export interface WordData {
  text: string;
  value: number;
}

function wordFreq(text: string): WordData[] {
  const words: string[] = text.replace(/\./g, '').split(/\s/);
  const freqMap: Record<string, number> = {};

  for (const w of words) {
    if (!freqMap[w]) freqMap[w] = 0;
    freqMap[w] += 1;
  }
  return Object.keys(freqMap).map((word) => ({ text: word, value: freqMap[word] }));
}

export default async function Home({
    params: { user_id },
  }: {
    params: { user_id: string };
  }) {

    return (
			<Box width={1000} height={1000}>
				<ParentSize>{({ width, height }) => <MyWordcloud width={width} height={height} user_id={user_id} />}</ParentSize>
			</Box>
    )
}
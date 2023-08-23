'use client'

import { Box } from '@chakra-ui/react'
import { scaleLinear } from '@visx/scale'
import { Text } from '@visx/text'
import Wordcloud from '@visx/wordcloud/lib/Wordcloud'
import React from 'react'
import { useRouter } from 'next/navigation';

interface ExampleProps {
  width: number
  height: number
  showControls?: boolean
  text: string
}

export interface WordData {
  text: string
  value: number
}

const colors = ['#143059', '#2F6B9A', '#82a6c2']

// 改善案: https://towardsdatascience.com/generate-meaningful-word-clouds-in-python-5b85f5668eeb
export default function MyWordCloud({ width, height, text }: ExampleProps) {
  function wordFreq(text: string): WordData[] {
    const words: string[] = text.replace(/\./g, '').split(/\s/)
    const freqMap: Record<string, number> = {}

    for (const w of words) {
      if (!freqMap[w]) freqMap[w] = 0
      freqMap[w] += 1
    }
    return Object.keys(freqMap).map((word) => ({
      text: word,
      value: freqMap[word],
    }))
  }

  function getRotationDegree() {
    const rand = Math.random()
    const degree = rand > 0.5 ? 60 : -60
    return rand * degree
  }

  const words = wordFreq(text)

  const fontScale = scaleLinear({
    domain: [
      Math.min(...words.map((w) => w.value)),
      Math.max(...words.map((w) => w.value)),
    ],
    range: [0, width],
  })
  const fontSizeSetter = (datum: WordData) => fontScale(datum.value)

  const fixedValueGenerator = () => 0.5

  const spiralType = 'rectangular'
  const withRotation = false

  const router = useRouter();

  function onClickWordElement (word: string) { 
    router.push(`/search/${word}`)
  }

  return (
    <Box>
      <Wordcloud
        words={words}
        width={width}
        height={height}
        fontSize={fontSizeSetter}
        font={'Impact'}
        padding={2}
        spiral={spiralType}
        rotate={withRotation ? getRotationDegree : 0}
        random={fixedValueGenerator}
      >
        {(cloudWords) =>
          cloudWords.map((w, i) => (
            <Text
              className='word_element'
              key={w.text}
              fill={colors[i % colors.length]}
              textAnchor={'middle'}
              transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
              fontSize={w.size}
              fontFamily={w.font}
              cursor="pointer"
              onClick={() => onClickWordElement(w.text as string)}
            >
              {w.text}
            </Text>
          ))
        }
      </Wordcloud>
      <style>{`
        .wordcloud {
          display: flex;
          flex-direction: column;
          user-select: none;
        }
        .wordcloud svg {
          margin: 1rem 0;
          cursor: pointer;
        }

        .wordcloud label {
          display: inline-flex;
          align-items: center;
          font-size: 14px;
          margin-right: 8px;
        }
        .wordcloud textarea {
          min-height: 100px;
        }
      `}</style>
    </Box>
  )
}

import { Text } from '@visx/text';
import { scaleLog } from '@visx/scale';
import Wordcloud from '@visx/wordcloud/lib/Wordcloud';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/libs/firebase/store';
import { paperData } from '@/app/utils/type';

export interface WordData {
  text: string;
  value: number;
}

interface WordCloudProps {
  width: number;
  height: number;
  user_id: string
}

const colors = ['#143059', '#2F6B9A', '#82a6c2'];

function wordFreq(text: string): WordData[] {
  const words: string[] = text.replace(/\./g, '').split(/\s/);
  const freqMap: Record<string, number> = {};

  for (const w of words) {
    if (!freqMap[w]) freqMap[w] = 0;
    freqMap[w] += 1;
  }
  return Object.keys(freqMap).map((word) => ({ text: word, value: freqMap[word] }));
}

export default async function MyWordcloud({ width, height, user_id }: WordCloudProps) {
	const docRef = doc(db, "users", user_id)
    const docSnap = await getDoc(docRef)
		let abst_string: string = ""
		if (docSnap.exists()) {
			abst_string = (docSnap.data().likes as paperData[]).map((obj) => obj.tldr).join(" ")
		}

	const words = wordFreq(abst_string);
		
	const fontScale = scaleLog({
		domain: [Math.min(...words.map((w) => w.value)), Math.max(...words.map((w) => w.value))],
		range: [10, 100],
	});
	const fontSizeSetter = (datum: WordData) => fontScale(datum.value);

	const fixedValueGenerator = () => 0.5;

  return (
    <div className="wordcloud">
      <Wordcloud
        words={words}
        width={width}
        height={height}
        fontSize={fontSizeSetter}
        font={'Impact'}
        padding={2}
        random={fixedValueGenerator}
      >
        {(cloudWords) =>
          cloudWords.map((w, i) => (
            <Text
              key={w.text}
              fill={colors[i % colors.length]}
              textAnchor={'middle'}
              transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
              fontSize={w.size}
              fontFamily={w.font}
            >
              {w.text}
            </Text>
          ))
        }
      </Wordcloud>
      <style jsx>{`
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
    </div>
  );
}
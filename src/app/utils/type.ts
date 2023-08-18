export type paperData = {
  paperId: string
  title: string | null;
  year: string | null;
  citationCount: string | null;
  tldr: string | null;
  isLike?: boolean
}

export type userData = {
  likes: paperData[]
}
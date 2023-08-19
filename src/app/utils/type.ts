export type paperData = {
  paperId: string
  title: string | null;
  year: string | null;
  citationCount: string | null;
  tldr: string | null;
  authors: string | null;
  abstract: string | null;
  url: string | null;
  journal: string | null;
  venue: string | null;
  fieldsOfStudy: string | null;
  isLike?: boolean
}

export type userData = {
  likes: paperData[]
}
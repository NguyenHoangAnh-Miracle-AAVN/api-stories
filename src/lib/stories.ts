import prismaClient from "./prisma-client";

export async function getStories() {
  const stories = await prismaClient.story.findMany();
  return stories;
}

export async function getStoryById(id: number) {
  const story = await prismaClient.story.findUnique({
    where: {
      id: id,
    },
  });
  return story;
}

// get a chapters by story id and chapter number
export async function getChapterByStoryIdAndChapterId(
  storyId: number,
  chapterNumber: number
) {
  const chapter = await prismaClient.chapter.findFirst({
    where: {
      storyId: storyId,
      chapterNumber: chapterNumber,
    },
  });
  return chapter;
}

// get all chatper titles by story id
export async function getChapterTitlesByStoryId(storyId: number) {
  const chapters = await prismaClient.chapter.findMany({
    where: {
      storyId: storyId,
    },
    select: {
      title: true,
    },
  });
  return chapters;
}

import { PrismaClient } from "@prisma/client";
import { crawlsStory, ChapterData } from "./lib/crawls-stories";

const prisma = new PrismaClient();

async function main() {
  for (let i = 693; i < 2016; i++) {
    await insertChapter(i);
    runDelay();
    
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

async function insertStory() {
  try {
    const newStory = await prisma.story.create({
      data: {
        title: "The gioi hoan my",
        author: "Than Dong",
        genre: "Tien Hiep",
      },
    });
    console.log("New story created:", newStory);
  } catch (error) {
    console.error("Error inserting story: ", error);
  } finally {
    await prisma.$disconnect();
  }
}

async function insertChapter(chapterNumber: number) {
  try {
    const chapter = await crawlsStory(chapterNumber);
    const chapterTitle = chapter?.title || "undefined";
    const content = chapter?.content || "undefined";
    const newChapter = await prisma.chapter.create({
      data: {
        storyId: 1,
        chapterNumber: chapterNumber,
        title: chapterTitle,
        content: content,
      },
    });
    console.log("New story created:", newChapter);
  } catch (error) {
    console.error("Error insert new chapter", error);
  } finally {
    await prisma.$disconnect();
  }
}


async function delay(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function runDelay() {
    // await delay(1000); // Wait for 1 second
    console.log('This printed after about 1 second');
}


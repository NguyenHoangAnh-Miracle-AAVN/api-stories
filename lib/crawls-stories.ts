import * as cheerio from "cheerio";
import { connect } from "http2";

export async function crawlsStory(chapterNumber: number): Promise<ChapterData | undefined> {
  let chapterResult: ChapterData | undefined;
  await fetchContent(
    `https://truyenfull.vn/the-gioi-hoan-my/chuong-${chapterNumber}`
  ) //2015 chapters
    .then((result) => {
      console.log(result);
      chapterResult = result;
    });
  return chapterResult;
}

// export async function crawlsStoryTitle(chapterNumber: number): Promise<ChapterData | undefined> {
//   let storyTitle: string | null | undefined = "";
//   fetchContent(
//     `https://truyenfull.vn/the-gioi-hoan-my/chuong-${chapterNumber}`
//   ).then((result) => {
//     storyTitle = result;
//     console.log("Story title :" + storyTitle);
//   });
//   return storyTitle;
// }
export interface ChapterData {
  title: string;
  content: string;
}

async function fetchContent(url: string): Promise<ChapterData | undefined> {
  let storyContent: string = "";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching data. Status ${response.status}`);
    }
    const htmlContent = await response.text();
    const $ = cheerio.load(htmlContent);
    console.log("content: " + $("div#chapter-c").text());
    let paragraphs = $("div#chapter-c > p") ;
    const chapterTitle = $("a.chapter-title").text();
    if (!paragraphs || paragraphs.length === 0){
      paragraphs = $("div#chapter-c br");
      paragraphs.each((index, element) => {
        const nextSibling = element.nextSibling;
        if (nextSibling && nextSibling.type === 'text') {
          storyContent += "<p>" + $(nextSibling).text() + "</p>";
          console.log($(element).text());
        };
      }
    );
    console.log("Paragraphs not: " + paragraphs.text());
  } else{
      console.log("Paragraphs yes: " + paragraphs.length);
      paragraphs.each((index, element) => {
        storyContent += "<p>" + $(element).text() + "</p>";
        console.log($(element).text());
      });
    }
    return { title: chapterTitle, content: storyContent };
  } catch (error) {
    console.error(`An error occurred:`, error);
  }
}

// async function fetchChapterTitle(
//     url: string
//   ): Promise<string | null | undefined> {
//     try {
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error(`Error fetching data. Status ${response.status}`);
//       }

//       const htmlContent = await response.text();
//       const $ = cheerio.load(htmlContent);
//       const chapterTitle = $("a.chapter-title").text();
//       return chapterTitle;
//     } catch (error) {
//       console.error(`An error occurred:`, error);
//     }
//   }

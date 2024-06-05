import { PrismaClient } from '@prisma/client';
import express from 'express';
import { storiesRoute } from './routes/stories';
import { crawlsStory, ChapterData } from "./lib/crawls-stories";



const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON request
app.use(express.json());

app.use('/stories', storiesRoute)
// Define a simple routte
app.get('/', (request, response) => {
    response.send('Hello, API World! 123');
})


// Start the server
app.listen(port, () => {
    console.log(`Server run at http://localhost:${port}`);
})



const prisma = new PrismaClient();

async function main() {
    // await insertStory();
    // const allStories = await prisma.story.findMany();
    // console.log(allStories);
    const story = await crawlsStory(1);
    console.log(story?.title);
}

main()
.then(async () => {
    await prisma.$disconnect();
})
.catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
})

async function insertStory() {
    try {
        const newStory = await prisma.story.create( {
            data: {
                title:'The gioi hoan my',
                author: 'Than Dong',
                genre: 'Tien Hiep',
            }
        });
        console.log('New story created:', newStory);
    }catch (error){
        console.error('Error inserting story: ', error);
    } finally {
        await prisma.$disconnect();
    }
}
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await deleteStories(359);
}

async function deleteStories(chapterNumber: number) {
    await prisma.chapter.deleteMany({
        where: {
            chapterNumber: {
                gt: chapterNumber
            }
        }
    });
}

main().then(async () => {
    console.log("Delete success");
}).catch(async (e) => {
    console.error(e);
    process.exit(1);
}).finally(() => {
    prisma.$disconnect();
});



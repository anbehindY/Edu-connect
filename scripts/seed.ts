const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
      data: [
        {name: 'Computer Science'},
        {name: 'Mathematics'},
        {name: 'Physics'},
        {name: 'Chemistry'},
        {name: 'Biology'},
        {name: 'Fitness'},
        {name: 'Music'},
      ]
    });
    console.log('Categories seeded successfully');
  } catch (error) {
    console.log("Error seeding the categories",error);    
  } finally {
    await db.$disconnect();
  }
};

main();

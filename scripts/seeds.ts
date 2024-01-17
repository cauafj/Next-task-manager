const { PrismaClient } = require("@prisma/client");
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

const main = async () => {
    const hashedPassword = await bcrypt.hash('senha', 10)

    await prisma.task.create({
        data: {
            name: 'Organize home',
            description: 'Just oganize it',
            datetime: new Date(),
            status: 'notStarted',
            user : {create: {
                username: 'jorge',
                password: hashedPassword
            }}
        }
    })


    const allTasks = await prisma.task.findMany({
        include: {user: true}
    })

    const allUsers = await prisma.user.findMany({
        include: {tasks: true}
    })

    console.dir(allTasks)
    console.dir(allUsers)

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async err => {
        console.error(err)
        await prisma.$disconnect()
        process.exit(1)
    })
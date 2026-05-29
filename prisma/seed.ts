import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

const dbPath = path.resolve(process.cwd(), "dev.db");
const adapter = new PrismaBetterSqlite3({ url: dbPath });
const prisma = new PrismaClient({ adapter });

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "katya@example.com" },
    update: {},
    create: { name: "Катя", email: "katya@example.com" },
  });

  const wishlist = await prisma.wishlist.upsert({
    where: { shareToken: "demo-token-katya-birthday" },
    update: {},
    create: {
      title: "День рождения 🎂",
      description: "Мне 25, буду рада любому подарку!",
      shareToken: "demo-token-katya-birthday",
      userId: user.id,
    },
  });

  await prisma.wishlistItem.deleteMany({ where: { wishlistId: wishlist.id } });

  await prisma.wishlistItem.createMany({
    data: [
      {
        wishlistId: wishlist.id,
        title: "AirPods Pro 2",
        description: "Белые, с MagSafe-кейсом",
        url: "https://www.apple.com/airpods-pro/",
        price: 24990,
        isReserved: false,
      },
      {
        wishlistId: wishlist.id,
        title: "Книга «Мастер и Маргарита»",
        description: "Издание МИФ, твёрдая обложка",
        price: 890,
        isReserved: true,
      },
      {
        wishlistId: wishlist.id,
        title: "Сертификат в Zara",
        description: "На любую сумму от 3000 ₽",
        price: 3000,
        isReserved: false,
      },
      {
        wishlistId: wishlist.id,
        title: "Духи Maison Margiela Replica — Jazz Club",
        url: "https://www.maisonmargiela.com",
        price: 12500,
        isReserved: false,
      },
      {
        wishlistId: wishlist.id,
        title: "Настольная игра «Диxit»",
        description: "Базовый набор",
        price: 2200,
        isReserved: false,
      },
    ],
  });

  console.log(`Seed OK — wishlist: /wishlist/${wishlist.shareToken}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

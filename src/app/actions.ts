"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createWishlist(_prevState: unknown, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  if (!name?.trim() || !email?.trim() || !title?.trim()) return;

  const user = await prisma.user.upsert({
    where: { email: email.trim() },
    update: { name: name.trim() },
    create: { name: name.trim(), email: email.trim() },
  });

  const wishlist = await prisma.wishlist.create({
    data: {
      title: title.trim(),
      description: description?.trim() || null,
      userId: user.id,
    },
  });

  redirect(`/wishlist/${wishlist.shareToken}`);
}

export async function reserveItem(itemId: string, wishlistToken: string) {
  const item = await prisma.wishlistItem.findUnique({ where: { id: itemId } });
  if (!item) return;

  await prisma.wishlistItem.update({
    where: { id: itemId },
    data: { isReserved: !item.isReserved },
  });

  revalidatePath(`/wishlist/${wishlistToken}`);
}

export async function addWishlistItem(_prevState: unknown, formData: FormData) {
  const wishlistId = formData.get("wishlistId") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const url = formData.get("url") as string;
  const priceRaw = formData.get("price") as string;

  if (!wishlistId || !title?.trim()) return { error: "Название обязательно" };

  const price = priceRaw ? parseFloat(priceRaw.replace(",", ".")) : null;

  await prisma.wishlistItem.create({
    data: {
      wishlistId,
      title: title.trim(),
      description: description?.trim() || null,
      url: url?.trim() || null,
      price: price && !isNaN(price) ? price : null,
    },
  });

  const wishlist = await prisma.wishlist.findUnique({
    where: { id: wishlistId },
    select: { shareToken: true },
  });

  redirect(`/wishlist/${wishlist!.shareToken}`);
}

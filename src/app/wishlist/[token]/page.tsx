import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import CopyButton from "@/components/CopyButton";
import AddItemForm from "@/components/AddItemForm";
import ReserveButton from "@/components/ReserveButton";

export default async function WishlistPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  const wishlist = await prisma.wishlist.findUnique({
    where: { shareToken: token },
    include: { user: true, items: true },
  });

  if (!wishlist) notFound();

  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/wishlist/${token}`;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-xl mx-auto">
        <div className="mb-8">
          <p className="text-sm text-gray-400 mb-1">{wishlist.user.name}</p>
          <h1 className="text-3xl font-bold text-gray-900">{wishlist.title}</h1>
          {wishlist.description && (
            <p className="mt-2 text-gray-500">{wishlist.description}</p>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <p className="text-sm text-gray-500 mb-2">Ссылка для друзей:</p>
          <div className="flex items-center gap-2">
            <code className="flex-1 bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-700 break-all">
              {shareUrl}
            </code>
            <CopyButton text={shareUrl} />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          {wishlist.items.length === 0 ? (
            <p className="text-center text-gray-400 py-8">
              Здесь пока пусто. Добавьте первое желание!
            </p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {wishlist.items.map((item) => (
                <li key={item.id} className="py-3 flex items-start gap-3">
                  <div className="flex-1">
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-gray-900 hover:text-indigo-600 transition-colors"
                      >
                        {item.title}
                      </a>
                    ) : (
                      <p className="font-medium text-gray-900">{item.title}</p>
                    )}
                    {item.description && (
                      <p className="text-sm text-gray-500 mt-0.5">{item.description}</p>
                    )}
                    {item.price && (
                      <p className="text-sm text-indigo-600 mt-0.5">
                        {item.price.toLocaleString("ru-RU")} ₽
                      </p>
                    )}
                  </div>
                  <ReserveButton
                    itemId={item.id}
                    wishlistToken={token}
                    isReserved={item.isReserved}
                  />
                </li>
              ))}
            </ul>
          )}
          <AddItemForm wishlistId={wishlist.id} />
        </div>
      </div>
    </main>
  );
}


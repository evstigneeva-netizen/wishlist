"use client";

import { useTransition } from "react";
import { reserveItem } from "@/app/actions";

export default function ReserveButton({
  itemId,
  wishlistToken,
  isReserved,
}: {
  itemId: string;
  wishlistToken: string;
  isReserved: boolean;
}) {
  const [pending, startTransition] = useTransition();

  if (isReserved) {
    return (
      <button
        onClick={() => startTransition(() => reserveItem(itemId, wishlistToken))}
        disabled={pending}
        className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full shrink-0 hover:bg-red-100 hover:text-red-600 transition-colors disabled:opacity-50"
        title="Снять бронь"
      >
        {pending ? "..." : "забронировано"}
      </button>
    );
  }

  return (
    <button
      onClick={() => startTransition(() => reserveItem(itemId, wishlistToken))}
      disabled={pending}
      className="text-xs border border-gray-200 text-gray-400 px-2 py-0.5 rounded-full shrink-0 hover:border-green-400 hover:text-green-600 transition-colors disabled:opacity-50"
    >
      {pending ? "..." : "забронировать"}
    </button>
  );
}

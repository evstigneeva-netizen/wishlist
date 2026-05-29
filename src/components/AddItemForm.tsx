"use client";

import { useActionState, useState } from "react";
import { addWishlistItem } from "@/app/actions";

export default function AddItemForm({ wishlistId }: { wishlistId: string }) {
  const [open, setOpen] = useState(false);
  const [, action, pending] = useActionState(addWishlistItem, null);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full mt-4 rounded-xl border-2 border-dashed border-gray-200 py-3 text-sm text-gray-400 hover:border-indigo-300 hover:text-indigo-500 transition-colors"
      >
        + Добавить желание
      </button>
    );
  }

  return (
    <form action={action} className="mt-4 rounded-xl border border-gray-200 p-4 flex flex-col gap-3">
      <input type="hidden" name="wishlistId" value={wishlistId} />

      <input
        name="title"
        type="text"
        required
        autoFocus
        placeholder="Название *"
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
      />

      <input
        name="description"
        type="text"
        placeholder="Описание"
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
      />

      <div className="flex gap-2">
        <input
          name="url"
          type="url"
          placeholder="Ссылка"
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
        <input
          name="price"
          type="number"
          min="0"
          step="0.01"
          placeholder="Цена ₽"
          className="w-28 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
      </div>

      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
        >
          Отмена
        </button>
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors"
        >
          {pending ? "Добавляем..." : "Добавить"}
        </button>
      </div>
    </form>
  );
}

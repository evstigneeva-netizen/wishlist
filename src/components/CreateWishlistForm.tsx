"use client";

import { useActionState } from "react";
import { createWishlist } from "@/app/actions";

export default function CreateWishlistForm() {
  const [, action, pending] = useActionState(createWishlist, null);

  return (
    <form action={action} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-medium text-gray-700">
          Ваше имя
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Как вас зовут?"
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="text-sm font-medium text-gray-700">
          Название вишлиста
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          placeholder="День рождения, Новый год..."
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-sm font-medium text-gray-700">
          Описание <span className="text-gray-400 font-normal">(необязательно)</span>
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          placeholder="Расскажите немного о поводе..."
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors"
      >
        {pending ? "Создаём..." : "Создать вишлист"}
      </button>
    </form>
  );
}

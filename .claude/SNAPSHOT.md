# Snapshot — состояние проекта

**Обновлено:** 2026-05-29

## Статус
Базовая инфраструктура готова. Приложение запускается на localhost:3000.

## Сделано
- Next.js 15 + TypeScript + Tailwind CSS инициализирован
- Prisma 7 + SQLite настроен, первая миграция применена
- Схема БД: User, Wishlist, WishlistItem
- src/lib/prisma.ts — singleton клиент с PrismaBetterSqlite3 адаптером
- .claude/ структура: settings.json, rules, skills, hooks, launch.json
- Главная страница `/` — форма создания вишлиста (имя, email, название, описание)
- Страница `/wishlist/[token]` — список желаний с публичной ссылкой
- Форма добавления желания (название, описание, ссылка, цена) — инлайн на странице вишлиста
- Кнопка бронирования на каждом желании (toggle, revalidatePath)
- Seed-скрипт: `npm run seed` → демо-вишлист по адресу `/wishlist/demo-token-katya-birthday`
- Server Actions: createWishlist, addWishlistItem, reserveItem

## В процессе
—

## Следующие шаги
- Авторизация (отделить владельца от друзей)
- Удаление желаний
- Мобильная адаптация

## Известные проблемы
- wishlist-tmp/ в /Users/naumova/vibecoding/ не удалён (нет прав) — удалить вручную: `rm -rf /Users/naumova/vibecoding/wishlist-tmp`

## Решения
- Prisma 7: URL не в schema.prisma, а в prisma.config.ts; клиент создаётся через адаптер PrismaBetterSqlite3
- Symlink .bin/next был сломан после cp — пересоздан вручную

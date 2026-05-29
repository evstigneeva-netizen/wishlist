#!/bin/bash
# Запускается при завершении сессии Claude Code
# Напоминает проверить незакоммиченные изменения

cd /Users/naumova/vibecoding/wishlist

if git rev-parse --git-dir > /dev/null 2>&1; then
  CHANGES=$(git status --porcelain 2>/dev/null | wc -l | tr -d ' ')
  if [ "$CHANGES" -gt "0" ]; then
    echo "⚠️  Есть $CHANGES незакоммиченных изменений. Не забудь закоммитить!"
  fi
fi

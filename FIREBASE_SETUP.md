# Настройка Firebase Rules

## Проблема: Missing or insufficient permissions

Если вы получаете ошибку "Missing or insufficient permissions", нужно обновить правила безопасности в Firebase Console.

## Шаги для применения правил:

1. Откройте [Firebase Console](https://console.firebase.google.com/)
2. Выберите проект **sector-a1f60**
3. Перейдите в **Firestore Database** → вкладка **"Rules"**
4. Скопируйте содержимое файла `firestore.rules` и вставьте в редактор правил
5. Нажмите **"Publish"** для сохранения правил

## Правила безопасности:

Правила разрешают:
- ✅ **Создание** документов в коллекции `feedback` (для всех пользователей)
- ✅ **Чтение** документов из коллекции `feedback` (для всех пользователей)
- ❌ **Обновление** и **удаление** запрещены

Валидация при создании:
- `telegramNick` должен быть строкой (1-100 символов)
- `message` должен быть строкой (1-5000 символов)

## Альтернативный вариант (если проблемы продолжаются):

Если упрощенные правила не работают, можно временно использовать более открытые правила для тестирования:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /feedback/{feedbackId} {
      allow read, write: if true;
    }
    
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

**ВНИМАНИЕ:** Эти правила открывают полный доступ к коллекции feedback. Используйте только для тестирования, затем вернитесь к более строгим правилам.

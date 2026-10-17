# План реализации — чат MAX через GREEN-API

Тестовое задание: UI для отправки/получения текстовых сообщений в MAX через GREEN-API
(https://green-api.com/max), прототип интерфейса — https://web.max.ru/.

## Стек

- Vite + React 19 + TypeScript
- antd — UI-кит
- axios — HTTP-клиент
- zustand (+ `persist`) — состояние авторизации с сохранением в localStorage
- Архитектура: Feature-Sliced Design (`app → pages → features → entities → shared`)

## Структура проекта (FSD)

```
src/
├── app/            # композиция приложения, роутинг по состоянию авторизации
├── pages/
│   └── login/      # страница логина
├── features/
│   └── auth/       # вход по idInstance/apiTokenInstance (model: zustand-store, ui: форма)
├── entities/
│   ├── instance/    # getSettings — проверка instance
│   └── message/     # sendMessage — отправка сообщения
└── shared/
    └── api/         # instanceUrl(), общий тип GreenApiCredentials
```

Правила: импорты только вниз по слоям, каждый слайс отдаёт публичный API через `index.ts`,
сущности не зависят друг от друга напрямую.

## Этапы

### ✅ Этап 1 — Авторизация
- [x] Инициализация проекта (Vite + React + TS + antd)
- [x] FSD-структура
- [x] `entities/instance`: `getSettings` для валидации credentials
- [x] `features/auth`: форма логина (idInstance/apiTokenInstance), zustand-store с `persist`
- [x] Экран логина с обработкой ошибок (неверные данные / нет соединения)
- [x] `entities/message`: обёртка `sendMessage` (API-клиент готов, UI пока не подключён)

### ✅ Этап 2 — Экран чата (верстка)
- [x] `pages/chat`: разметка по мотивам web.max.ru — сайдбар + окно чата
- [x] `features/chat-list`: список локальных чатов (создаются по номеру телефона, без бэкенда)
- [x] `features/new-chat`: ввод номера телефона получателя, создание чата, валидация формата номера
- [x] `entities/chat`: модель чата (id, номер, список сообщений) + стор (zustand)
- [x] Переключение `App.tsx` с заглушки на реальный `pages/chat`

### ✅ Этап 3 — Отправка сообщений
- [x] `features/send-message`: поле ввода + кнопка, вызов `entities/message/sendMessage`
- [x] Добавление отправленного сообщения в стор чата (статус: pending/sent/error)
- [x] Обработка ошибок отправки (невалидный номер, сбой сети)

### ⬜ Этап 4 — Получение сообщений
- [ ] `entities/message`: `receiveNotification` / `deleteNotification` (HTTP API технология)
- [ ] `features/receive-messages`: фоновый polling-цикл (long polling, retry с backoff, остановка при размонтировании)
- [ ] Роутинг входящих уведомлений по `chatId` в нужный чат стора
- [ ] Автосоздание чата, если входящее сообщение пришло от ещё не известного номера
- [ ] Обязательное подтверждение (`deleteNotification`) после обработки уведомления

### ⬜ Этап 5 — Полировка
- [ ] Финальная верстка под web.max.ru (пузырьки сообщений, скролл, пустые состояния)
- [ ] Ручное E2E-тестирование с реальным получателем в MAX
- [ ] Обработка edge-кейсов (разрыв соединения, невалидные данные)
- [ ] Обновление `README.md` (как запустить, что требуется для теста)

## Открытые вопросы / риски

- Формат `chatId` для MAX: по официальному примеру `SendMessage` для MAX `chatId` — обычная строка
  цифр без суффикса (в отличие от WhatsApp `@c.us`), что совпадает с текущим `Chat.id`
  (нормализованный номер). Требует проверки на реальном инстансе при E2E-тестировании (этап 5).
- CORS к `api.green-api.com` из браузера — должен работать "из коробки" (GREEN-API поддерживает
  прямые browser-запросы), перепроверить при первом реальном вызове `sendMessage` на реальном
  инстансе (этап 5).

# Сервис просмотра stackoverflow.
## Цель
Сделать клиент для поиска по stackoverflow.

## Экраны
* Авторизация. Стандартные опции авторизации - login/signup/forgot. Соответствующий гвард. Остальным функционалом могут пользоваться авторизованные юзеры.
* Экран поиска
 * Состоит из поля ввода и кнопки "искать".
 * После ввода текста и нажатия кнопки поиска, происходит загрузка результатов поиска и переход на экран результата поиска.
* Экран результата поиска
 * Состоит из таблицы с результатами поиска и панели "быстрого отображения".
   * В таблице должны отображаться: Автор вопроса, тема, количество ответов, теги.
     * При клике на:
       * автора вопроса — в панели "быстрого отображения" появляется таблица, аналогичная основной и содержащая наиболее популярные вопросы автора
       * тему и количество ответов — происходит переход на экран информации о вопросе.
       * один из тегов — в панели "быстрого отображения" появляется таблица, аналогичная основной и содержащая наиболее популярные вопросы по этому тегу
   * Панель “быстрого отображения” по умолчанию скрыта и появляется на этой же странице когда нажали на автора вопроса, или на тег.
     * При клике на тему и количество ответов происходит переход на экран информации о вопросе
* Экран информации о вопросе
 *  должен отображать список ответов на выбранный вопрос

## Технические требования
1. Для получения данных использовать вызовы к api прямо из браузера http://api.stackexchange.com/docs
2. Переходы между экранами должны оставаться в истории браузера и должны работать браузерные переходы "вперед" и "назад". Должны присутствовать кнопки навигации на страницах.
3. Поддержка ie9, firefox, chrome, safari.
4. В качестве основного фронтенд фрейморка должен использоваться angular 2+ (не использовать angular-cli ! ).

## Пожелания
1. Анимации переходов между состояниями.
2. Сортировки в таблицах.
3. Навигация по компонентам с клавиатуры.

## Технические рекомендации
Для верстки можно использовать bootstrap.
В качестве серверной части рекомендую использовать решения на базе node js или java.

## Форма поставки
Результат должен быть предоставлен в виде архива, или ссылки на репозиторий.
К результату должна быть приложен список необходимого ПО и инструкция по запуску.


## npm comands

- npm start - start project in development mode localhost:8080
- npm run build - build project. Server runs on localhost:3000

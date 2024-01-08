# Avito Project

## Project Description / Описание проекта

Implementation of an online classifieds site similar to Avito. The application allows users to

- login and register,
- update your information on your profile page,
- create advertisements,
- attach photos to advertisements,
- delete and change your advertisements,
- add comments to advertisements,
- view advertisements posted by other users,
- there is also a feature for filtering advertisements,
- the project can be viewed from any device, adaptive is implemented.

Реализация сайта онлайн-объявлений, аналогичного Авито. Приложение позволяет пользователям

- авторизовываться и регистрироваться,
- обновлять данные о себе на странице профиля,
- создавать рекламные объявления,
- прикреплять к рекламным объявлениям фотографии,
- удалять и изменять свои объявления,
- добавлять комментарии к объявлениями,
- просматривать рекламные объявления, размещенные другими пользователями,
- также есть функция фильтрации объявлений,
- проект можно просматривать с любых устройств, реализован адаптив.

---

## Stack / Стек технологий

### The following technologies were used to develop this project / Технологии, используемые при разработке проекта:

- TypeScript
- React (React Hooks)
- TailWind
- Redux Toolkit
- RTK Query
- React Form
- React Router

### Libraries / Библиотеки

- slick-carousel
- redux-persist
- react-icons
- react-loader-spinner

---

### Bundler / Сборщик: Vite

---

## How to start a project / Как запустить проект

### Local start project

To clone the repository, run the command:

```
git clone https://github.com/marinaobruch/avito-project.git
```

Before development, you must install the project package.

```
cd avito-project
npm i
```

Running a local server with a project.

```
npm run dev
```

The project will be launched at: http://localhost:3000

### Start backend

1. To run the backend, install and run Docker.
2. Download the 'avito-back' folder and through the terminal go to the folder.
3. Run the command in the terminal: docker-compose -f docker-compose-backend.yaml up -d
4. After the first execution of the command, all data will be pulled up, but may not start, in this case, run the command again: docker-compose -f docker-compose-backend.yaml up -d
5. After this, the backend and Swagger will be available at http://localhost:8090/
6. To stop the backend run: docker-compose down

---

### Локальный запуск проекта

Для клонирования репозитория выполните команду:

```
git clone https://github.com/marinaobruch/avito-project.git
```

Перед разработкой необходимо проинсталировать пакет проекта.

```
cd avito-project
npm i
```

Запуск локального сервера с проектом.

```
npm run dev
```

Проект будет запущен по адресу: http://localhost:3000

### Запуск бекенда

1. Для запуска бэкенда установите и запустите Docker.
2. Скачайте папку 'avito-back' и через терминал перейдите в папку.
3. Запустите в терминале команду:docker-compose -f docker-compose-backend.yaml up -d
4. После первого выполнения команды все образы подтянуться, но могут не запуститься, в этом случае повторно выполните команду:docker-compose -f docker-compose-backend.yaml up -d
5. После этого бэкенд и Swagger будут доступны по адресу http://localhost:8090/
6. Чтобы остановить работу бэкенда выполните:docker-compose down

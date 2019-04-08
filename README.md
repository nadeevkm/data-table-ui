# README

Отображение данных для проекта [https://github.com/nadeevkm/data-uploader](https://github.com/nadeevkm/data-uploader)

Данные отображаются с возможностью пагинации, сортировки и фильтрации по полю Name.
Все это происходит на серверной стороне, клиенту возвращается одна страница и кол-во всех записей.

Для запуска приложения подтяните зависимости и соберите его
### `npm install; npm run build`
После этого запуск осуществляется командой
### `npm start`

После этого по адресу [http://localhost:3000](http://localhost:3000) будет доступна таблица с данными.
Не забыть запустить сервер [https://github.com/nadeevkm/data-uploader](https://github.com/nadeevkm/data-uploader).
При запуске сервера на отличных от дефолтовых значениях, внести соответчсвующие изменения в serverApiUrl в DataTable.js
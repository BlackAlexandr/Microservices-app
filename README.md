Проект состоит из 4 частей:
1) CompaniesService - микросервис для работы с организациями
2) EmployeesService - микросервис для работы с сотрудниками
3) APIGateway - маршрутизатор для работы с микросервисами CompaniesService  и EmployeesService 
4) WebOrganization - основное react приложение

До первого запуска проекта необходимо изменить файл appsettings.json, прописав пути к базам данных, в проектах CompaniesService и EmployeesService, 

Например:
"ConnectionStrings": {
"DefaultConnection": ""
},

В DefaultConnection следует прописать подключение к базе данных MS SQL.

Например:
 "DefaultConnection": "Data Source=DESKTOP-T777\\TestServer;Initial Catalog=Company;Integrated Security=True;"

При первом запуске  приложения, базы данных автоматически создадутся по путям, которые будут указаны в файлах appsettings.

После, запустить  консоль диспетчера пакетов, выбрать проект по умолчанию WebOrganization и выполнить следующие команды
 
1) cd WebOrganization/ClientApp - путь куда будем устанавливать npm пакеты
2) npm install - автоматическая установка пакетов.

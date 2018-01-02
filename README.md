![alt text](https://i.imgur.com/XaAyI8w.png "Archiverse")

### Your guide into Archive Team's grab of Miiverse

View the website at [archiverse.guide](https://archiverse.guide)

## About Archiverse

Archiverse is a website to view the Miiverse archive taken by [Archive Team](https://archiveteam.org) in September and October 2017. It consists of a parsed database collection of Miiverse posts, profiles, and community pages, linking back to the Internet Archive. The goal of Archiverse is to make it easier to both view the web archives (WARCs), as well as link everything back to the original WARC files for retrieving the primary assets.

## Getting Started

The Archiverse frontend is an ASP.NET Core application, using React, Mobx, and a few other NPM libraries. I try to maintain a balance between it looking good, and also being functional across different browsers and platforms. 

You should be able to run this site on Windows, Linux, or macOS. You can either download the [.NET Core SDK](https://www.microsoft.com/net/download/windows) and [VSCode](https://code.visualstudio.com/) or [Visual Studio 2017](https://www.visualstudio.com/downloads/) if you're on Windows. If you're using VS 2017, the solution should get all of the javascript libraries from NPM and build everything for you automatically. If you're using the .NET Core SDK straight (either on Windows, Mac, or Linux), you may need to first run `npm install` in the root project directory to get it's packages first. Then, you can run `dotnet build` and `dotnet run` to start the server.

The backend is a PostgreSQL database, hosted on Azure. You can download a copy of it on the [Internet Archive](https://archive.org/details/archiverse). You should be able to deploy it to your server using `pg_restore`. However, I would not recommend using its included indexes. Most of them were used for gathering analytics about the database, and were not used on the site. So they'll take up a bunch of extra space.

## `secrets.json` and `azurekeyvault.json`

The codebase makes use of ASP.NET Core's support of [Safe Storage for app secrets](https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?tabs=visual-studio) and [Azure Key Value](https://azure.microsoft.com/en-us/services/key-vault/). This is so we don't have to commit production or development database connection strings into source control. You shouldn't have to worry about azurekeyvault.json unless you deploy the site to a public server. In that case, you can either set up a key vault, or remove that code and find your own way of inputing the connection strings.

## Contributions

Contributions are welcome! Submit a PR and I'll look at it when possible. Remember, this is a project done on my own time, so I may not be able to get to requests and issues in a timely matter.






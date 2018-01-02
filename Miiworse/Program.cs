using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Miiworse
{
    public class Program
    {
        public static void Main(string[] args)
        {
            BuildWebHost(args).Run();
        }

        static void ConfigConfiguration(WebHostBuilderContext webHostBuilderContext, IConfigurationBuilder configurationBuilder)
        {
            if (!webHostBuilderContext.HostingEnvironment.IsDevelopment())
            {
                configurationBuilder.SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("azurekeyvault.json", false, true)
                .AddEnvironmentVariables();

                var config = configurationBuilder.Build();

                configurationBuilder.AddAzureKeyVault(
                    $"https://{config["azureKeyVault:vault"]}.vault.azure.net/",
                    config["azureKeyVault:clientId"],
                    config["azureKeyVault:clientSecret"]
                );
            }
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration(ConfigConfiguration)
                .UseStartup<Startup>()
                .UseApplicationInsights()
                .Build();
    }
}

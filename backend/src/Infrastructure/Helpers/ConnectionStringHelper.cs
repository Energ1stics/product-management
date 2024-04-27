using Microsoft.Extensions.Configuration;

namespace backend.Infrastructure.Helpers;

public static class ConnectionStringHelper
{
    public static string Generate(IConfiguration configuration)
    {
        var server = configuration.GetValue<string>("Database:Server");
        var port = configuration.GetValue<int>("Database:Port");
        var name = configuration.GetValue<string>("Database:Name");
        var user = configuration.GetValue<string>("Database:User");
        var password = configuration.GetValue<string>("Database:Password");

        return $"Server={server},{port};Database={name};User Id={user};Password={password};MultipleActiveResultSets=true;Application Name=SmartShelves;TrustServerCertificate=True;";
    }
}

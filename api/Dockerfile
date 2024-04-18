FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
ENV ConnectionStrings__DefaultConnection Server=tcp:tweeter-db.database.windows.net,1433;Initial Catalog=tweeter-db;Persist Security Info=False;User ID=tweeter-admin;Password=59)p4e<\LUW654Lt;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["tweeter.csproj", "./"]
RUN dotnet restore "tweeter.csproj"
COPY . .
WORKDIR "/src/"
RUN dotnet build "tweeter.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "tweeter.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "tweeter.dll"]

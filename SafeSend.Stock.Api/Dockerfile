FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["SafeSend.Stock.Api/SafeSend.Stock.Api.csproj", "./"]
RUN dotnet restore "SafeSend.Stock.Api.csproj"
COPY SafeSend.Stock.Api/ ./
RUN dotnet publish "SafeSend.Stock.Api.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
EXPOSE 10000
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "SafeSend.Stock.Api.dll"]

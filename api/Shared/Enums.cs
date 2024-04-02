﻿namespace tweeter.Shared;

public abstract class AppSettings
{
    public const string DefaultConnection = nameof(DefaultConnection);
    public const string CorsOrigins = nameof(CorsOrigins);
}

public abstract class OrderBy
{
    public const string Ascending = "asc";
    public const string Descending = "desc";
}

public abstract class Roles
{
    public const string Basic = nameof(Basic);
    public const string Admin = nameof(Admin);
}

public abstract class GameNames
{
    public const string Magic = nameof(Magic);
    public const string Yugioh = "Yu-Gi-Oh";
    public const string Pokemon = "Pokémon";
}
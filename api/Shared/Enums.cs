namespace tweeter.Shared;

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

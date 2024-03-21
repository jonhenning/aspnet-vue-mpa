namespace CodeEndeavors.ASPNETVueMPA.Extensions;

public static class SiteExtensions
{
    //ensures unique ids on page
    public static string GetId(this HttpContext context, string key)
    {
        var id = (int)(context.Items["_nextId"] ?? 0);
        id++;
        context.Items["_nextId"] = id;
        return $"{key}-{id}";
    }    
}
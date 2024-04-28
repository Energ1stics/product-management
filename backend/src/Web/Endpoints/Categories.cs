using backend.Application.Categories;
using backend.Application.Categories.Queries;

namespace backend.Web.Endpoints;

public class Categories : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this).MapGet(GetAllCategories);
    }

    public Task<IEnumerable<CategoryDto>> GetAllCategories(ISender sender)
    {
        return sender.Send(new GetAllCategoriesQuery());
    }
}

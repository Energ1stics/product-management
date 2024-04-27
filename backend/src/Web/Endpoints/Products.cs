using backend.Application.Products.Commands.CreateProduct;
using backend.Application.Products.Commands.DeleteProduct;

namespace backend.Web.Endpoints;

public class Products : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapPost(CreateProduct)
            .MapDelete(DeleteProduct, "{id}");
    }

    public Task<int> CreateProduct(ISender sender, CreateProductCommand command)
    {
        return sender.Send(command);
    }

    public async Task<IResult> DeleteProduct(ISender sender, int id)
    {
        await sender.Send(new DeleteProductCommand(id));
        return Results.NoContent();
    }
}

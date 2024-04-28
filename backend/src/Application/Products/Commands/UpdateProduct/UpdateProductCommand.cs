namespace backend.Application.Products.Commands.UpdateProduct;

public record UpdateProductCommand : IRequest
{
    public int Id { get; init; }

    public string? Name { get; init; }

    public long? Price { get; init; }

    public string? Description { get; init; }
}

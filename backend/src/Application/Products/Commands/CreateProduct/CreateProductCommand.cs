namespace backend.Application.Products.Commands.CreateProduct;

public record CreateProductCommand : IRequest<int>
{
    public string? Name { get; init; }

    public long? Price { get; init; }

    public string? Description { get; init; }
}

namespace backend.Application.Products.Queries.GetProduct;

public record GetProductQuery(int Id) : IRequest<ProductDto>;

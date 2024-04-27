namespace backend.Application.Products.Queries.GetProducts;

public record GetProductsQuery : IRequest<IEnumerable<ProductDto>>;

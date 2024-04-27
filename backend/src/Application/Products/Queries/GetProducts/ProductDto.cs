using backend.Domain.Entities;

namespace backend.Application.Products.Queries.GetProducts;

public class ProductDto
{
    public int Id { get; init; }

    public string? Name { get; init; }

    public string? Description { get; init; }

    public long Price { get; init; }

    private class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<Product, ProductDto>();
        }
    }
}

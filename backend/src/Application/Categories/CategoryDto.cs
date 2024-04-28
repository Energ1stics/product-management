using backend.Domain.Entities;

namespace backend.Application.Categories;

public class CategoryDto
{
    public int Id { get; init; }

    public string? Name { get; init; }

    private class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<Category, CategoryDto>();
        }
    }
}

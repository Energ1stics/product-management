namespace backend.Domain.Entities;

public class Category : BaseAuditableEntity
{
    public string? Name { get; set; }

    public List<Product> Products { get; set; } = [];
}

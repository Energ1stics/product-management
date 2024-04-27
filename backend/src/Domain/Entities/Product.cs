namespace backend.Domain.Entities;

public class Product : BaseAuditableEntity
{
    public string? Name { get; set; }

    public long? Price { get; set; }

    public string? Description { get; set; }
}

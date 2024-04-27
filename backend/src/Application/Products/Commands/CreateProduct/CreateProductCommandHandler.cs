using backend.Application.Common.Interfaces;
using backend.Domain.Entities;

namespace backend.Application.Products.Commands.CreateProduct;

public class CreateProductCommandHandler
    : IRequestHandler<CreateProductCommand, int>
{
    private readonly IApplicationDbContext _context;

    public CreateProductCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> Handle(
        CreateProductCommand command,
        CancellationToken cancellationToken
    )
    {
        var product = new Product
        {
            Name = command.Name,
            Price = command.Price,
            Description = command.Description
        };

        _context.Products.Add(product);

        await _context.SaveChangesAsync(cancellationToken);

        return product.Id;
    }
}

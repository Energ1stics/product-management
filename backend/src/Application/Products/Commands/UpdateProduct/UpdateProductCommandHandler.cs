using backend.Application.Common.Interfaces;

namespace backend.Application.Products.Commands.UpdateProduct;

public class UpdateProductCommandHandler : IRequestHandler<UpdateProductCommand>
{
    private readonly IApplicationDbContext _context;

    public UpdateProductCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(
        UpdateProductCommand request,
        CancellationToken cancellationToken
    )
    {
        var product = await _context.Products.FirstOrDefaultAsync(
            x => x.Id == request.Id,
            cancellationToken
        );

        Guard.Against.Null(product);

        product.Name = request.Name;
        product.Price = request.Price;
        product.Description = request.Description;

        await _context.SaveChangesAsync(cancellationToken);
    }
}

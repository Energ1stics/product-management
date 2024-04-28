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
        Guard.Against.Null(request.Category);

        var category = await _context.Categories.FirstOrDefaultAsync(
            c => c.Id == request.Category.Id,
            cancellationToken
        );

        Guard.Against.Null(category);

        product.Name = request.Name;
        product.Price = request.Price;
        product.Description = request.Description;
        product.Category = category;

        await _context.SaveChangesAsync(cancellationToken);
    }
}

using backend.Application.Common.Interfaces;

namespace backend.Application.Products.Commands.DeleteProduct;

public record DeleteProductCommand(int Id) : IRequest;

public class DeleteProductCommandHandler : IRequestHandler<DeleteProductCommand>
{
    private readonly IApplicationDbContext _context;

    public DeleteProductCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(
        DeleteProductCommand request,
        CancellationToken cancellationToken
    )
    {
        var entity = await _context
            .Products.Where(p => p.Id == request.Id)
            .FirstOrDefaultAsync(cancellationToken);

        Guard.Against.NotFound(request.Id, entity);

        _context.Products.Remove(entity);

        await _context.SaveChangesAsync(cancellationToken);
    }
}

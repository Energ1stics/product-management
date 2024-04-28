using System.Data;
using backend.Application.Common.Interfaces;

namespace backend.Application.Products.Commands.UpdateProduct;

public class UpdateProductCommandValidator
    : AbstractValidator<UpdateProductCommand>
{
    private readonly IApplicationDbContext _context;

    public UpdateProductCommandValidator(IApplicationDbContext context)
    {
        _context = context;

        RuleFor(p => p.Name).NotEmpty().MinimumLength(3).MaximumLength(50);

        RuleFor(p => p)
            .MustAsync(BeUniqueName)
            .WithMessage("'{PropertyName}' must be unique.")
            .WithErrorCode("Unique");

        RuleFor(p => p.Price).NotNull().GreaterThan(0);

        RuleFor(p => p.Description).MaximumLength(500);
    }

    public async Task<bool> BeUniqueName(
        UpdateProductCommand command,
        CancellationToken cancellationToken
    )
    {
        var product = await _context
            .Products.Where(p => p.Name == command.Name)
            .FirstOrDefaultAsync(cancellationToken);

        return product == null || product.Id == command.Id;
    }
}

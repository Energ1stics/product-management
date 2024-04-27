using backend.Application.Common.Interfaces;

namespace backend.Application.Products.Commands.CreateProduct;

public class CreateProductCommandValidator
    : AbstractValidator<CreateProductCommand>
{
    private readonly IApplicationDbContext _context;

    public CreateProductCommandValidator(IApplicationDbContext context)
    {
        _context = context;

        RuleFor(p => p.Name)
            .NotEmpty()
            .MinimumLength(3)
            .MaximumLength(50)
            .MustAsync(BeUniqueName)
            .WithMessage("'{PropertyName}' must be unique.")
            .WithErrorCode("Unique");

        RuleFor(p => p.Price).NotNull().GreaterThan(0);

        RuleFor(p => p.Description).MaximumLength(500);
    }

    public async Task<bool> BeUniqueName(
        string name,
        CancellationToken cancellationToken
    )
    {
        return await _context.Products.AllAsync(
            p => p.Name != name,
            cancellationToken
        );
    }
}

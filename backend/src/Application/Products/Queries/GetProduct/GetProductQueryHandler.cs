using backend.Application.Common.Interfaces;

namespace backend.Application.Products.Queries.GetProduct;

public class GetProductQueryHandler
    : IRequestHandler<GetProductQuery, ProductDto>
{
    private readonly IApplicationDbContext _dbContext;

    private readonly IMapper _mapper;

    public GetProductQueryHandler(
        IApplicationDbContext dbContext,
        IMapper mapper
    )
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }

    public async Task<ProductDto> Handle(
        GetProductQuery request,
        CancellationToken cancellationToken
    )
    {
        var product = await _dbContext.Products.FirstOrDefaultAsync(
            x => x.Id == request.Id,
            cancellationToken
        );

        Guard.Against.Null(product);

        return _mapper.Map<ProductDto>(product);
    }
}

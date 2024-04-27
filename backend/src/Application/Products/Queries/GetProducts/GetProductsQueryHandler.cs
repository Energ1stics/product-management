using backend.Application.Common.Interfaces;

namespace backend.Application.Products.Queries.GetProducts;

public class GetProductsQueryHandler
    : IRequestHandler<GetProductsQuery, IEnumerable<ProductDto>>
{
    private readonly IApplicationDbContext _context;

    private readonly IMapper _mapper;

    public GetProductsQueryHandler(
        IApplicationDbContext context,
        IMapper mapper
    )
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IEnumerable<ProductDto>> Handle(
        GetProductsQuery request,
        CancellationToken cancellationToken
    )
    {
        return await _context
            .Products.OrderBy(p => p.Name)
            .ProjectTo<ProductDto>(_mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);
    }
}

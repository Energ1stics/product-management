using backend.Application.Common.Interfaces;

namespace backend.Application.Categories.Queries;

public record GetAllCategoriesQuery : IRequest<IEnumerable<CategoryDto>>;

public class GetAllCategoriesQueryHandler
    : IRequestHandler<GetAllCategoriesQuery, IEnumerable<CategoryDto>>
{
    private readonly IApplicationDbContext _context;

    private readonly IMapper _mapper;

    public GetAllCategoriesQueryHandler(
        IApplicationDbContext context,
        IMapper mapper
    )
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IEnumerable<CategoryDto>> Handle(
        GetAllCategoriesQuery request,
        CancellationToken cancellationToken
    )
    {
        return await _context
            .Categories.OrderBy(c => c.Name)
            .AsNoTracking()
            .ProjectTo<CategoryDto>(_mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);
    }
}

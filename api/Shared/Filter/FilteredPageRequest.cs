using System.Linq.Expressions;
using AutoMapper;
using FluentValidation;
using MediatR;
using tweeter.Data;
using tweeter.Shared.Interfaces;
using tweeter.Shared.PagedResult;

namespace tweeter.Shared.Filter;

public class FilteredPageRequest<TEntity, TDto, TFilter> : IRequest<Response<PagedResult<TDto>>>
where TEntity: class, IEntity
where TDto: class
where TFilter : PageDto
{
    public TFilter Filter { get; set; }
}

public class FilteredPageRequestHandler<TRequest, TEntity, TDto, TFilter> : IRequestHandler<TRequest, Response<PagedResult<TDto>>>
where TRequest : FilteredPageRequest<TEntity, TDto, TFilter>
where TEntity : class, IEntity
where TDto : class
where TFilter : PageDto
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;
    private readonly IValidator<TFilter> _validator;

    public FilteredPageRequestHandler(DataContext dataContext,
        IMapper mapper,
        IValidator<TFilter> validator)
    {
        _dataContext = dataContext;
        _mapper = mapper;
        _validator = validator;
    }
    
    public async Task<Response<PagedResult<TDto>>> Handle(TRequest request, CancellationToken cancellationToken)
    {
        var validationResult = await ValidateRequest(request, cancellationToken);

        if (validationResult.HasErrors)
        {
            return validationResult;
        }
        
        var query = GetEntities();

        query = FilterEntities(query, request);

        query = OrderEntities(query, request);

        var result = await BeforeReturn(query, request, cancellationToken);

        return result.AsResponse();
    }

    protected virtual async Task<Response<PagedResult<TDto>>> ValidateRequest(TRequest request, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(request.Filter, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<PagedResult<TDto>> { Errors = errors };
        }

        return new Response<PagedResult<TDto>>();
    }

    protected virtual IQueryable<TEntity> GetEntities()
    {
        return _dataContext.Set<TEntity>();
    }

    protected virtual IQueryable<TEntity> FilterEntities(IQueryable<TEntity> query, TRequest request)
    {
        return query.FilterBy(request.Filter);
    }

    protected virtual IQueryable<TEntity> OrderEntities(IQueryable<TEntity> query, TRequest request)
    {
        var parameter = Expression.Parameter(typeof(TEntity));
        var fieldToSortBy = Expression.PropertyOrField(parameter, request.Filter.SortBy ?? "id");
        var lambda = Expression.Lambda(fieldToSortBy, parameter);

        var method = request.Filter.OrderBy == OrderBy.Ascending
            ? nameof(Enumerable.OrderBy)
            : nameof(Enumerable.OrderByDescending);

        var orderExpression = Expression.Call(
            typeof(Queryable),
            method,
            new[] { typeof(TEntity), fieldToSortBy.Type },
            query.Expression,
            Expression.Quote(lambda)
        );
        
        return query.Provider.CreateQuery<TEntity>(orderExpression);
    }

    protected virtual async Task<PagedResult<TDto>> 
        BeforeReturn(IQueryable<TEntity> query, TRequest request, CancellationToken cancellationToken)
    {
        var (page, pageSize) = (request.Filter.CurrentPage, request.Filter.PageSize);
        
        return await query
            .GetPagedAsync<TEntity, TDto>(_mapper, page, pageSize);
    }
}
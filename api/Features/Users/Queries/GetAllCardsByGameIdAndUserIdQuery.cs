﻿using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using tweeter.Data;
using tweeter.Features.Cards;
using tweeter.Features.UserCards;
using tweeter.Features.Users.Dtos;
using tweeter.Shared;
using tweeter.Shared.PagedResult;

namespace tweeter.Features.Users.Queries;

public class GetAllCardsByGameIdAndUserIdQuery : IRequest<Response<PagedResult<CardDetailDto>>>
{
    public UserCardGameDto UserCardGame { get; set; }
}

public class GetAllCardsByGameIdQueryHandler : IRequestHandler<GetAllCardsByGameIdAndUserIdQuery, Response<PagedResult<CardDetailDto>>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;
    private readonly IValidator<GetAllCardsByGameIdAndUserIdQuery> _validator;

    public GetAllCardsByGameIdQueryHandler(DataContext dataContext, IMapper mapper, IValidator<GetAllCardsByGameIdAndUserIdQuery> validator)
    {
        _dataContext = dataContext;
        _mapper = mapper;
        _validator = validator;
    }

    public async Task<Response<PagedResult<CardDetailDto>>> Handle(GetAllCardsByGameIdAndUserIdQuery query, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(query, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<PagedResult<CardDetailDto>> { Errors = errors };
        }

        var (page, pageSize) = (query.UserCardGame.CurrentPage, query.UserCardGame.PageSize);

        var cards = await _dataContext.Set<UserCard>()
            .Include(x => x.User)
            .Include(x => x.Card)
            .Where(x => x.UserId == query.UserCardGame.UserId
                && x.Card.GameId == query.UserCardGame.GameId)
            .Select(x => x.Card)
            .OrderByDescending(x => x.Id)
            .GetPagedAsync<Card ,CardDetailDto>(_mapper, page, pageSize);

        if (cards.Items.IsNullOrEmpty()) return Error.AsResponse<PagedResult<CardDetailDto>>("Cards not found", "gameId and userId");

        return _mapper.Map<PagedResult<CardDetailDto>>(cards).AsResponse();
    }
}

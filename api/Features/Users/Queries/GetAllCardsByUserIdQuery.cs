﻿using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using tweeter.Data;
using tweeter.Features.Cards;
using tweeter.Features.UserCards;
using tweeter.Shared;

namespace tweeter.Features.Users.Queries;

public class GetAllCardsByUserIdQuery : IRequest<Response<List<CardGetDto>>>
{
    public int Id { get; set; }
}

public class GetAllCardsByUserIdQueryHandler : IRequestHandler<GetAllCardsByUserIdQuery, Response<List<CardGetDto>>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;
    private readonly IValidator<GetAllCardsByUserIdQuery> _validator;

    public GetAllCardsByUserIdQueryHandler(DataContext dataContext, IMapper mapper, IValidator<GetAllCardsByUserIdQuery> validator)
    {
        _dataContext = dataContext;
        _mapper = mapper;
        _validator = validator;
    }

    public async Task<Response<List<CardGetDto>>> Handle(GetAllCardsByUserIdQuery query, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(query, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<List<CardGetDto>> { Errors = errors };
        }

        var cards = await _dataContext.Set<UserCard>()
            .Include(x => x.User)
            .Where(x => x.UserId == query.Id)
            .Select(x => x.Card)
            .ToListAsync(cancellationToken);

        if (cards.IsNullOrEmpty()) return Error.AsResponse<List<CardGetDto>>("Cards not found", "id");

        return _mapper.Map<List<CardGetDto>>(cards).AsResponse();
    }
}

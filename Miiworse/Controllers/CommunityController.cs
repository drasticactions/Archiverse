using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MiiverseDatabase.Context;
using MiiverseDatabase.Entities;
using MiiverseDatabase.Entities.Community;
using Miiworse.Models;
using Miiworse.Utilities;
using Newtonsoft.Json;

namespace Miiworse.Controllers
{
    public class CommunityController : Controller
    {
        private readonly MiiverseDatabaseContext _context;

        public CommunityController(MiiverseDatabaseContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("api/[controller]/all")]
        public JsonResult GetCommunityResults()
        {
            return Json(_context.Games.OrderBy(n => n.Title));
        }

        [HttpPost]
        [Route("api/[controller]/poststats")]
        public JsonResult GetUserPostStats([FromBody] CommunitySearchResults result)
        {
            var popularPosts = _context.Posts.Where(n => n.GameId == result.gameId && string.IsNullOrEmpty(n.ImageUri)).OrderByDescending(n => n.EmpathyCount).Take(4).ToList();
            var popularDrawings = _context.Posts.Where(n => n.GameId == result.gameId && !string.IsNullOrEmpty(n.ImageUri)).OrderByDescending(n => n.EmpathyCount).Take(4).ToList();
            popularPosts.AddRange(popularDrawings);
            return Json(new UserPostMetadata()
            {
                popularPosts = popularPosts
            });
        }

        [HttpPost]
        [Route("api/[controller]/getrelatedgames")]
        public JsonResult GetRelatedGames([FromBody] CommunitySearchResults result)
        {
            return Json(_context.Games.Where(n => n.TitleId == result.titleId && n.GameId != result.gameId).ToList());
        }

        [HttpPost]
        [Route("api/[controller]/getgame")]
        public JsonResult GetGame([FromBody] CommunitySearchResults result)
        {
            return Json(_context.Games.FirstOrDefault(n => n.GameId == result.gameId));
        }

        [Route("api/[controller]")]
        [HttpPost]
        public PagedResult<Game> GetCommunitySearchResults([FromBody] CommunitySearchResults result)
        {
            // var test = JsonConvert.DeserializeObject<PagedResult<Game>>(TestOutput.CommunityString);
            // return test;
            IQueryable<Game> query;

            query = _context.Games.Where(n => n.GameId != "0");

            if (!string.IsNullOrEmpty(result.title))
               query = query.Where(n => n.Title.Contains(result.title));

            if (!string.IsNullOrEmpty(result.type))
                query = query.Where(n => n.Title.Contains(result.type));

            if (!string.IsNullOrEmpty(result.titleId))
                query = query.Where(n => n.TitleId == result.titleId);

            if (!string.IsNullOrEmpty(result.gameId))
                query = query.Where(n => n.TitleId == result.gameId);

            if (result.searchAmerica)
                query = query.Where(n => n.ViewRegion == ViewRegion.America);

            if (result.searchEurope)
                query = query.Where(n => n.ViewRegion == ViewRegion.Europe);

            if (result.searchJapan)
                query = query.Where(n => n.ViewRegion == ViewRegion.Japan);

            if (result.searchWorld)
                query = query.Where(n => n.ViewRegion == ViewRegion.World);

            if (result.sortPosts != SortPosts.None)
            {
                if (result.sortPosts == SortPosts.Most)
                    query = query.OrderByDescending(n => n.TotalPosts);

                if (result.sortPosts == SortPosts.Least)
                    query = query.OrderBy(n => n.TotalPosts);
            }
            else if(result.sortReplies != SortPosts.None)
            {
                if (result.sortReplies == SortPosts.Most)
                    query = query.OrderByDescending(n => n.TotalReplies);

                if (result.sortReplies == SortPosts.Least)
                    query = query.OrderBy(n => n.TotalReplies);
            }
            else if (result.sortDeletedPosts != SortPosts.None)
            {
                if (result.sortDeletedPosts == SortPosts.Most)
                    query = query.OrderByDescending(n => n.TotalDeletedPosts);

                if (result.sortDeletedPosts == SortPosts.Least)
                    query = query.OrderBy(n => n.TotalDeletedPosts);
            }
            else
            {
                if (result.sortTitle == SortTitle.Ascending)
                    query = query.OrderBy(n => n.Title);

                if (result.sortTitle == SortTitle.Descending)
                    query = query.OrderByDescending(n => n.Title);
            }
            var community = query.GetPaged(result.page, 50);
            return community;
        }
    }

    public class CommunitySearchResults
    {
        public int page { get; set; } = 1;

        public string gameId { get; set; } = "";

        public string titleId { get; set; } = "";

        public string title { get; set; } = "";

        public string type { get; set; } = "";

        public SortPosts sortPosts { get; set; } = SortPosts.None;

        public SortPosts sortReplies { get; set; } = SortPosts.None;

        public SortPosts sortDeletedPosts { get; set; } = SortPosts.None;

        public SortTitle sortTitle { get; set; } = SortTitle.Ascending;

        public bool searchJapan { get; set; } = false;

        public bool searchEurope { get; set; } = false;

        public bool searchAmerica { get; set; } = false;

        public bool searchWorld { get; set; } = false;
    }

    public enum SortPosts
    {
        None,
        Most,
        Least
    }

    public enum SortTitle
    {
        Ascending,
        Descending
    }
}

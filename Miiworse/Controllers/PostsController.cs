using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MiiverseDatabase.Context;
using MiiverseDatabase.Entities;
using Miiworse.Models;
using Miiworse.Utilities;
using Newtonsoft.Json;

namespace Miiworse.Controllers
{
    [Route("api/[controller]")]
    public class PostsController : Controller
    {
        private readonly MiiverseDatabaseContext _context;

        public PostsController(MiiverseDatabaseContext context)
        {
            _context = context;
        }

        [HttpPost]
        public PagedResult<Post> GetPostsSearchResults([FromBody] PostSearchResults result)
        {
            // var test = JsonConvert.DeserializeObject<PagedResult<Post>>(TestOutput.PostsString);
            // return test;

            IQueryable<Post> query;

            if (!string.IsNullOrEmpty(result.textSearch)) {
                query = GetPostsWithText(result);
            }
            else if (result.isDrawingOnly) {
                query = GetPostsDrawings(result);
            }
            else if (result.isScreenshotOnly) {
                query = GetPostsScreenshots(result);
            }
            else {
                query = _context.Posts;
            }

            if (!string.IsNullOrEmpty(result.gameId)) {
                query =  query.Where(n => n.GameId == result.gameId);
            }
            else if (!string.IsNullOrEmpty(result.titleId)) {
                query =  query.Where(n => n.TitleId == result.titleId);
            }

            if (!string.IsNullOrEmpty(result.name)) {
                 query =  query.Where(n => n.Name == result.name);
            }

            if (!string.IsNullOrEmpty(result.startDate))
            {
                query = query.Where(n => n.PostedDate >= DateTime.Parse(result.startDate).ToUnixTime());
            }

            if (!string.IsNullOrEmpty(result.endDate))
            {
                query = query.Where(n => n.PostedDate <= DateTime.Parse(result.endDate).ToUnixTime());
            }


            if (result.sortEmpathy != SortPosts.None)
            {
                if (result.sortEmpathy == SortPosts.Most)
                {
                    return query.OrderByDescending(n => n.EmpathyCount).GetPaged(result.page, 20);
                }
                else
                {
                    return query.OrderBy(n => n.EmpathyCount).GetPaged(result.page, 20);
                }
            }

            if (result.sortReplyCount != SortPosts.None)
            {
                if (result.sortReplyCount == SortPosts.Most)
                {
                    return query.OrderByDescending(n => n.ReplyCount).GetPaged(result.page, 20);
                }
                else
                {
                    return query.OrderBy(n => n.ReplyCount).GetPaged(result.page, 20);
                }
            }

            if (result.orderByDateDescending)
            {
                return query.OrderByDescending(n => n.PostedDate).GetPaged(result.page, 20);
            }

            return query.OrderBy(n => n.PostedDate).GetPaged(result.page, 20);
        }

        private IQueryable<Post> GetPostsScreenshots(PostSearchResults result)
        {
           return _context.Posts.Where(n => !string.IsNullOrEmpty(n.ScreenShotUri));
        }

        private IQueryable<Post> GetPostsDrawings(PostSearchResults result)
        {
           return _context.Posts.Where(n => !string.IsNullOrEmpty(n.ImageUri));
        }

        private IQueryable<Post> GetPostsWithText(PostSearchResults result)
        {
           return _context.Posts.Where(n => n.Text.Contains(result.textSearch));
        }
    }

    public class PostSearchResults
    {
        public int page { get; set; } = 1;

        public string gameId { get; set; } = "";

        public string titleId { get; set; } = "";

        public string textSearch { get; set; } = "";

        public string name { get; set; } = "";

        public bool isDrawingOnly {get; set;} = false;

        public bool isScreenshotOnly {get; set;} = false;

        public bool orderByDateDescending { get; set; } = false;

        public SortPosts sortEmpathy { get; set; } = SortPosts.None;

        public SortPosts sortReplyCount { get; set; } = SortPosts.None;

        public string startDate { get; set; } = "";

        public string endDate { get; set; } = "";
    }
}

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
    public class UsersController : Controller
    {
        private readonly MiiverseDatabaseContext _context;

        public UsersController(MiiverseDatabaseContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("api/[controller]/poststats")]
        public JsonResult GetUserPostStats([FromBody] UserSearchResults result)
        {
            var popularPosts = _context.Posts.Where(n => n.Name == result.name).OrderByDescending(n => n.EmpathyCount).Take(8).ToList();
            return Json(new UserPostMetadata()
            {
                popularPosts = popularPosts
            });
        }

        [HttpPost]
        [Route("api/[controller]/getuser")]
        public JsonResult GetUser([FromBody] UserSearchResults result)
        {
            return Json(_context.Users.FirstOrDefault(n => n.Name == result.name));
        }

        [HttpPost]
        [Route("api/[controller]")]
        public PagedResult<User> GetUsersSearchResults([FromBody] UserSearchResults result)
        {
            // var test = JsonConvert.DeserializeObject<PagedResult<User>>(TestOutput.UserString);
            // return test;
            IQueryable<User> query = _context.Users;

            if (!string.IsNullOrEmpty(result.screenName))
            {
                query = query.Where(n => n.ScreenName == result.screenName);
            }

            if (!string.IsNullOrEmpty(result.name))
            {
                query = query.Where(n => n.Name == result.name);
            }

            if (!string.IsNullOrEmpty(result.country))
            {
                query = query.Where(n => n.Country == result.country);
            }

            if (result.sortGameSkill != GameSkill.None)
            {
                query = query.Where(n => n.GameSkill == result.sortGameSkill);
            }

            if (result.sortPosts != SortPosts.None)
            {
                if (result.sortPosts == SortPosts.Most)
                    query = query.OrderByDescending(n => n.TotalPosts);

                if (result.sortPosts == SortPosts.Least)
                    query = query.OrderBy(n => n.TotalPosts);
            }
            else if (result.sortReplies != SortPosts.None)
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
            else if (result.sortFollowers != SortPosts.None)
            {
                if (result.sortFollowers == SortPosts.Most)
                    query = query.OrderByDescending(n => n.FollowerCount);

                if (result.sortFollowers == SortPosts.Least)
                    query = query.OrderBy(n => n.FollowerCount);
            }
            else if (result.sortFollowing != SortPosts.None)
            {
                if (result.sortFollowing == SortPosts.Most)
                    query = query.OrderByDescending(n => n.FollowingCount);

                if (result.sortFollowing == SortPosts.Least)
                    query = query.OrderBy(n => n.FollowingCount);
            }
            else if (result.sortFriends != SortPosts.None)
            {
                if (result.sortFriends == SortPosts.Most)
                    query = query.OrderByDescending(n => n.FriendsCount);

                if (result.sortFriends == SortPosts.Least)
                    query = query.OrderBy(n => n.FriendsCount);
            }
            else
            {
                if (result.sortName == SortTitle.Ascending)
                    query = query.OrderBy(n => n.Name);

                if (result.sortName == SortTitle.Descending)
                    query = query.OrderByDescending(n => n.Name);
            }

            var users = query.GetPaged(result.page, 35);
            return users;
        }
    }

    public class UserPostMetadata
    {
        public List<Post> popularPosts { get; set; }
    }

    public class UserSearchResults
    {
        public int page { get; set; } = 1;

        public string name { get; set; } = "";

        public string screenName { get; set; } = "";

        public string country { get; set; } = "";

        public SortPosts sortPosts { get; set; } = SortPosts.None;

        public SortPosts sortReplies { get; set; } = SortPosts.None;

        public SortPosts sortDeletedPosts { get; set; } = SortPosts.None;

        public SortPosts sortFollowing { get; set; } = SortPosts.None;

        public SortPosts sortFollowers { get; set; } = SortPosts.None;

        public SortPosts sortFriends { get; set; } = SortPosts.None;

        public GameSkill sortGameSkill { get; set; } = GameSkill.None;

        public SortTitle sortName { get; set; } = SortTitle.Ascending;
    }
}

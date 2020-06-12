using Microsoft.AspNetCore.Mvc;
using MiiverseDatabase.Context;
using Miiworse.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace Miiworse.Controllers
{
    /// <summary>
    /// The Main Controller.
    /// </summary>
    public class MainController : Controller
    {
        private readonly MiiverseDatabaseContext _context;

        /// <summary>
        /// Initializes a new instance of the <see cref="MainController"/> class.
        /// </summary>
        public MainController(MiiverseDatabaseContext context)
        {
            _context = context;
        }

        /// <summary>
        /// The Index.
        /// </summary>
        /// <returns>An IActionResult.</returns>
        public IActionResult Index()
        {
            var model = GenerateTwitterHead(HttpContext.Request.Path.ToString().Split('/'));
            return View(model);
        }

        private MainModel GenerateTwitterHead(string[] path)
        {
            try
            {
                if (path.Length != 3)
                    return new MainModel();

                switch (path[1])
                {
                    case "post":
                        var post = this._context.Posts.FirstOrDefault(n => n.Id == path[2]);
                        if (post != null)
                        {
                            var img = string.IsNullOrEmpty(post.ImageUri) ? post.ScreenShotUri : post.ImageUri;
                            var realImg = string.IsNullOrEmpty(img) ? post.IconUri : img;
                            return new MainModel()
                            {
                                 
                                Twitter = new TwitterModel()
                                {
                                    Card = string.IsNullOrEmpty(img) ? "summary" : "summary_large_image",
                                    Title = $"\"{post.ScreenName}\" Miiverse Post",
                                    Description = post.Text,
                                    Image = $"https://web.archive.org/web/20171014154111im_/{realImg}"
                                }
                            };
                        }
                        return new MainModel();
                    case "game":
                        var game = this._context.Games.FirstOrDefault(n => n.GameId == path[2]);
                        if (game != null)
                        {
                            var img = string.IsNullOrEmpty(game.CommunityListIcon) ? game.IconUri : game.CommunityListIcon;
                            return new MainModel()
                            {
                                Twitter = new TwitterModel()
                                {
                                    Card = string.IsNullOrEmpty(game.CommunityListIcon) ? "summary" : "summary_large_image",
                                    Title = $"\"{game.Title}\" Miiverse Community",
                                    Description = $"View the \"{game.Title}\" Miiverse Archive on Archiverse!",
                                    Image = $"https://web.archive.org/web/20171014154111im_/{img}"
                                }
                            };
                        }
                        return new MainModel();
                    case "user":
                        var user = this._context.Users.FirstOrDefault(n => n.Name == path[2]);
                        if (user != null)
                        {
                            return new MainModel()
                            {
                                Twitter = new TwitterModel()
                                {
                                    Card = "summary",
                                    Title = $"{user.ScreenName}'s Miiverse Profile",
                                    Description = $"See {user.ScreenName}'s Miiverse Archive on Archiverse!",
                                    Image = $"https://web.archive.org/web/20171014154111im_/{user.IconUri}"
                                }
                            };
                        }
                        return new MainModel();
                    default:
                        return new MainModel();
                }
            }
            catch (Exception ex)
            {
                return new MainModel();
            }
        }

        /// <summary>
        /// The Error Result.
        /// </summary>
        /// <returns>An IActionResult.</returns>
        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }
    }
}

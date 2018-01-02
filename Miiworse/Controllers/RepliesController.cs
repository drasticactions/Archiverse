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
    public class RepliesController : Controller
    {
        private readonly MiiverseDatabaseContext _context;

        public RepliesController(MiiverseDatabaseContext context)
        {
            _context = context;
        }

        [HttpPost]
        public JsonResult GetReplies([FromBody] ReplyResult rp)
        {
            var result = _context.Replies.Where(n => n.InReplyToId == rp.inReplyToId).
                OrderBy(n => n.PostedDate);
            return Json(result);
        }
    }

    public class ReplyResult
    {
        public string inReplyToId { get; set; }
    }
}

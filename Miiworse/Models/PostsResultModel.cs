using MiiverseDatabase.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Miiworse.Utilities;

namespace Miiworse.Models
{
    public class PostsResultModel
    {
        public PagedResult<Post> Posts { get; set; }
    }
}

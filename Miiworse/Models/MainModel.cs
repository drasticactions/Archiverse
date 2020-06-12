using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Miiworse.Models
{
    public class MainModel
    {
        public TwitterModel Twitter { get; set; } = new TwitterModel();
    }

    public class TwitterModel
    {
        public string Card { get; set; } = "summary_large_image";

        public string Title { get; set; } = "Archiverse";

        public string Description { get; set; } = "Your guide into Archive Teams Miiverse Grab, with nearly 17 terabytes of posts.";

        public string Image { get; set; } = "https://archiverse.guide/img/twitter.png";
    }
}

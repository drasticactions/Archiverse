using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace MiiverseDatabase.Entities.Community
{
    public class Game
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }

        [MaxLength(20)]
        public string GameId { get; set; }
        [MaxLength(20)]
        public string TitleId { get; set; }
        [MaxLength(150)]
        public string CommunityBadge { get; set; }
        [MaxLength(150)]
        public string Title { get; set; }
        [MaxLength(150)]
        public string TitleUrl { get; set; }
        [MaxLength(150)]
        public string IconUri { get; set; }
        [MaxLength(150)]
        public string CommunityListIcon { get; set; }

        public Platform Platform { get; set; }
        [MaxLength(150)]
        public string Type { get; set; }

        public ViewRegion ViewRegion { get; set; }

        public int TotalPosts { get; set; }

        public int TotalReplies { get; set; }

        public int TotalDeletedPosts { get; set; }
    }

    public enum Platform
    {
        Nintendo3DS,
        NintendoWiiU,
        Both
    }

    public enum ViewRegion
    {
        Japan = 1,
        America = 2,
        Europe = 4,
        World = 5
    }
}

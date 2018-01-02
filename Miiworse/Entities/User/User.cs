using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace MiiverseDatabase.Entities
{
    public class User
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }

        [MaxLength(15)]
        public string ScreenName { get; set; }
        [MaxLength(30)]
        public string Name { get; set; }
        [MaxLength(150)]
        public string IconUri { get; set; }
        [MaxLength(30)]
        public string Country { get; set; }
        [MaxLength(30)]
        public string Birthday { get; set; }

        public GameSkill GameSkill { get; set; }

        public string GameSystem { get; set; }
        [MaxLength(50)]
        public string FavoriteGameGenres { get; set; }

        public bool IsHidden { get; set; }

        public bool IsBirthdayHidden { get; set; }

        public bool IsError { get; set; }
        public string Bio { get; set; }

        public int EmpathyCount { get; set; }

        public int TotalPosts { get; set; }

        public int TotalReplies { get; set; }

        public int TotalDeletedPosts { get; set; }

        public int FriendsCount { get; set; }

        public int FollowingCount { get; set; }

        public int FollowerCount { get; set; }
        [MaxLength(150)]
        public string SidebarCoverUrl { get; set; }
    }
}

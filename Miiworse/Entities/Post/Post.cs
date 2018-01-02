using System;
using MiiverseDatabase.Entities.Feeling;
using MiiverseDatabase.Entities.Community;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MiiverseDatabase.Entities
{
    public class DeletedPost
    {
        [Key]
        [MaxLength(70)]
        public string Id { get; set; }

        public string Title { get; set; }
        [MaxLength(75)]
        public string ScreenName { get; set; }
        [MaxLength(75)]
        public string Name { get; set; }
        [MaxLength(163)]
        public string IconUri { get; set; }
        [MaxLength(30)]
        public string InReplyToId { get; set; }

        [MaxLength(55)]
        public string GameId { get; set; }
        [MaxLength(55)]
        public string TitleId { get; set; }
        [MaxLength(162)]
        public string GameCommunityTitle { get; set; }
        [MaxLength(161)]
        public string GameCommunityIconUri { get; set; }
        [MaxLength(160)]
        public string WarcLocation { get; set; }
    }

    public class Reply
    {
        [Key]
        [MaxLength(70)]
        public string Id { get; set; }

        ///// <summary>
        ///// Tag
        ///// </summary>
        //public PostTag Tag { get; set; }

        /// <summary>
        /// Text content
        /// </summary>
        public string Text { get; set; }

        /// <summary>
		/// Text content
		/// </summary>
        public string Title { get; set; }

        /// <summary>
		/// The date of the post
		/// </summary>
        public long PostedDate { get; set; }

        /// <summary>
        /// Image content
        /// </summary>
        [MaxLength(157)]
        public string ImageUri { get; set; }

        /// <summary>
        /// Reply count
        /// </summary>
        public int ReplyCount { get; set; }

        /// <summary>
        /// Empathy count
        /// </summary>
        public int EmpathyCount { get; set; }

        /// <summary>
        /// Played or not
        /// </summary>
        public bool IsPlayed { get; set; }

        /// <summary>
        /// Spoiler or not
        /// </summary>
        public bool IsSpoiler { get; set; }

        /// <summary>
		/// Is Accepting Responses
		/// </summary>
        public bool IsAcceptingResponse { get; set; }

        /// <summary>
        /// Topic Type
        /// </summary>
        [MaxLength(75)]
        public string DiscussionType { get; set; }

        /// <summary>
        /// Screen Shot
        /// </summary>
        [MaxLength(156)]
        public string ScreenShotUri { get; set; }

        [MaxLength(75)]
        public string ScreenName { get; set; }
        [MaxLength(75)]
        public string Name { get; set; }
        [MaxLength(155)]
        public string IconUri { get; set; }

        /// <summary>
        /// Feeling
        /// </summary>
        public FeelingType Feeling { get; set; }

        /// <summary>
		/// In Reply To Id
		/// </summary>
        [MaxLength(30)]
        public string InReplyToId { get; set; }
        [MaxLength(55)]
        public string GameId { get; set; }
        [MaxLength(55)]
        public string TitleId { get; set; }
        [MaxLength(154)]

        public string GameCommunityTitle { get; set; }
        [MaxLength(153)]
        public string GameCommunityIconUri { get; set; }

        [MaxLength(152)]
        public string VideoUrl { get; set; }
        [MaxLength(151)]
        public string WarcLocation { get; set; }
    }

    public class Post
    {
        [Key]
        [MaxLength(70)]
        public string Id { get; set; }

        ///// <summary>
        ///// Tag
        ///// </summary>
        //public PostTag Tag { get; set; }

        /// <summary>
        /// Text content
        /// </summary>
        public string Text { get; set; }

        /// <summary>
		/// Text content
		/// </summary>
        public string Title { get; set; }

        /// <summary>
		/// The date of the post
		/// </summary>
        public long PostedDate { get; set; }

        /// <summary>
        /// Image content
        /// </summary>
        [MaxLength(157)]
        public string ImageUri { get; set; }

        /// <summary>
        /// Reply count
        /// </summary>
        public int ReplyCount { get; set; }

        /// <summary>
        /// Empathy count
        /// </summary>
        public int EmpathyCount { get; set; }

        /// <summary>
        /// Played or not
        /// </summary>
        public bool IsPlayed { get; set; }

        /// <summary>
        /// Spoiler or not
        /// </summary>
        public bool IsSpoiler { get; set; }

        /// <summary>
		/// Is Accepting Responses
		/// </summary>
        public bool IsAcceptingResponse { get; set; }

        /// <summary>
        /// Topic Type
        /// </summary>
        [MaxLength(75)]
        public string DiscussionType { get; set; }

        /// <summary>
        /// Screen Shot
        /// </summary>
        [MaxLength(156)]
        public string ScreenShotUri { get; set; }

        [MaxLength(75)]
        public string ScreenName { get; set; }
        [MaxLength(75)]
        public string Name { get; set; }
        [MaxLength(155)]
        public string IconUri { get; set; }

        /// <summary>
        /// Feeling
        /// </summary>
        public FeelingType Feeling { get; set; }

        [MaxLength(55)]
        public string GameId { get; set; }
        [MaxLength(55)]
        public string TitleId { get; set; }
        [MaxLength(154)]

        public string GameCommunityTitle { get; set; }
        [MaxLength(153)]
        public string GameCommunityIconUri { get; set; }

        [MaxLength(152)]
        public string VideoUrl {get; set;}
        [MaxLength(151)]
        public string WarcLocation { get; set; }
	}
}

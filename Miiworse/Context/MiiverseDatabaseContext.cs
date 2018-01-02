using Microsoft.EntityFrameworkCore;
using MiiverseDatabase.Entities;
using MiiverseDatabase.Entities.Community;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Reflection;

namespace MiiverseDatabase.Context
{
    public static class EfExtensions
    {
        public static void AddOrUpdate<T>(this DbSet<T> dbSet, T data) where T : class
        {
            var t = typeof(T);
            PropertyInfo keyField = null;
            foreach (var propt in t.GetProperties())
            {
                var keyAttr = propt.GetCustomAttribute<KeyAttribute>();
                if (keyAttr != null)
                {
                    keyField = propt;
                    break; // assume no composite keys
                }
            }
            if (keyField == null)
            {
                throw new Exception($"{t.FullName} does not have a KeyAttribute field. Unable to exec AddOrUpdate call.");
            }
            var keyVal = keyField.GetValue(data);
            var dbVal = dbSet.Find(keyVal);
            if (dbVal != null)
            {
                //dbSet.Update(data);
                return;
            }
            dbSet.Add(data);
        }
    }

    public static class EfFind
    {
        public static bool AddOrUpdatePost(DbSet<Post> dbSet, Post data)
        {
            var t = typeof(Post);
            PropertyInfo keyField = null;
            foreach (var propt in t.GetProperties())
            {
                var keyAttr = propt.GetCustomAttribute<KeyAttribute>();
                if (keyAttr != null)
                {
                    keyField = propt;
                    break; // assume no composite keys
                }
            }
            if (keyField == null)
            {
                throw new Exception($"{t.FullName} does not have a KeyAttribute field. Unable to exec AddOrUpdate call.");
            }
            var keyVal = keyField.GetValue(data);
            var dbVal = dbSet.Find(keyVal);
            if (dbVal != null)
            {
                //dbSet.Update(data);
                return false;
            }
            return true;
        }

        public static bool AddOrUpdateDeletedPost(DbSet<DeletedPost> dbSet, DeletedPost data)
        {
            var t = typeof(DeletedPost);
            PropertyInfo keyField = null;
            foreach (var propt in t.GetProperties())
            {
                var keyAttr = propt.GetCustomAttribute<KeyAttribute>();
                if (keyAttr != null)
                {
                    keyField = propt;
                    break; // assume no composite keys
                }
            }
            if (keyField == null)
            {
                throw new Exception($"{t.FullName} does not have a KeyAttribute field. Unable to exec AddOrUpdate call.");
            }
            var keyVal = keyField.GetValue(data);
            var dbVal = dbSet.Find(keyVal);
            if (dbVal != null)
            {
                //dbSet.Update(data);
                return false;
            }
            return true;
        }
    }

    public class MiiverseDatabaseContext : DbContext
    {
        public MiiverseDatabaseContext(DbContextOptions<MiiverseDatabaseContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Game> Games { get; set; }

        public DbSet<Post> Posts { get; set; }

        public DbSet<Reply> Replies { get; set; }

        public DbSet<DeletedPost> DeletedPosts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<User>()
            //    .HasIndex(b => b.ScreenName);

            modelBuilder.Entity<Post>()
                .HasIndex(b => new { b.PostedDate, b.ScreenName, b.GameId, b.TitleId });

            modelBuilder.Entity<Reply>()
               .HasIndex(b => new { b.PostedDate, b.InReplyToId, b.ScreenName });

            modelBuilder.Entity<DeletedPost>()
                .HasIndex(b => new { b.InReplyToId, b.ScreenName });

            modelBuilder.Entity<Game>()
                .HasIndex(b => new { b.TitleId });
        }
    }
}

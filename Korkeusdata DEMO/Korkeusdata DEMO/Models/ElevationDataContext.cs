using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Korkeusdata_DEMO.Models
{
    public partial class ElevationDataContext : DbContext
    {
        public ElevationDataContext()
        {
        }

        public ElevationDataContext(DbContextOptions<ElevationDataContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Data> Data { get; set; }
        public virtual DbSet<Meta> Meta { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=localhost\\SQLEXPRESS;Database=ElevationData;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Data>(entity =>
            {
                entity.HasKey(e => e.MapId);

                entity.Property(e => e.MapId)
                    .HasMaxLength(5)
                    .ValueGeneratedNever();
            });

            modelBuilder.Entity<Meta>(entity =>
            {
                entity.HasKey(e => e.MapId);

                entity.Property(e => e.MapId)
                    .HasMaxLength(5)
                    .ValueGeneratedNever();
            });
        }
    }
}

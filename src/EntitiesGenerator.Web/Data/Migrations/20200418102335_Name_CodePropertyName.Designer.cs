﻿// <auto-generated />
using EntitiesGenerator.Web.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace EntitiesGenerator.Web.Data.Migrations
{
    [DbContext(typeof(EntitiesGeneratorDbContext))]
    [Migration("20200418102335_Name_CodePropertyName")]
    partial class Name_CodePropertyName
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("EntitiesGenerator.FeatureSetting", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(36)")
                        .HasMaxLength(36);

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ItemId")
                        .IsRequired()
                        .HasColumnType("nvarchar(36)")
                        .HasMaxLength(36);

                    b.HasKey("Id");

                    b.HasIndex("ItemId", "Discriminator")
                        .IsUnique();

                    b.ToTable("FeatureSettings");

                    b.HasDiscriminator<string>("Discriminator").HasValue("FeatureSetting");
                });

            modelBuilder.Entity("EntitiesGenerator.Item", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(36)")
                        .HasMaxLength(36);

                    b.Property<bool>("AbstractModel")
                        .HasColumnType("bit");

                    b.Property<string>("DisplayName")
                        .IsRequired()
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<string>("ModuleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(36)")
                        .HasMaxLength(36);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .IsRequired()
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<bool>("ParameterListLineBreak")
                        .HasColumnType("bit");

                    b.Property<int>("Position")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ModuleId", "Name")
                        .IsUnique();

                    b.HasIndex("ModuleId", "NormalizedName")
                        .IsUnique();

                    b.ToTable("Items");
                });

            modelBuilder.Entity("EntitiesGenerator.ItemsRelationship", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(36)")
                        .HasMaxLength(36);

                    b.Property<string>("Item1Id")
                        .IsRequired()
                        .HasColumnType("nvarchar(36)")
                        .HasMaxLength(36);

                    b.Property<string>("Item2Id")
                        .IsRequired()
                        .HasColumnType("nvarchar(36)")
                        .HasMaxLength(36);

                    b.HasKey("Id");

                    b.HasIndex("Item2Id");

                    b.HasIndex("Item1Id", "Item2Id")
                        .IsUnique();

                    b.ToTable("ItemsRelationships");
                });

            modelBuilder.Entity("EntitiesGenerator.Module", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(36)")
                        .HasMaxLength(36);

                    b.Property<bool>("HasOwnNamespace")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .IsRequired()
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<int>("Position")
                        .HasColumnType("int");

                    b.Property<string>("ProjectId")
                        .IsRequired()
                        .HasColumnType("nvarchar(36)")
                        .HasMaxLength(36);

                    b.HasKey("Id");

                    b.HasIndex("ProjectId", "Name")
                        .IsUnique();

                    b.HasIndex("ProjectId", "NormalizedName")
                        .IsUnique();

                    b.ToTable("Modules");
                });

            modelBuilder.Entity("EntitiesGenerator.Project", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(36)")
                        .HasMaxLength(36);

                    b.Property<string>("GenerateLocation")
                        .HasColumnType("nvarchar(253)")
                        .HasMaxLength(253);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<string>("Namespace")
                        .HasColumnType("nvarchar(200)")
                        .HasMaxLength(200);

                    b.Property<string>("NormalizedName")
                        .IsRequired()
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<string>("WorkingLocation")
                        .HasColumnType("nvarchar(253)")
                        .HasMaxLength(253);

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.HasIndex("NormalizedName")
                        .IsUnique();

                    b.ToTable("Projects");
                });

            modelBuilder.Entity("EntitiesGenerator.ChildEntityFeatureSetting", b =>
                {
                    b.HasBaseType("EntitiesGenerator.FeatureSetting");

                    b.Property<bool>("DeleteRestrict")
                        .HasColumnName("DeleteRestrict")
                        .HasColumnType("bit");

                    b.Property<bool>("HasSortedChildrenInParent")
                        .HasColumnType("bit");

                    b.Property<string>("ParentName")
                        .IsRequired()
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<string>("SortedChildrenInParentCriteriaPropertyName")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.HasDiscriminator().HasValue("ChildEntityFeatureSetting");
                });

            modelBuilder.Entity("EntitiesGenerator.CodeBasedEntityFeatureSetting", b =>
                {
                    b.HasBaseType("EntitiesGenerator.FeatureSetting");

                    b.Property<string>("CodePropertyName")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<bool>("HasCodeGenerator")
                        .HasColumnType("bit");

                    b.HasDiscriminator().HasValue("CodeBasedEntityFeatureSetting");
                });

            modelBuilder.Entity("EntitiesGenerator.EntityFeatureSetting", b =>
                {
                    b.HasBaseType("EntitiesGenerator.FeatureSetting");

                    b.HasDiscriminator().HasValue("EntityFeatureSetting");
                });

            modelBuilder.Entity("EntitiesGenerator.NameBasedEntityFeatureSetting", b =>
                {
                    b.HasBaseType("EntitiesGenerator.FeatureSetting");

                    b.Property<string>("NamePropertyName")
                        .HasColumnName("NamePropertyName")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.HasDiscriminator().HasValue("NameBasedEntityFeatureSetting");
                });

            modelBuilder.Entity("EntitiesGenerator.OnOffEntityFeatureSetting", b =>
                {
                    b.HasBaseType("EntitiesGenerator.FeatureSetting");

                    b.HasDiscriminator().HasValue("OnOffEntityFeatureSetting");
                });

            modelBuilder.Entity("EntitiesGenerator.PreprocessedEntityFeatureSetting", b =>
                {
                    b.HasBaseType("EntitiesGenerator.FeatureSetting");

                    b.HasDiscriminator().HasValue("PreprocessedEntityFeatureSetting");
                });

            modelBuilder.Entity("EntitiesGenerator.ReadableIdEntityFeatureSetting", b =>
                {
                    b.HasBaseType("EntitiesGenerator.FeatureSetting");

                    b.Property<string>("IdSourcePropertyName")
                        .IsRequired()
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.HasDiscriminator().HasValue("ReadableIdEntityFeatureSetting");
                });

            modelBuilder.Entity("EntitiesGenerator.ScopedNameBasedEntityFeatureSetting", b =>
                {
                    b.HasBaseType("EntitiesGenerator.FeatureSetting");

                    b.Property<bool>("DeleteRestrict")
                        .HasColumnName("DeleteRestrict")
                        .HasColumnType("bit");

                    b.Property<bool>("HasSortedChildrenInScope")
                        .HasColumnType("bit");

                    b.Property<string>("NamePropertyName")
                        .HasColumnName("NamePropertyName")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<string>("ScopeName")
                        .IsRequired()
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<string>("SortedChildrenInScopeCriteriaPropertyName")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.HasDiscriminator().HasValue("ScopedNameBasedEntityFeatureSetting");
                });

            modelBuilder.Entity("EntitiesGenerator.TimeTrackedEntityFeatureSetting", b =>
                {
                    b.HasBaseType("EntitiesGenerator.FeatureSetting");

                    b.HasDiscriminator().HasValue("TimeTrackedEntityFeatureSetting");
                });

            modelBuilder.Entity("EntitiesGenerator.FeatureSetting", b =>
                {
                    b.HasOne("EntitiesGenerator.Item", "Item")
                        .WithMany("FeatureSettings")
                        .HasForeignKey("ItemId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("EntitiesGenerator.Item", b =>
                {
                    b.HasOne("EntitiesGenerator.Module", "Module")
                        .WithMany("Items")
                        .HasForeignKey("ModuleId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });

            modelBuilder.Entity("EntitiesGenerator.ItemsRelationship", b =>
                {
                    b.HasOne("EntitiesGenerator.Item", "Item1")
                        .WithMany()
                        .HasForeignKey("Item1Id")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("EntitiesGenerator.Item", "Item2")
                        .WithMany()
                        .HasForeignKey("Item2Id")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });

            modelBuilder.Entity("EntitiesGenerator.Module", b =>
                {
                    b.HasOne("EntitiesGenerator.Project", "Project")
                        .WithMany("Modules")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}

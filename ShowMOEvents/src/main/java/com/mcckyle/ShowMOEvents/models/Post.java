//***************************************************************************************
//
//     Filename: Post.java
//     Author: Kyle McColgan
//     Date: 31 July 2026
//     Description: This file contains the Post entity class.
//
//***************************************************************************************

package com.mcckyle.ShowMOEvents.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "posts")
public class Post
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    @Size(min=5, max = 50)
    @Column(nullable = false)
    private String title;

    @NotBlank
    @Size(min=5, max=100)
    @Column(nullable = false)
    private String content;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

    public Post ()
    {

    }

    public Post(String title, String content, List<Comment> commentList) {
        this.title = title;
        this.content = content;
        this.comments = commentList;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public @NotNull String getTitle() {
        return title;
    }

    public void setTitle(@NotNull String title) {
        this.title = title;
    }

    public @NotBlank String getContent() {
        return content;
    }

    public void setContent(@NotBlank String content) {
        this.content = content;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    @Override
    public String toString()
    {
        return "Post - Title: " + this.getTitle() + "\nContent: " + this.getContent();
    }

    public void addComment(Comment comment)
    {
        comments.add(comment);
        comment.setPost(this);
    }

    public void removeComment(Comment comment)
    {
        comments.remove(comment);
        comment.setPost(null);
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Post post = (Post) o;
        return Objects.equals(id, post.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}

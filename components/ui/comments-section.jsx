"use client";

import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, MoreHorizontal, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const initialComments = [
  {
    id: "1",
    author: {
      name: "Alice Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
      handle: "@alicej",
    },
    text: "This UI looks amazing! Have we considered adding markdown support for the comments?",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    likes: 4,
    replies: [
      {
        id: "2",
        author: {
          name: "Bob Smith",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
          handle: "@bobsmith",
        },
        text: "Markdown is on the roadmap for Q3. For now, plain text is the priority.",
        createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
        likes: 1,
        replies: [
          {
            id: "3",
            author: {
              name: "Alice Johnson",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
              handle: "@alicej",
            },
            text: "Sounds like a solid plan. Thanks for the update!",
            createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(), // 10 mins ago
            likes: 0,
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: "4",
    author: {
      name: "Charlie Davis",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
      handle: "@charlied",
    },
    text: "Could we also implement a feature to resolve comment threads once the issue is addressed?",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    likes: 12,
    replies: [],
  },
];

export function CommentsSection() {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now().toString(),
      author: {
        name: "Current User",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Current",
        handle: "@currentuser",
      },
      text: newComment,
      createdAt: new Date().toISOString(),
      likes: 0,
      replies: [],
    };

    setComments([...comments, comment]);
    setNewComment("");
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8 py-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Comments</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Join the conversation. Be polite and respectful.
        </p>
      </div>

      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentThread key={comment.id} comment={comment} />
        ))}
      </div>

      <div className="mt-8 pt-6 border-t flex gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Current" alt="Current User" />
          <AvatarFallback>CU</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-4">
          <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px] resize-y"
          />
          <div className="flex justify-end">
            <Button onClick={handleAddComment}>Post Comment</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CommentThread({ comment }) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  const hasReplies = comment.replies && comment.replies.length > 0;

  return (
    <div className="flex gap-4">
      {/* Left column: Avatar and connecting line */}
      <div className="flex flex-col items-center">
        <Avatar className="h-10 w-10 z-10 bg-background ring-2 ring-background shrink-0">
          <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
          <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        {hasReplies && (
          <div className="w-px bg-border flex-1 my-2" />
        )}
      </div>

      {/* Right column: Content and nested replies */}
      <div className="flex-1 pb-2">
        {/* Comment Content */}
        <div className="bg-muted/50 rounded-lg p-4 border border-transparent hover:border-border transition-colors">
          <div className="flex items-center justify-between mb-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-sm">{comment.author.name}</span>
              <span className="text-muted-foreground text-sm">{comment.author.handle}</span>
              <span className="text-muted-foreground text-xs">•</span>
              <span className="text-muted-foreground text-xs" suppressHydrationWarning>
                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
              </span>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground -mr-2 -mt-2 shrink-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">
            {comment.text}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 mt-2">
          <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-muted-foreground px-2 -ml-2 hover:text-red-500 hover:bg-red-500/10 transition-colors">
            <Heart className="h-4 w-4" />
            <span className="text-xs">{comment.likes > 0 ? comment.likes : "Like"}</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 gap-1.5 text-muted-foreground px-2"
            onClick={() => setIsReplying(!isReplying)}
          >
            <MessageSquare className="h-4 w-4" />
            <span className="text-xs">Reply</span>
          </Button>
        </div>

        {/* Reply Input */}
        {isReplying && (
          <div className="flex gap-4 mt-4 animate-in fade-in slide-in-from-top-2">
            <Avatar className="h-8 w-8 mt-1">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Current" alt="Current User" />
              <AvatarFallback>CU</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <Textarea
                placeholder={`Reply to @${comment.author.handle}...`}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="min-h-[80px] text-sm"
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setIsReplying(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={() => { setIsReplying(false); setReplyText(""); }}>
                  Reply
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Nested Replies */}
        {hasReplies && (
          <div className="mt-4 space-y-4">
            {comment.replies.map((reply) => (
              <CommentThread key={reply.id} comment={reply} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentsSection;

"use client";
import { useState, useEffect } from "react";
import AddComments from "./components/Addcomments/page";
import CommentCard from "./components/Allcomments/page";
import CommentsHeader from "./components/Commentheader/page";

interface Company {
  name: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  company: Company;
}

interface Comment {
  id: number;
  name: string;
  email: string;
  company: string;
  comment: string;
  timestamp: string;
}

const usersData: User[] = [
  { id: 1, name: "John Doe", email: "john.doe@techcorp.com", company: { name: "TechCorp Solutions" } },
  { id: 2, name: "Sarah Johnson", email: "sarah.johnson@innovate.io", company: { name: "Innovate Technologies" } },
  { id: 3, name: "Mike Chen", email: "mike.chen@webdev.co", company: { name: "WebDev Co." } },
  { id: 4, name: "Emma Wilson", email: "emma.wilson@startup.xyz", company: { name: "StartupXYZ" } },
  { id: 5, name: "David Rodriguez", email: "david.rodriguez@agency.net", company: { name: "Creative Agency" } },
  { id: 6, name: "Lisa Park", email: "lisa.park@design.studio", company: { name: "Design Studio Pro" } },
  { id: 7, name: "Alex Thompson", email: "alex.thompson@code.works", company: { name: "CodeWorks Inc." } },
  { id: 8, name: "Maria Garcia", email: "maria.garcia@digital.hub", company: { name: "Digital Hub Solutions" } },
];

const defaultComments: Comment[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@techcorp.com",
    company: "TechCorp Solutions",
    comment:
      "This is a really insightful post! I've been working with similar technologies and found this approach quite effective. The examples you provided are clear and well-documented.",
    timestamp: new Date("2023-12-01T10:00:00Z").toISOString(),
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@innovate.io",
    company: "Innovate Technologies",
    comment:
      "Great explanation! I had some questions about the implementation details, but your code samples cleared everything up. Looking forward to trying this out in my project.",
    timestamp: new Date("2023-12-02T12:30:00Z").toISOString(),
  },
  {
    id: 3,
    name: "Mike Chen",
    email: "mike.chen@webdev.co",
    company: "WebDev Co.",
    comment:
      "Thanks for sharing this! The performance improvements you mentioned are exactly what we needed for our application. The before/after benchmarks really help demonstrate the impact.",
    timestamp: new Date("2023-12-03T15:15:00Z").toISOString(),
  },
  {
    id: 4,
    name: "Emma Wilson",
    email: "emma.wilson@startup.xyz",
    company: "StartupXYZ",
    comment:
      "Excellent tutorial! I appreciate how you broke down complex concepts into digestible steps. The troubleshooting section at the end is particularly valuable.",
    timestamp: new Date("2023-12-04T09:45:00Z").toISOString(),
  },
  {
    id: 5,
    name: "David Rodriguez",
    email: "david.rodriguez@agency.net",
    company: "Creative Agency",
    comment:
      "This approach saved us hours of development time. The integration was smoother than expected, and the documentation quality is outstanding. Highly recommended!",
    timestamp: new Date("2023-12-05T18:20:00Z").toISOString(),
  },
];

export default function Home() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  useEffect(() => {
    const saved = localStorage.getItem("comments");
    const savedComments: Comment[] = saved ? JSON.parse(saved) : [];
    setComments([...defaultComments, ...savedComments]);
  }, []);

  useEffect(() => {
    const userAdded = comments.filter(
      (c) => !defaultComments.some((d) => d.id === c.id)
    );
    localStorage.setItem("comments", JSON.stringify(userAdded));
  }, [comments]);

  const handleAddComment = (userId: number, text: string) => {
    const user = usersData.find((u) => u.id === userId);
    if (!user) return;

    const newComment: Comment = {
      id: Date.now(),
      name: user.name,
      email: user.email,
      company: user.company.name,
      comment: text,
      timestamp: new Date().toISOString(),
    };

    setComments((prev) => [newComment, ...prev]);
  };

  const sortedComments = [...comments].sort((a, b) => {
    const timeA = new Date(a.timestamp).getTime();
    const timeB = new Date(b.timestamp).getTime();
    return sortOrder === "newest" ? timeB - timeA : timeA - timeB;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Comment System</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Share your thoughts and engage with the community. Join the conversation below!
          </p>
        </header>

        <div className="space-y-8">
          <AddComments users={usersData} onAddComment={handleAddComment} />

          <div className="space-y-6">
            <CommentsHeader
              totalComments={comments.length}
              onSortChange={setSortOrder}
            />
            <div className="space-y-4">
              {sortedComments.map((c) => (
                <CommentCard
                  key={c.id}
                  name={c.name}
                  email={c.email}
                  company={c.company}
                  comment={c.comment}
                  timestamp={c.timestamp}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

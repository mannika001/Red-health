"use client";

import { useState } from "react";

type CommentCardProps = {
  name: string;
  email: string;
  company: string;
  comment: string;
   timestamp: string;
};

export default function CommentCard({
  name,
  email,
  company,
  comment,
}: CommentCardProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
   
      <div className="rounded-lg border text-card-foreground shadow-sm p-6 bg-comment-bg border-comment-border hover:bg-comment-hover transition-all duration-200 hover:shadow-lg">
        <div className="flex gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <div>
          
                <h3
               className="font-semibold text-foreground text-lg cursor-pointer hover:text-primary active:text-blue-600 transition-colors duration-200"
                   onClick={() => setShowModal(true)}
                >
                  {name}
                </h3>
                <p className="text-sm text-muted-foreground">{email}</p>
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {company}
              </div>
            </div>

            <div className="pt-2">
              <p className="text-foreground leading-relaxed">{comment}</p>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-2xl shadow-lg w-96 p-6 relative">
       
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gray-300 font-bold text-lg">
                {name.split(" ")[0][0]}
                {name.split(" ")[1]?.[0]}
              </div>
              <h2 className="text-lg font-semibold">User Details</h2>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-medium">{email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Company</p>
                <p className="font-medium">{company}</p>
              </div>
            </div>

            <div className="mt-4 text-center">
              <span className="text-xs text-gray-500 px-3 py-1 bg-gray-100 rounded-lg">
                User Info
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

"use client";
import { Send } from "lucide-react";
import { useState } from "react";
import { Listbox } from "@headlessui/react";


interface Company {
  name: string;
}

interface User {
  id: number;
  name: string;
  company: Company;
}

interface AddCommentsProps {
  users: User[];
  onAddComment: (userId: number, text: string) => void;
}

export default function AddComments({ users, onAddComment }: AddCommentsProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedUser || !text) return;
    onAddComment(selectedUser.id, text);
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-white shadow-md rounded-xl p-6 border border-gray-200"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select User
        </label>

        <Listbox value={selectedUser} onChange={setSelectedUser}>
          <div className="relative">
            <Listbox.Button className="w-full border border-gray-300 rounded-lg p-2.5 text-left focus:ring-2 focus:ring-black focus:border-black transition bg-white">
              {selectedUser
                ? `${selectedUser.name} (${selectedUser.company.name})`
                : "Select a user"}
            </Listbox.Button>

            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-300 bg-white shadow-lg z-10">
              {users && users.map((u: User) => (
                <Listbox.Option
                  key={u.id}
                  value={u}
                  className={({ active }) =>
                    `cursor-pointer px-3 py-2 ${
                      active ? "bg-blue-600 text-white" : "text-gray-900"
                    }`
                  }
                >
                  {u.name} ({u.company.name})
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Comment
        </label>
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
          rows={4}
          placeholder="Write your comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-lg shadow-sm transition-colors"
      >
        <Send size={16} className="stroke-current" />
        Post Comment
      </button>
    </form>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewTaskPage() {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('blue');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      alert('Title is required');
      return;
    }

    try {
      await fetch('http://localhost:3001/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, color }),
      });
      router.push('/');
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  return (
    <main className="bg-gray-100 min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-xl font-bold mb-4">Create New Task</h1>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Task Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter task title"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Task Color</label>
          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="blue">Blue</option>
            <option value="red">Red</option>
            <option value="grey">Grey</option>
          </select>
        </div>
        <div className="flex gap-4">
          <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded">
            Create Task
          </button>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="w-full bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}

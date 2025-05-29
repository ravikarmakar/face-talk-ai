"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function Home() {
  const { data: session } = authClient.useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    await authClient.signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onError: () => {
          window.alert("Error creating user");
        },
        onSuccess: () => {
          window.alert("User created successfully");
          setName("");
          setEmail("");
          setPassword("");
        },
      }
    );
  };

  const onLogin = async () => {
    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onError: () => {
          window.alert("Error creating user");
        },
        onSuccess: () => {
          window.alert("User created successfully");
          setEmail("");
          setPassword("");
        },
      }
    );
  };

  if (session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-700 p-4 gap-4">
        <h1 className="text-white">Welcome, {session.user.name}!</h1>
        <Button onClick={() => authClient.signOut()}>Sign Out</Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-700 p-4 gap-4">
        <Input
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button onClick={onSubmit}>Create user</Button>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-700 p-4 gap-4">
        <Input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button onClick={onLogin}>Login user</Button>
      </div>
    </div>
  );
}

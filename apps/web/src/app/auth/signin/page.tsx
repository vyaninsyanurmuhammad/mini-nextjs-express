import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Confetti } from '@phosphor-icons/react/dist/ssr';
import React from 'react';

const Signin = () => {
  return (
    <>
      <div className="flex flex-col bg-slate-50 h-screen w-screen overflow-x-hidden">
        <div className="flex w-full h-full">
          <div className="w-1/2 h-full bg-slate-blue-800 p-12">
            <div className="w-full h-fit inline-flex flex-row gap-2 text-white">
              <Confetti weight="bold" size={32} />
              <span className="text-2xl font-extrabold tracking-tighter">
                ShowTime!
              </span>
            </div>
          </div>
          <div className="w-1/2 flex flex-col items-center justify-center px-24 gap-8">
            <div className="w-full flex flex-col items-center gap-2.5">
              <h1 className="text-3xl font-semibold tracking-tighter text-slate-800">
                Welcome back!
              </h1>
              <p className="text-sm text-slate-600">
                Sign In to access your dashboard, settings and events.
              </p>
            </div>

            <div className="w-full flex flex-col gap-6 items-center justify-center">
              <div className="w-full flex flex-col gap-2.5">
                <Label>Email</Label>
                <Input
                  id="email"
                  type="email"
                  className="h-12 !ring-slate-blue-800 rounded-xl border-slate-200"
                  placeholder="hello.world@example.com"
                />
              </div>
              <div className="w-full flex flex-col gap-2.5">
                <Label>Password</Label>
                <Input
                  id="password"
                  type="password"
                  className="h-12 !ring-slate-blue-800 rounded-xl border-slate-200"
                  placeholder="••••••••••••••••••••••"
                />
              </div>
            </div>
            <Button className="h-12 w-full bg-slate-blue-800 hover:bg-slate-blue-700">
              Sign In
            </Button>
            <p className="text-slate-600 text-sm">
              Don't have an account?&nbsp;
              <span className="text-blue-crayola-900">Sign Up</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;

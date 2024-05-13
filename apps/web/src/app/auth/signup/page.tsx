'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signUpThunk } from '@/redux/features/auth-thunk';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { Confetti } from '@phosphor-icons/react/dist/ssr';
import { useFormik } from 'formik';
import { LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';
import * as Yup from 'yup';

const Signup = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.authReducer.isAuthLoading);
  const user = useAppSelector((state) => state.authReducer.user);

  const SignUpSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .min(6, 'Must be exactly 5 digits minimum'),
    email: Yup.string()
      .email('Invalid email address format')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
        'Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
      ),
    referral: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      referral: '',
    },
    validationSchema: SignUpSchema,
    onSubmit: (values) => {
      dispatch(
        signUpThunk({
          name: values.name,
          email: values.email,
          password: values.password,
          reveral: values.referral,
        }),
      );
    },
  });

  useEffect(() => {
    if (user) {
      redirect('/');
    }
  }, [user]);

  return (
    <>
      <div className="flex flex-col bg-slate-50 h-screen w-screen overflow-x-hidden">
        {isLoading && (
          <div className="absolute h-full w-full bg-slate-800/80 flex justify-center items-center">
            <LoaderCircle className="text-white animate-spin" />
          </div>
        )}
        <div className="flex w-full h-full">
          <div className="hidden lg:block w-1/2 h-full bg-slate-blue-800 p-12">
            <div className="w-full h-fit inline-flex flex-row gap-2 text-white">
              <Confetti weight="bold" size={32} />
              <span className="text-2xl font-extrabold tracking-tighter">
                ShowTime!
              </span>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-8 lg:px-24 gap-10">
            <div className="w-full flex flex-col items-center gap-2.5">
              <h1 className="text-3xl font-semibold tracking-tighter text-slate-800">
                Create a new account
              </h1>
              <p className="text-sm text-slate-600">
                Enter your details to register
              </p>
            </div>

            <form
              onSubmit={formik.handleSubmit}
              className="w-full flex flex-col gap-8 items-center justify-center"
            >
              <div className="w-full flex flex-col gap-6 items-center justify-center">
                <div className="w-full flex flex-col gap-2.5">
                  <Label>Name</Label>
                  <Input
                    id="name"
                    type="text"
                    className={`h-12 rounded-xl ${
                      Boolean(formik.errors.name)
                        ? 'border-red-500 !ring-red-500'
                        : 'border-slate-200 !ring-slate-blue-800'
                    }`}
                    placeholder="John Doe"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                  {Boolean(formik.errors.name) && (
                    <span className="text-sm text-red-500">
                      {formik.errors.name}
                    </span>
                  )}
                </div>
                <div className="w-full flex flex-col gap-2.5">
                  <Label>Email</Label>
                  <Input
                    id="email"
                    type="email"
                    className={`h-12 rounded-xl ${
                      Boolean(formik.errors.email)
                        ? 'border-red-500 !ring-red-500'
                        : 'border-slate-200 !ring-slate-blue-800'
                    }`}
                    placeholder="hello.world@example.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  {Boolean(formik.errors.email) && (
                    <span className="text-sm text-red-500">
                      {formik.errors.email}
                    </span>
                  )}
                </div>
                <div className="w-full flex flex-col gap-2.5">
                  <Label>Password</Label>
                  <Input
                    id="password"
                    type="password"
                    className={`h-12 rounded-xl ${
                      Boolean(formik.errors.password)
                        ? 'border-red-500 !ring-red-500'
                        : 'border-slate-200 !ring-slate-blue-800'
                    }`}
                    placeholder="••••••••••••••••••••••"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  {Boolean(formik.errors.password) && (
                    <span className="text-sm text-red-500">
                      {formik.errors.password}
                    </span>
                  )}
                </div>
                <div className="w-full flex flex-col gap-2.5">
                  <Label>Referral code (optional)</Label>
                  <Input
                    id="referral"
                    type="text"
                    className={`h-12 rounded-xl ${
                      Boolean(formik.errors.referral)
                        ? 'border-red-500 !ring-red-500'
                        : 'border-slate-200 !ring-slate-blue-800'
                    }`}
                    placeholder="•••••• •••• •••• •••• ••••••"
                    value={formik.values.referral}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="h-12 w-full bg-slate-blue-800 hover:bg-slate-blue-700"
              >
                Sign Up
              </Button>
            </form>

            <p className="text-slate-600 text-sm">
              Already a member?&nbsp;
              <Link href={'/auth/signin'} className="text-blue-crayola-900">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;

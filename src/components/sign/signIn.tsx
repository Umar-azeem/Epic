import React from 'react';
export default function SignIn() {
  const handleSignIn = () => {
    console.log('Sign in clicked');
    // Add your sign-in logic here
  };
  const handleSignUp = () => {
    console.log('Sign up clicked');
    // Add your sign-up logic here
  };

  return (
    <div className="h-auto  flex items-center justify-center py-4 px-1.5">
      <div className="pt-4 space-y-4">
        <p className="text-slate-300 text-start text-sm  leading-relaxed">
          Join our community, grow your knowledge and learn from others!
        </p>
        <button 
          onClick={handleSignIn}
          className="w-full bg-btn-primary hover:bg-cyan-600 text-black py-1.5 text-sm rounded-md"
        >
          Sign in
        </button>
        <p className="text-slate-400 text-[12px]">
          Don{`'`}t have an Epic Games account?
          <button 
            onClick={handleSignUp}
            className="text-cyan-500 underline font-medium"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
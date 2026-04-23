import Link from 'next/link';
import { SignInButton, SignUpButton, UserButton, Show } from '@clerk/nextjs';

export default function Navbar() {
  return (
    <div className="bg-[#FFC017] border-b border-black sticky top-0 z-50 transition-all">
      <nav className="max-w-7xl mx-auto px-5 md:px-10 h-20 flex justify-between items-center font-serif">
        <div className="flex items-center gap-5">
          <Link href="/" className="text-4xl font-bold tracking-tighter">
            Medium
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-5 text-sm">
          <Link href="/">Our story</Link>
          <Link href="/">Membership</Link>
          <Link href="/">Write</Link>

          <Show when="signed-out">
            <SignInButton mode="modal">
                <button className="cursor-pointer">Sign In</button>
            </SignInButton>
            <SignUpButton mode="modal">
                <button className="bg-black text-white px-4 py-2 rounded-full cursor-pointer">
                    Get Started
                </button>
            </SignUpButton>
          </Show>

          <Show when="signed-in">
             <UserButton />
          </Show>
        </div>

        <div className="md:hidden flex items-center gap-4">
             <Show when="signed-out">
                <SignInButton mode="modal">
                    <button className="bg-black text-white px-4 py-2 rounded-full text-sm">Get Started</button>
                </SignInButton>
             </Show>
             <Show when="signed-in">
                <UserButton />
             </Show>
        </div>
      </nav>
    </div>
  );
}

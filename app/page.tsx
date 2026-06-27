import { redirect } from 'next/navigation'
export default function RootRedirect() {
  // Real home (the New Chat hero) lives inside the (app) layout
  redirect('/new-chat')
}

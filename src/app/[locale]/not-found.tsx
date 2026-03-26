import { Link } from '@/i18n/navigation';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-text-primary">404</h1>
      <p className="mt-4 text-lg text-text-muted">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-6 bg-gradient-to-r from-amber to-amber-dark text-bg-primary rounded-lg px-6 py-2 font-semibold hover:opacity-90 transition-opacity"
      >
        Go Home
      </Link>
    </div>
  );
}

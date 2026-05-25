import Link from "next/link";

export default function BackToCategoriesBtn() {
  return (
    <>
      <Link
        className="group inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors mb-6"
        href="/categories"
      >
        <svg
          className="w-4 h-4 transition-transform group-hover:-translate-x-1"
          fill="currentColor"
          viewBox="0 0 512 512"
          aria-hidden="true"
        >
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 105.4-105.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
        </svg>
        <span className="text-sm font-medium">Back to Categories</span>
      </Link>
    </>
  );
}

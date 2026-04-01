"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
  FaEnvelope,
  FaGift,
  FaPhone,
  FaRegUser,
  FaRegUserCircle,
  FaTruck,
  FaUser,
  FaUserPlus,
} from "react-icons/fa";
import { FaCartShopping, FaRegHeart } from "react-icons/fa6";
import { FiX } from "react-icons/fi";
import { ImExit } from "react-icons/im";
import { IoSearch } from "react-icons/io5";
import { LuUserRound } from "react-icons/lu";
import { TiThMenu } from "react-icons/ti";

export const logo = (
  <svg
    width={166}
    height={32}
    viewBox="0 0 166 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_16_7260)">
      <path
        d="M8.38493 25.6638C9.9059 25.6638 11.1389 24.4309 11.1389 22.9099C11.1389 21.3889 9.9059 20.1559 8.38493 20.1559C6.86396 20.1559 5.63098 21.3889 5.63098 22.9099C5.63098 24.4309 6.86396 25.6638 8.38493 25.6638Z"
        stroke="#0AAD0A"
        strokeWidth="1.32414"
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
      <path
        d="M7.20044 9.48587H23.8596"
        stroke="#0AAD0A"
        strokeWidth="1.32414"
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
      <path
        d="M8.65894 12.8177H23.1315"
        stroke="#0AAD0A"
        strokeWidth="1.32414"
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
      <path
        d="M7.90759 20.1549H18.6974C19.8792 20.1549 20.9319 19.4041 21.316 18.2858L25.7629 5.34804C26.1471 4.22981 27.1988 3.4791 28.3816 3.4791H31.6166"
        stroke="#0AAD0A"
        strokeWidth="1.32414"
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
      <path
        d="M8.38504 23.3075C8.60471 23.3075 8.78278 23.1294 8.78278 22.9098C8.78278 22.6901 8.60471 22.5121 8.38504 22.5121C8.16538 22.5121 7.9873 22.6901 7.9873 22.9098C7.9873 23.1294 8.16538 23.3075 8.38504 23.3075Z"
        stroke="#0AAD0A"
        strokeWidth="1.10345"
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
      <path
        d="M18.3965 25.6638C19.9175 25.6638 21.1504 24.4309 21.1504 22.9099C21.1504 21.3889 19.9175 20.1559 18.3965 20.1559C16.8755 20.1559 15.6426 21.3889 15.6426 22.9099C15.6426 24.4309 16.8755 25.6638 18.3965 25.6638Z"
        stroke="#0AAD0A"
        strokeWidth="1.32414"
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
      <path
        d="M18.3966 23.3075C18.6162 23.3075 18.7944 23.1294 18.7944 22.9097C18.7944 22.6901 18.6162 22.512 18.3966 22.512C18.177 22.512 17.9989 22.6901 17.9989 22.9097C17.9989 23.1294 18.177 23.3075 18.3966 23.3075Z"
        stroke="#0AAD0A"
        strokeWidth="1.10345"
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
      <path
        d="M21.8703 16.673H7.37794C6.89275 16.673 6.46691 16.3366 6.33363 15.8471L3.87538 6.84261C3.75251 6.3936 4.07424 5.94568 4.51987 5.94568H23.0989"
        stroke="#0AAD0A"
        strokeWidth="1.32414"
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
      <path
        d="M1.03162 27.3827C1.03162 27.3827 11.6226 23.7989 25.915 27.3827"
        stroke="#0AAD0A"
        strokeWidth="1.32414"
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
      <path
        d="M37.7046 25.8064V6.5462H50.4569V9.90357H41.7766V14.4929H49.6105V17.8503H41.7766V25.8064H37.7046Z"
        fill="#21313C"
      />
      <path
        d="M52.0934 25.8065V11.3613H55.9774V13.8816H56.1279C56.3913 12.9851 56.8333 12.3079 57.454 11.8503C58.0747 11.3863 58.7894 11.1544 59.5982 11.1544C59.7987 11.1544 60.0151 11.1669 60.247 11.192C60.479 11.217 60.6828 11.2515 60.8583 11.2954V14.8503C60.6703 14.7939 60.41 14.7438 60.0778 14.6998C59.7455 14.6559 59.4414 14.634 59.1655 14.634C58.5762 14.634 58.0496 14.7625 57.5856 15.0196C57.128 15.2704 56.7643 15.6215 56.4947 16.0729C56.2314 16.5243 56.0997 17.0447 56.0997 17.634V25.8065H52.0934Z"
        fill="#21313C"
      />
      <path
        d="M68.0458 26.0886C66.5599 26.0886 65.2809 25.7876 64.2088 25.1858C63.143 24.5775 62.3217 23.7186 61.7448 22.6089C61.1681 21.4929 60.8797 20.1732 60.8797 18.6497C60.8797 17.1638 61.1681 15.8597 61.7448 14.7374C62.3217 13.6152 63.1336 12.7405 64.1807 12.1136C65.2339 11.4867 66.469 11.1732 67.8859 11.1732C68.8389 11.1732 69.726 11.3268 70.5474 11.634C71.375 11.935 72.096 12.3895 72.7104 12.9976C73.3311 13.6058 73.8139 14.3707 74.1587 15.2923C74.5035 16.2077 74.6759 17.2798 74.6759 18.5086V19.6089H62.4785V17.1262H70.9048C70.9048 16.5494 70.7794 16.0384 70.5285 15.5932C70.2778 15.1481 69.9298 14.8001 69.4847 14.5494C69.0458 14.2923 68.5348 14.1637 67.9518 14.1637C67.3436 14.1637 66.8045 14.3048 66.3343 14.5869C65.8703 14.8629 65.5066 15.2358 65.2433 15.7061C64.98 16.17 64.8452 16.6873 64.8389 17.2578V19.6183C64.8389 20.333 64.9705 20.9506 65.2339 21.471C65.5035 21.9913 65.8829 22.3926 66.3718 22.6748C66.8609 22.9569 67.4408 23.0979 68.1116 23.0979C68.5568 23.0979 68.9643 23.0352 69.3342 22.9098C69.7042 22.7844 70.0208 22.5963 70.2841 22.3456C70.5474 22.0948 70.748 21.7876 70.8859 21.424L74.5913 21.6684C74.4032 22.5588 74.0176 23.3361 73.4345 24.0007C72.8577 24.6591 72.1117 25.1732 71.1963 25.5431C70.2872 25.9067 69.2371 26.0886 68.0458 26.0886Z"
        fill="#21313C"
      />
      <path
        d="M88.5147 15.4804L84.847 15.7061C84.7842 15.3926 84.6495 15.1105 84.4425 14.8597C84.2357 14.6026 83.963 14.3989 83.6244 14.2484C83.2921 14.0917 82.894 14.0133 82.4301 14.0133C81.8094 14.0133 81.2858 14.1449 80.8595 14.4083C80.4332 14.6653 80.22 15.0102 80.22 15.4428C80.22 15.7876 80.3579 16.0792 80.6338 16.3174C80.9096 16.5557 81.383 16.7468 82.0539 16.891L84.6683 17.4177C86.0727 17.7061 87.1197 18.17 87.8094 18.8095C88.499 19.4491 88.8438 20.2891 88.8438 21.33C88.8438 22.2766 88.5649 23.1073 88.0068 23.822C87.4551 24.5368 86.6965 25.0948 85.731 25.496C84.7717 25.891 83.6652 26.0886 82.4113 26.0886C80.499 26.0886 78.9755 25.6904 77.8406 24.8941C76.7122 24.0917 76.0507 23.0008 75.8563 21.6215L79.7968 21.4145C79.9159 21.9976 80.2043 22.4427 80.662 22.7499C81.1197 23.0509 81.7059 23.2013 82.4207 23.2013C83.1228 23.2013 83.687 23.0666 84.1135 22.797C84.546 22.5211 84.7654 22.1669 84.7717 21.7343C84.7654 21.3706 84.6118 21.0728 84.3109 20.8409C84.0099 20.6026 83.546 20.4208 82.919 20.2954L80.4175 19.797C79.0069 19.5148 77.9567 19.0259 77.267 18.3299C76.5837 17.634 76.242 16.7468 76.242 15.6684C76.242 14.7405 76.4927 13.9412 76.9943 13.2704C77.5022 12.5995 78.2137 12.0823 79.1291 11.7186C80.0507 11.3549 81.1291 11.1732 82.3642 11.1732C84.1886 11.1732 85.6244 11.5587 86.6714 12.3299C87.7247 13.1011 88.3391 14.1512 88.5147 15.4804Z"
        fill="#21313C"
      />
      <path
        d="M94.5783 17.4553V25.8064H90.5721V6.5462H94.4654V13.9099H94.6347C94.9607 13.0571 95.4874 12.3895 96.2147 11.9067C96.9419 11.4177 97.8541 11.1732 98.9513 11.1732C99.9545 11.1732 100.829 11.3926 101.575 11.8314C102.328 12.264 102.911 12.8879 103.324 13.7029C103.744 14.5117 103.951 15.4804 103.945 16.6089V25.8064H99.9388V17.3237C99.9451 16.4333 99.7194 15.7406 99.2617 15.2453C98.8103 14.7499 98.177 14.5023 97.3621 14.5023C96.8165 14.5023 96.3338 14.6183 95.9137 14.8503C95.5 15.0822 95.1739 15.4208 94.9356 15.8659C94.7037 16.3048 94.5846 16.8346 94.5783 17.4553Z"
        fill="#21313C"
      />
      <path
        d="M123.373 13.2892H119.253C119.178 12.7562 119.025 12.2828 118.793 11.8691C118.56 11.4491 118.263 11.0917 117.899 10.797C117.535 10.5023 117.115 10.2766 116.638 10.1199C116.169 9.96315 115.658 9.88478 115.105 9.88478C114.109 9.88478 113.241 10.1324 112.501 10.6277C111.761 11.1167 111.187 11.8314 110.78 12.7719C110.373 13.7061 110.168 14.8409 110.168 16.1763C110.168 17.5493 110.373 18.703 110.78 19.6372C111.194 20.5713 111.77 21.2766 112.51 21.7531C113.25 22.2296 114.106 22.4678 115.078 22.4678C115.624 22.4678 116.127 22.3958 116.592 22.2516C117.062 22.1074 117.479 21.8973 117.843 21.6215C118.206 21.3394 118.507 20.9976 118.745 20.5963C118.99 20.1951 119.159 19.7374 119.253 19.2233L123.373 19.2421C123.265 20.1262 122.999 20.9788 122.573 21.8002C122.153 22.6152 121.586 23.3456 120.871 23.9913C120.162 24.6308 119.316 25.1387 118.331 25.5148C117.354 25.8848 116.247 26.0697 115.012 26.0697C113.294 26.0697 111.758 25.681 110.404 24.9035C109.055 24.1262 107.99 23.0008 107.207 21.5274C106.429 20.0541 106.04 18.2704 106.04 16.1763C106.04 14.076 106.436 12.2891 107.225 10.8158C108.015 9.34246 109.087 8.2202 110.442 7.44904C111.796 6.67162 113.319 6.2829 115.012 6.2829C116.127 6.2829 117.163 6.43964 118.116 6.75311C119.074 7.0666 119.924 7.52427 120.664 8.12616C121.403 8.72176 122.006 9.45218 122.47 10.3174C122.94 11.1826 123.241 12.1732 123.373 13.2892Z"
        fill="#21313C"
      />
      <path
        d="M129.542 26.0792C128.62 26.0792 127.799 25.9193 127.078 25.5995C126.357 25.2735 125.786 24.7939 125.366 24.1606C124.952 23.5211 124.746 22.7248 124.746 21.7719C124.746 20.9694 124.893 20.2954 125.188 19.75C125.483 19.2045 125.883 18.7656 126.391 18.4333C126.899 18.1011 127.476 17.8503 128.122 17.681C128.774 17.5117 129.457 17.3926 130.172 17.3237C131.013 17.2358 131.69 17.1544 132.204 17.0791C132.718 16.9976 133.09 16.8784 133.323 16.7217C133.554 16.5651 133.671 16.333 133.671 16.0258V15.9694C133.671 15.3738 133.483 14.913 133.106 14.5869C132.736 14.2609 132.21 14.098 131.527 14.098C130.805 14.098 130.231 14.2579 129.805 14.5775C129.379 14.891 129.097 15.286 128.958 15.7625L125.254 15.4616C125.441 14.5838 125.811 13.8252 126.363 13.1857C126.915 12.54 127.627 12.0446 128.498 11.6998C129.375 11.3487 130.391 11.1732 131.545 11.1732C132.347 11.1732 133.115 11.2672 133.849 11.4553C134.589 11.6433 135.244 11.935 135.815 12.3299C136.392 12.7248 136.846 13.2327 137.178 13.8534C137.511 14.4678 137.677 15.2045 137.677 16.0635V25.8064H133.877V23.8032H133.765C133.532 24.2547 133.223 24.6528 132.833 24.9976C132.444 25.3361 131.978 25.6027 131.432 25.797C130.887 25.9851 130.257 26.0792 129.542 26.0792ZM130.689 23.3143C131.279 23.3143 131.799 23.1982 132.25 22.9663C132.701 22.728 133.056 22.4083 133.313 22.007C133.57 21.6058 133.698 21.1513 133.698 20.6434V19.1105C133.574 19.1919 133.401 19.2672 133.181 19.3361C132.969 19.3989 132.727 19.4585 132.458 19.5148C132.187 19.565 131.918 19.6121 131.648 19.6559C131.379 19.6935 131.134 19.728 130.914 19.7594C130.445 19.8283 130.034 19.9381 129.683 20.0886C129.332 20.239 129.06 20.4427 128.864 20.6998C128.67 20.9506 128.573 21.2641 128.573 21.6403C128.573 22.1857 128.77 22.6026 129.166 22.891C129.567 23.1732 130.075 23.3143 130.689 23.3143Z"
        fill="#21313C"
      />
      <path
        d="M139.99 25.8065V11.3613H143.874V13.8816H144.025C144.288 12.9851 144.73 12.3079 145.351 11.8503C145.972 11.3863 146.686 11.1544 147.495 11.1544C147.696 11.1544 147.912 11.1669 148.144 11.192C148.376 11.217 148.58 11.2515 148.755 11.2954V14.8503C148.567 14.7939 148.307 14.7438 147.975 14.6998C147.642 14.6559 147.339 14.634 147.062 14.634C146.473 14.634 145.946 14.7625 145.483 15.0196C145.024 15.2704 144.661 15.6215 144.392 16.0729C144.128 16.5243 143.996 17.0447 143.996 17.634V25.8065H139.99Z"
        fill="#21313C"
      />
      <path
        d="M158.44 11.3613V14.3707H149.741V11.3613H158.44ZM151.716 7.90045H155.722V21.3675C155.722 21.7374 155.779 22.0258 155.891 22.2328C156.004 22.4334 156.16 22.5745 156.362 22.6559C156.568 22.7375 156.807 22.7782 157.076 22.7782C157.264 22.7782 157.452 22.7625 157.641 22.7312C157.829 22.6936 157.972 22.6653 158.073 22.6465L158.703 25.6278C158.503 25.6904 158.22 25.7625 157.856 25.844C157.493 25.9318 157.051 25.985 156.531 26.0039C155.565 26.0415 154.718 25.913 153.992 25.6183C153.27 25.3237 152.71 24.866 152.308 24.2453C151.907 23.6246 151.709 22.8409 151.716 21.8942V7.90045Z"
        fill="#21313C"
      />
    </g>
    <defs>
      <clipPath id="clip0_16_7260">
        <rect width="165.16" height={32} fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const contactIcon = (
  <svg
    width="14"
    height="16"
    viewBox="0 0 14 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 2C4.53125 2 2.47813 3.79062 2.07188 6.14687C2.3625 6.05312 2.675 6 3 6H3.5C4.32812 6 5 6.67188 5 7.5V10.5C5 11.3281 4.32812 12 3.5 12H3C1.34375 12 0 10.6562 0 9V7C0 3.13438 3.13438 0 7 0C10.8656 0 14 3.13438 14 7V12.2531C14 14.325 12.3188 16.0031 10.2469 16.0031L7.5 16H6.5C5.67188 16 5 15.3281 5 14.5C5 13.6719 5.67188 13 6.5 13H7.5C8.32812 13 9 13.6719 9 14.5H10.25C11.4937 14.5 12.5 13.4937 12.5 12.25V11.5969C12.0594 11.8531 11.5469 11.9969 11 11.9969H10.5C9.67188 11.9969 9 11.325 9 10.4969V7.49687C9 6.66875 9.67188 5.99687 10.5 5.99687H11C11.325 5.99687 11.6344 6.04688 11.9281 6.14375C11.5219 3.79063 9.47188 1.99688 7 1.99688V2Z"
      fill="#16A34A"
    />
  </svg>
);

export default function Navbar() {
  const [menu, setMenu] = useState<boolean>(false);
  const [infoMenu, setInfoMenu] = useState<boolean>(false);

  const path = usePathname();

  const { data, status } = useSession();

  console.log(data, "data");

  function handleSignout() {
    signOut({ callbackUrl: "/signin" });
    setMenu(false);
  }

  return (
    <>
      <div className="hidden lg:block text-sm border-b border-gray-100 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-11">
            {/* Left Side: Info Badges */}
            <div className="flex items-center gap-8 text-gray-500 font-medium">
              <span className="flex items-center gap-2 group cursor-default">
                <FaTruck
                  className="text-emerald-600 group-hover:animate-bounce transition-all"
                  size={14}
                />
                <span className="group-hover:text-gray-700 transition-colors">
                  Free Shipping on Orders 500 EGP
                </span>
              </span>
              <span className="flex items-center gap-2 group cursor-default">
                <FaGift
                  className="text-emerald-600 group-hover:scale-110 transition-transform"
                  size={14}
                />
                <span className="group-hover:text-gray-700 transition-colors">
                  New Arrivals Daily
                </span>
              </span>
            </div>

            {/* Right Side: Contact & Auth */}
            <div className="flex items-center gap-6">
              {/* Contact Links */}
              <div className="flex items-center gap-5 text-gray-500 border-r border-gray-200 pr-6">
                <a
                  href="tel:+18001234567"
                  className="flex items-center gap-2 hover:text-emerald-600 transition-colors"
                >
                  <FaPhone size={12} />
                  <span>+1 (800) 123-4567</span>
                </a>
                <a
                  href="mailto:support@freshcart.com"
                  className="flex items-center gap-2 hover:text-emerald-600 transition-colors"
                >
                  <FaEnvelope size={13} />
                  <span>support@freshcart.com</span>
                </a>
              </div>

              {/* Auth Links */}
              <div className="flex items-center gap-4">
                {status === "unauthenticated" ? (
                  <div className="flex items-center gap-5">
                    <Link
                      href="/signin"
                      className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 font-semibold transition-all hover:-translate-y-0.5"
                    >
                      <FaRegUser size={13} />
                      <span>Sign In</span>
                    </Link>
                    <Link
                      href="/signup"
                      className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 font-semibold transition-all hover:-translate-y-0.5"
                    >
                      <FaRegUser size={13} />
                      <span>Sign Up</span>
                    </Link>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    {/* User Profile Info */}
                    <Link href={"/profile"} className="flex items-center gap-2 px-3 py-1 text-gray-600 hover:text-primary-600">
                      <FaUser />
                      <span className="font-medium">{data?.user?.name}</span>
                    </Link>

                    <button
                      onClick={() => {
                        handleSignout();
                      }}
                      className="text-gray-600 flex items-center font-bold gap-2 hover:text-red-600 transition-colors cursor-pointer text-xs uppercase tracking-wider"
                    >
                      <ImExit size={20} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="bg-white">
          <div className="container px-4">
            <div className="flex items-center justify-between h-16 lg:h-[72px] gap-4 lg:gap-8">
              <Link href="/" className="shrink-0">
                {logo}
              </Link>
              <form className="hidden lg:flex flex-1 max-w-2xl">
                <div className="relative w-full">
                  <input
                    type="text"
                    className="w-full px-5 py-3 pr-12 rounded-full border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
                    placeholder="Search for products, brands and more..."
                  />
                  <button className=" cursor-pointer absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 transition-colors">
                    <IoSearch />
                  </button>
                </div>
              </form>
              <nav className="hidden xl:flex items-center gap-6">
                <Link
                  href={"/"}
                  className={`text-gray-700 hover:text-primary-600 font-medium transition-colors ${path === "/" ? "text-primary-600" : ""}`}
                >
                  Home
                </Link>
                <Link
                  href={"/products"}
                  className={`text-gray-700 hover:text-primary-600 font-medium transition-colors ${path === "/products" ? "text-primary-600" : ""}`}
                >
                  Shop
                </Link>
                <Link
                  href={"/categories"}
                  className={`text-gray-700 hover:text-primary-600 font-medium transition-colors ${path === "/categories" ? "text-primary-600" : ""}`}
                >
                  Categories
                </Link>
                <Link
                  href={"/brands"}
                  className={`text-gray-700 hover:text-primary-600 font-medium transition-colors ${path === "/brands" ? "text-primary-600" : ""}`}
                >
                  Brands
                </Link>
              </nav>
              <div className="flex gap-2 items-center">
                <Link
                  href={"/contact"}
                  className="hidden lg:flex gap-2 me-2 p-1.5 hover:opacity-80"
                >
                  <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center">
                    {contactIcon}
                  </div>
                  <div className="text-xs flex flex-col items-center">
                    <span className="text-gray-400">Support</span>
                    <span className="font-semibold">24/7 Help</span>
                  </div>
                </Link>
                <Link
                  href={"/wishlist"}
                  className="relative p-2.5 rounded-full   group text-gray-600 hover:bg-gray-100"
                >
                  <FaRegHeart
                    className="group-hover:text-primary-600"
                    size={"23"}
                  />
                </Link>
                <Link
                  href={"/cart"}
                  className=" rounded-full  relative p-2.5 group text-gray-600 hover:bg-gray-100"
                >
                  <FaCartShopping
                    className="group-hover:text-primary-600"
                    size={"23"}
                  />
                </Link>
                <div className="relative">
                  {status === "authenticated" && (
                    <button
                      onClick={() => setInfoMenu(!infoMenu)}
                      className="  rounded-full hidden lg:flex  cursor-pointer group relative p-2.5 text-gray-600 hover:bg-gray-100"
                    >
                      <FaRegUserCircle
                        className="group-hover:text-primary-600"
                        size={"23"}
                      />
                    </button>
                  )}

                  <div
                    className={` ${infoMenu ? "" : "hidden"} absolute right-0 top-full mt-2 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl transition-all duration-200 origin-top-right opacity-100 scale-100 visible`}
                  >
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <svg
                            data-prefix="far"
                            data-icon="circle-user"
                            className="svg-inline--fa fa-circle-user text-xl text-primary-600"
                            role="img"
                            viewBox="0 0 512 512"
                            aria-hidden="true"
                          >
                            <path
                              fill="currentColor"
                              d="M406.5 399.6C387.4 352.9 341.5 320 288 320l-64 0c-53.5 0-99.4 32.9-118.5 79.6-35.6-37.3-57.5-87.9-57.5-143.6 0-114.9 93.1-208 208-208s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3l64 0c38.8 0 71.2 27.6 78.5 64.3zM256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z"
                            />
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">
                            {data?.user?.name}
                          </p>
                          <p className="text-xs text-gray-400 truncate" />
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      <Link
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                        href="/profile"
                      >
                        <svg
                          data-prefix="far"
                          data-icon="user"
                          className="svg-inline--fa fa-user w-4 text-gray-400"
                          role="img"
                          viewBox="0 0 448 512"
                          aria-hidden="true"
                        >
                          <path
                            fill="currentColor"
                            d="M144 128a80 80 0 1 1 160 0 80 80 0 1 1 -160 0zm208 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0zM48 480c0-70.7 57.3-128 128-128l96 0c70.7 0 128 57.3 128 128l0 8c0 13.3 10.7 24 24 24s24-10.7 24-24l0-8c0-97.2-78.8-176-176-176l-96 0C78.8 304 0 382.8 0 480l0 8c0 13.3 10.7 24 24 24s24-10.7 24-24l0-8z"
                          />
                        </svg>
                        My Profile
                      </Link>
                      <Link
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                        href="/orders"
                      >
                        <svg
                          data-prefix="fas"
                          data-icon="box-open"
                          className="svg-inline--fa fa-box-open w-4 text-gray-400"
                          role="img"
                          viewBox="0 0 640 512"
                          aria-hidden="true"
                        >
                          <path
                            fill="currentColor"
                            d="M560.3 237.2c10.4 11.8 28.3 14.4 41.8 5.5 14.7-9.8 18.7-29.7 8.9-44.4l-48-72c-2.8-4.2-6.6-7.7-11.1-10.2L351.4 4.7c-19.3-10.7-42.8-10.7-62.2 0L88.8 116c-5.4 3-9.7 7.4-12.6 12.8L27.7 218.7c-12.6 23.4-3.8 52.5 19.6 65.1l33 17.7 0 53.3c0 23 12.4 44.3 32.4 55.7l176 99.7c19.6 11.1 43.5 11.1 63.1 0l176-99.7c20.1-11.4 32.4-32.6 32.4-55.7l0-117.5zm-240-9.8L170.2 144 320.3 60.6 470.4 144 320.3 227.4zm-41.5 50.2l-21.3 46.2-165.8-88.8 25.4-47.2 161.7 89.8z"
                          />
                        </svg>
                        My Orders
                      </Link>
                      <Link
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                        href="/wishlist"
                      >
                        <svg
                          data-prefix="far"
                          data-icon="heart"
                          className="svg-inline--fa fa-heart w-4 text-gray-400"
                          role="img"
                          viewBox="0 0 512 512"
                          aria-hidden="true"
                        >
                          <path
                            fill="currentColor"
                            d="M378.9 80c-27.3 0-53 13.1-69 35.2l-34.4 47.6c-4.5 6.2-11.7 9.9-19.4 9.9s-14.9-3.7-19.4-9.9l-34.4-47.6c-16-22.1-41.7-35.2-69-35.2-47 0-85.1 38.1-85.1 85.1 0 49.9 32 98.4 68.1 142.3 41.1 50 91.4 94 125.9 120.3 3.2 2.4 7.9 4.2 14 4.2s10.8-1.8 14-4.2c34.5-26.3 84.8-70.4 125.9-120.3 36.2-43.9 68.1-92.4 68.1-142.3 0-47-38.1-85.1-85.1-85.1zM271 87.1c25-34.6 65.2-55.1 107.9-55.1 73.5 0 133.1 59.6 133.1 133.1 0 68.6-42.9 128.9-79.1 172.8-44.1 53.6-97.3 100.1-133.8 127.9-12.3 9.4-27.5 14.1-43.1 14.1s-30.8-4.7-43.1-14.1C176.4 438 123.2 391.5 79.1 338 42.9 294.1 0 233.7 0 165.1 0 91.6 59.6 32 133.1 32 175.8 32 216 52.5 241 87.1l15 20.7 15-20.7z"
                          />
                        </svg>
                        My Wishlist
                      </Link>
                      <Link
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                        href="/profile/addresses"
                      >
                        <svg
                          data-prefix="far"
                          data-icon="address-book"
                          className="svg-inline--fa fa-address-book w-4 text-gray-400"
                          role="img"
                          viewBox="0 0 512 512"
                          aria-hidden="true"
                        >
                          <path
                            fill="currentColor"
                            d="M384 48c8.8 0 16 7.2 16 16l0 384c0 8.8-7.2 16-16 16L96 464c-8.8 0-16-7.2-16-16L80 64c0-8.8 7.2-16 16-16l288 0zM96 0C60.7 0 32 28.7 32 64l0 384c0 35.3 28.7 64 64 64l288 0c35.3 0 64-28.7 64-64l0-384c0-35.3-28.7-64-64-64L96 0zM240 248a56 56 0 1 0 0-112 56 56 0 1 0 0 112zm-32 40c-44.2 0-80 35.8-80 80 0 8.8 7.2 16 16 16l192 0c8.8 0 16-7.2 16-16 0-44.2-35.8-80-80-80l-64 0zM512 80c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64zM496 192c-8.8 0-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64c0-8.8-7.2-16-16-16zm16 144c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64z"
                          />
                        </svg>
                        Addresses
                      </Link>
                      <Link
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                        href="/profile/settings"
                      >
                        <svg
                          data-prefix="fas"
                          data-icon="gear"
                          className="svg-inline--fa fa-gear w-4 text-gray-400"
                          role="img"
                          viewBox="0 0 512 512"
                          aria-hidden="true"
                        >
                          <path
                            fill="currentColor"
                            d="M195.1 9.5C198.1-5.3 211.2-16 226.4-16l59.8 0c15.2 0 28.3 10.7 31.3 25.5L332 79.5c14.1 6 27.3 13.7 39.3 22.8l67.8-22.5c14.4-4.8 30.2 1.2 37.8 14.4l29.9 51.8c7.6 13.2 4.9 29.8-6.5 39.9L447 233.3c.9 7.4 1.3 15 1.3 22.7s-.5 15.3-1.3 22.7l53.4 47.5c11.4 10.1 14 26.8 6.5 39.9l-29.9 51.8c-7.6 13.1-23.4 19.2-37.8 14.4l-67.8-22.5c-12.1 9.1-25.3 16.7-39.3 22.8l-14.4 69.9c-3.1 14.9-16.2 25.5-31.3 25.5l-59.8 0c-15.2 0-28.3-10.7-31.3-25.5l-14.4-69.9c-14.1-6-27.2-13.7-39.3-22.8L73.5 432.3c-14.4 4.8-30.2-1.2-37.8-14.4L5.8 366.1c-7.6-13.2-4.9-29.8 6.5-39.9l53.4-47.5c-.9-7.4-1.3-15-1.3-22.7s.5-15.3 1.3-22.7L12.3 185.8c-11.4-10.1-14-26.8-6.5-39.9L35.7 94.1c7.6-13.2 23.4-19.2 37.8-14.4l67.8 22.5c12.1-9.1 25.3-16.7 39.3-22.8L195.1 9.5zM256.3 336a80 80 0 1 0 -.6-160 80 80 0 1 0 .6 160z"
                          />
                        </svg>
                        Settings
                      </Link>
                    </div>
                    <div className="border-t border-gray-100 py-2"></div>
                  </div>
                </div>
                {status === "unauthenticated" && (
                  <Link
                    href="/signin"
                    className="hidden lg:flex items-center gap-2 ml-2 px-6 py-2.5 rounded-full bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold transition-all hover:shadow-lg hover:shadow-primary-600/30 active:scale-95 group"
                  >
                    <LuUserRound />
                    <span>Sign In</span>
                  </Link>
                )}

                <button
                  onClick={() => setMenu(!menu)}
                  className="lg:hidden ml-1 w-10 h-10 rounded-full bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center transition-colors"
                >
                  <TiThMenu />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Navigation */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${menu ? "visible" : "invisible pointer-events-none"}`}
      >
        {/* Backdrop - الخلفية المظلمة */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            menu ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenu(false)}
        />

        {/* Sidebar Content - القائمة الجانبية */}
        <aside
          className={`absolute right-0 top-0 h-full w-[280px] bg-white shadow-2xl transition-transform duration-300 transform ${
            menu ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
              <div className="w-32">{logo}</div>
              <button
                onClick={() => setMenu(false)}
                className="text-gray-500 text-2xl p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FiX />
              </button>
            </div>

            {/* Search in Mobile */}
            <form className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 text-sm"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-primary-600 text-white flex items-center justify-center">
                  <IoSearch size={18} />
                </button>
              </div>
            </form>

            <nav className="flex flex-col gap-4">
              {[
                { name: "Home", href: "/" },
                { name: "Shop", href: "/products" },
                { name: "Categories", href: "/categories" },
                { name: "Brands", href: "/brands" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenu(false)}
                  className={`text-lg font-semibold py-2 transition-colors ${
                    path === link.href ? "text-primary-600" : "text-gray-700"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            {status == "unauthenticated" ? (
              <div className="mt-auto pt-6 border-t border-gray-100">
                <Link
                  href="/signin"
                  onClick={() => setMenu(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-primary-600 text-white font-bold shadow-md active:scale-95 transition-transform"
                >
                  <LuUserRound size={20} />
                  Sign In
                </Link>
              </div>
            ) : (
              <div className="mt-auto pt-6 border-t border-gray-100">
                <button
                  onClick={() => handleSignout()}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-red-600 text-white font-bold shadow-md active:scale-95 transition-transform"
                >
                  <ImExit size={20} />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </aside>
      </div>
    </>
  );
}

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import SidebarNav from './SidebarNav';
import WelcomeHero from './WelcomeHero';
import { navigationCards } from './WelcomePage';
import SiteHeader from './SiteHeader';

const heroItemIcons = {
  'welcome/send-overview': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M19,5V7H15V5H19M9,5V11H5V5H9M19,13V19H15V13H19M9,17V19H5V17H9M21,3H13V9H21V3M11,3H3V13H11V3M21,11H13V21H21V11M11,15H3V21H11V15Z" fill="#1C1B1F"/>
    </svg>
  ),
  'welcome/problem-statement': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" fill="#1C1B1F"/>
    </svg>
  ),
  'welcome/mission-vision-values': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21 6.5C19.3 6.5 18 7.8 18 9.5V9.7L16 10.4C15.4 9.2 14.2 8.3 12.8 8.1V5.9C14 5.6 15 4.4 15 3C15 1.3 13.7 0 12 0S9 1.3 9 3C9 4.4 10 5.6 11.2 5.9V8.1C9.9 8.3 8.7 9.2 8 10.4L6 9.7V9.5C6 7.8 4.7 6.5 3 6.5S0 7.8 0 9.5 1.3 12.5 3 12.5C4.1 12.5 5 11.9 5.5 11.1L7.5 11.8C7.3 13.1 7.7 14.5 8.6 15.5L7.2 17.3C6.8 17.1 6.4 17 6 17C4.3 17 3 18.3 3 20S4.3 23 6 23 9 21.7 9 20C9 19.3 8.8 18.7 8.4 18.2L9.8 16.4C11.2 17.2 12.8 17.2 14.2 16.4L15.6 18.2C15.2 18.7 15 19.3 15 20C15 21.7 16.3 23 18 23S21 21.7 21 20 19.7 17 18 17C17.6 17 17.1 17.1 16.8 17.3L15.4 15.5C16.3 14.5 16.7 13.1 16.5 11.8L18.5 11.1C19 11.9 20 12.5 21 12.5C22.7 12.5 24 11.2 24 9.5S22.7 6.5 21 6.5M3 10.5C2.5 10.5 2 10.1 2 9.5S2.5 8.5 3 8.5 4 8.9 4 9.5 3.5 10.5 3 10.5M6 21C5.4 21 5 20.5 5 20S5.4 19 6 19 7 19.5 7 20 6.6 21 6 21M11 3C11 2.5 11.4 2 12 2S13 2.5 13 3 12.6 4 12 4 11 3.5 11 3M12 15C10.6 15 9.5 13.9 9.5 12.5S10.6 10 12 10 14.5 11.1 14.5 12.5 13.4 15 12 15M18 19C18.5 19 19 19.5 19 20S18.5 21 18 21 17 20.5 17 20 17.5 19 18 19M21 10.5C20.5 10.5 20 10.1 20 9.5S20.5 8.5 21 8.5 22 8.9 22 9.5 21.5 10.5 21 10.5Z" fill="#1C1B1F"/>
    </svg>
  ),
  'welcome/team': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M13.07 10.41A5 5 0 0 0 13.07 4.59A3.39 3.39 0 0 1 15 4A3.5 3.5 0 0 1 15 11A3.39 3.39 0 0 1 13.07 10.41M5.5 7.5A3.5 3.5 0 1 1 9 11A3.5 3.5 0 0 1 5.5 7.5M7.5 7.5A1.5 1.5 0 1 0 9 6A1.5 1.5 0 0 0 7.5 7.5M16 17V19H2V17S2 13 9 13 16 17 16 17M14 17C13.86 16.22 12.67 15 9 15S4.07 16.31 4 17M15.95 13A5.32 5.32 0 0 1 18 17V19H22V17S22 13.37 15.94 13Z" fill="#1C1B1F"/>
    </svg>
  ),
  'welcome/contact': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12,15C12.81,15 13.5,14.7 14.11,14.11C14.7,13.5 15,12.81 15,12C15,11.19 14.7,10.5 14.11,9.89C13.5,9.3 12.81,9 12,9C11.19,9 10.5,9.3 9.89,9.89C9.3,10.5 9,11.19 9,12C9,12.81 9.3,13.5 9.89,14.11C10.5,14.7 11.19,15 12,15M12,2C14.75,2 17.1,3 19.05,4.95C21,6.9 22,9.25 22,12V13.45C22,14.45 21.65,15.3 21,16C20.3,16.67 19.5,17 18.5,17C17.3,17 16.31,16.5 15.56,15.5C14.56,16.5 13.38,17 12,17C10.63,17 9.45,16.5 8.46,15.54C7.5,14.55 7,13.38 7,12C7,10.63 7.5,9.45 8.46,8.46C9.45,7.5 10.63,7 12,7C13.38,7 14.55,7.5 15.54,8.46C16.5,9.45 17,10.63 17,12V13.45C17,13.86 17.16,14.22 17.46,14.53C17.76,14.84 18.11,15 18.5,15C18.92,15 19.27,14.84 19.57,14.53C19.87,14.22 20,13.86 20,13.45V12C20,9.81 19.23,7.93 17.65,6.35C16.07,4.77 14.19,4 12,4C9.81,4 7.93,4.77 6.35,6.35C4.77,7.93 4,9.81 4,12C4,14.19 4.77,16.07 6.35,17.65C7.93,19.23 9.81,20 12,20H17V22H12C9.25,22 6.9,21 4.95,19.05C3,17.1 2,14.75 2,12C2,9.25 3,6.9 4.95,4.95C6.9,3 9.25,2 12,2Z" fill="#1C1B1F"/>
    </svg>
  ),
  'send-token/send-token-overview': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M19,5V7H15V5H19M9,5V11H5V5H9M19,13V19H15V13H19M9,17V19H5V17H9M21,3H13V9H21V3M11,3H3V13H11V3M21,11H13V21H21V11M11,15H3V21H11V15Z" fill="#1C1B1F"/>
    </svg>
  ),
  'send-token/tokenomics': (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="18" fill="#041814" />
      <path d="M24 12C29.523 12 34 16.477 34 22C34 27.523 29.523 32 24 32" stroke="#40FB50" strokeWidth="3" strokeLinecap="round" />
      <path d="M24 36C18.477 36 14 31.523 14 26C14 20.477 18.477 16 24 16" stroke="#87B7A8" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  'send-token/distribution': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3,22V8H7V22H3M10,22V2H14V22H10M17,22V14H21V22H17Z" fill="#1C1B1F"/>
    </svg>
  ),
  'send-token/faqs': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M13 18H11V16H13V18M13 15H11C11 11.75 14 12 14 10C14 8.9 13.1 8 12 8C10.9 8 10 8.9 10 10H8C8 7.79 9.79 6 12 6C14.21 6 16 7.79 16 10C16 12.5 13 12.75 13 15M22 12C22 17.18 18.05 21.45 13 21.95V19.94C16.95 19.45 20 16.08 20 12C20 7.92 16.95 4.55 13 4.06V2.05C18.05 2.55 22 6.82 22 12M11 2.05V4.06C9.54 4.24 8.2 4.82 7.09 5.68L5.67 4.26C7.15 3.05 9 2.25 11 2.05M4.06 11H2.05C2.25 9 3.05 7.15 4.26 5.67L5.68 7.1C4.82 8.2 4.24 9.54 4.06 11M11 19.94V21.95C9 21.75 7.15 20.96 5.67 19.74L7.09 18.32C8.2 19.18 9.54 19.76 11 19.94M2.05 13H4.06C4.24 14.46 4.82 15.8 5.68 16.91L4.26 18.33C3.05 16.85 2.25 15 2.05 13Z" fill="#1C1B1F"/>
    </svg>
  ),
  'send-token/bridge': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9,3L5,7H8V14H10V7H13M16,17V10H14V17H11L15,21L19,17H16Z" fill="#1C1B1F"/>
    </svg>
  ),
  'send-token/upgrade': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2,20V22H22V20H13V5.83L18.5,11.33L19.92,9.92L12,2L4.08,9.92L5.5,11.33L11,5.83V20H2Z" fill="#1C1B1F"/>
    </svg>
  ),
  'send-mobile-apps/faqs': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M13 18H11V16H13V18M13 15H11C11 11.75 14 12 14 10C14 8.9 13.1 8 12 8C10.9 8 10 8.9 10 10H8C8 7.79 9.79 6 12 6C14.21 6 16 7.79 16 10C16 12.5 13 12.75 13 15M22 12C22 17.18 18.05 21.45 13 21.95V19.94C16.95 19.45 20 16.08 20 12C20 7.92 16.95 4.55 13 4.06V2.05C18.05 2.55 22 6.82 22 12M11 2.05V4.06C9.54 4.24 8.2 4.82 7.09 5.68L5.67 4.26C7.15 3.05 9 2.25 11 2.05M4.06 11H2.05C2.25 9 3.05 7.15 4.26 5.67L5.68 7.1C4.82 8.2 4.24 9.54 4.06 11M11 19.94V21.95C9 21.75 7.15 20.96 5.67 19.74L7.09 18.32C8.2 19.18 9.54 19.76 11 19.94M2.05 13H4.06C4.24 14.46 4.82 15.8 5.68 16.91L4.26 18.33C3.05 16.85 2.25 15 2.05 13Z" fill="#1C1B1F"/>
    </svg>
  ),
  'send-mobile-apps/features': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M16,20H20V16H16M16,14H20V10H16M10,8H14V4H10M16,8H20V4H16M10,14H14V10H10M4,14H8V10H4M4,20H8V16H4M10,20H14V16H10M4,8H8V4H4V8Z" fill="#1C1B1F"/>
    </svg>
  ),
  'send-mobile-apps/overview': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M19,5V7H15V5H19M9,5V11H5V5H9M19,13V19H15V13H19M9,17V19H5V17H9M21,3H13V9H21V3M11,3H3V13H11V3M21,11H13V21H21V11M11,15H3V21H11V15Z" fill="#1C1B1F"/>
    </svg>
  ),
  'canton-wallet/overview': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M19,5V7H15V5H19M9,5V11H5V5H9M19,13V19H15V13H19M9,17V19H5V17H9M21,3H13V9H21V3M11,3H3V13H11V3M21,11H13V21H21V11M11,15H3V21H11V15Z" fill="#1C1B1F"/>
    </svg>
  ),
  'cusd-stablecoin/overview': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M19,5V7H15V5H19M9,5V11H5V5H9M19,13V19H15V13H19M9,17V19H5V17H9M21,3H13V9H21V3M11,3H3V13H11V3M21,11H13V21H21V11M11,15H3V21H11V15Z" fill="#1C1B1F"/>
    </svg>
  ),
  'cusd-stablecoin/reserves-report': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" fill="#1C1B1F"/>
    </svg>
  ),
  'cusd-stablecoin/faqs': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M13 18H11V16H13V18M13 15H11C11 11.75 14 12 14 10C14 8.9 13.1 8 12 8C10.9 8 10 8.9 10 10H8C8 7.79 9.79 6 12 6C14.21 6 16 7.79 16 10C16 12.5 13 12.75 13 15M22 12C22 17.18 18.05 21.45 13 21.95V19.94C16.95 19.45 20 16.08 20 12C20 7.92 16.95 4.55 13 4.06V2.05C18.05 2.55 22 6.82 22 12M11 2.05V4.06C9.54 4.24 8.2 4.82 7.09 5.68L5.67 4.26C7.15 3.05 9 2.25 11 2.05M4.06 11H2.05C2.25 9 3.05 7.15 4.26 5.67L5.68 7.1C4.82 8.2 4.24 9.54 4.06 11M11 19.94V21.95C9 21.75 7.15 20.96 5.67 19.74L7.09 18.32C8.2 19.18 9.54 19.76 11 19.94M2.05 13H4.06C4.24 14.46 4.82 15.8 5.68 16.91L4.26 18.33C3.05 16.85 2.25 15 2.05 13Z" fill="#1C1B1F"/>
    </svg>
  ),
  'canton-wallet/passkeys': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M17.81,4.47C17.73,4.47 17.65,4.45 17.58,4.41C15.66,3.42 14,3 12,3C10.03,3 8.15,3.47 6.44,4.41C6.2,4.54 5.9,4.45 5.76,4.21C5.63,3.97 5.72,3.66 5.96,3.53C7.82,2.5 9.86,2 12,2C14.14,2 16,2.47 18.04,3.5C18.29,3.65 18.38,3.95 18.25,4.19C18.16,4.37 18,4.47 17.81,4.47M3.5,9.72C3.4,9.72 3.3,9.69 3.21,9.63C3,9.47 2.93,9.16 3.09,8.93C4.08,7.53 5.34,6.43 6.84,5.66C10,4.04 14,4.03 17.15,5.65C18.65,6.42 19.91,7.5 20.9,8.9C21.06,9.12 21,9.44 20.78,9.6C20.55,9.76 20.24,9.71 20.08,9.5C19.18,8.22 18.04,7.23 16.69,6.54C13.82,5.07 10.15,5.07 7.29,6.55C5.93,7.25 4.79,8.25 3.89,9.5C3.81,9.65 3.66,9.72 3.5,9.72M9.75,21.79C9.62,21.79 9.5,21.74 9.4,21.64C8.53,20.77 8.06,20.21 7.39,19C6.7,17.77 6.34,16.27 6.34,14.66C6.34,11.69 8.88,9.27 12,9.27C15.12,9.27 17.66,11.69 17.66,14.66A0.5,0.5 0 0,1 17.16,15.16A0.5,0.5 0 0,1 16.66,14.66C16.66,12.24 14.57,10.27 12,10.27C9.43,10.27 7.34,12.24 7.34,14.66C7.34,16.1 7.66,17.43 8.27,18.5C8.91,19.66 9.35,20.15 10.12,20.93C10.31,21.13 10.31,21.44 10.12,21.64C10,21.74 9.88,21.79 9.75,21.79M16.92,19.94C15.73,19.94 14.68,19.64 13.82,19.05C12.33,18.04 11.44,16.4 11.44,14.66A0.5,0.5 0 0,1 11.94,14.16A0.5,0.5 0 0,1 12.44,14.66C12.44,16.07 13.16,17.4 14.38,18.22C15.09,18.7 15.92,18.93 16.92,18.93C17.16,18.93 17.56,18.9 17.96,18.83C18.23,18.78 18.5,18.96 18.54,19.24C18.59,19.5 18.41,19.77 18.13,19.82C17.56,19.93 17.06,19.94 16.92,19.94M14.91,22C14.87,22 14.82,22 14.78,22C13.19,21.54 12.15,20.95 11.06,19.88C9.66,18.5 8.89,16.64 8.89,14.66C8.89,13.04 10.27,11.72 11.97,11.72C13.67,11.72 15.05,13.04 15.05,14.66C15.05,15.73 16,16.6 17.13,16.6C18.28,16.6 19.21,15.73 19.21,14.66C19.21,10.89 15.96,7.83 11.96,7.83C9.12,7.83 6.5,9.41 5.35,11.86C4.96,12.67 4.76,13.62 4.76,14.66C4.76,15.44 4.83,16.67 5.43,18.27C5.53,18.53 5.4,18.82 5.14,18.91C4.88,19 4.59,18.87 4.5,18.62C4,17.31 3.77,16 3.77,14.66C3.77,13.46 4,12.37 4.45,11.42C5.78,8.63 8.73,6.82 11.96,6.82C16.5,6.82 20.21,10.33 20.21,14.65C20.21,16.27 18.83,17.59 17.13,17.59C15.43,17.59 14.05,16.27 14.05,14.65C14.05,13.58 13.12,12.71 11.97,12.71C10.82,12.71 9.89,13.58 9.89,14.65C9.89,16.36 10.55,17.96 11.76,19.16C12.71,20.1 13.62,20.62 15.03,21C15.3,21.08 15.45,21.36 15.38,21.62C15.33,21.85 15.12,22 14.91,22Z" fill="#1C1B1F"/>
    </svg>
  ),
  'canton-wallet/wallet-maintenance': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M22.61,19L13.53,9.91C14.46,7.57 14,4.81 12.09,2.91C9.79,0.61 6.21,0.4 3.66,2.26L7.5,6.11L6.08,7.5L2.25,3.69C0.39,6.23 0.6,9.82 2.9,12.11C4.76,13.97 7.47,14.46 9.79,13.59L18.9,22.7C19.29,23.09 19.92,23.09 20.31,22.7L22.61,20.4C23,20 23,19.39 22.61,19M19.61,20.59L10.15,11.13C9.54,11.58 8.86,11.85 8.15,11.95C6.79,12.15 5.36,11.74 4.32,10.7C3.37,9.76 2.93,8.5 3,7.26L6.09,10.35L10.33,6.11L7.24,3C8.5,2.95 9.73,3.39 10.68,4.33C11.76,5.41 12.17,6.9 11.92,8.29C11.8,9 11.5,9.66 11.04,10.25L20.5,19.7L19.61,20.59Z" fill="#1C1B1F"/>
    </svg>
  ),
  'canton-wallet/safe': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12,12H19C18.47,16.11 15.72,19.78 12,20.92V12H5V6.3L12,3.19M12,1L3,5V11C3,16.55 6.84,21.73 12,23C17.16,21.73 21,16.55 21,11V5L12,1Z" fill="#1C1B1F"/>
    </svg>
  ),
  'canton-wallet/canton-coin-rewards': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8.58,17.25L9.5,13.36L6.5,10.78L10.45,10.41L12,6.8L13.55,10.45L17.5,10.78L14.5,13.36L15.42,17.25L12,15.19L8.58,17.25M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z" fill="#1C1B1F"/>
    </svg>
  ),
  'finance/multisigs': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21 18H15V15H13.3C12.2 17.4 9.7 19 7 19C3.1 19 0 15.9 0 12S3.1 5 7 5C9.7 5 12.2 6.6 13.3 9H24V15H21V18M17 16H19V13H22V11H11.9L11.7 10.3C11 8.3 9.1 7 7 7C4.2 7 2 9.2 2 12S4.2 17 7 17C9.1 17 11 15.7 11.7 13.7L11.9 13H17V16M7 15C5.3 15 4 13.7 4 12S5.3 9 7 9 10 10.3 10 12 8.7 15 7 15M7 11C6.4 11 6 11.4 6 12S6.4 13 7 13 8 12.6 8 12 7.6 11 7 11Z" fill="#1C1B1F"/>
    </svg>
  ),
  'finance/token-emissions': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21,9L17,5V8H10V10H17V13M7,11L3,15L7,19V16H14V14H7V11Z" fill="#1C1B1F"/>
    </svg>
  ),
  'finance/treasury': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6.5,10H4.5V17H6.5V10M12.5,10H10.5V17H12.5V10M21,19H2V21H21V19M18.5,10H16.5V17H18.5V10M11.5,3.26L16.71,6H6.29L11.5,3.26M11.5,1L2,6V8H21V6L11.5,1Z" fill="#1C1B1F"/>
    </svg>
  ),
  'finance/funding-rounds': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3,14L3.5,14.07L8.07,9.5C7.89,8.85 8.06,8.11 8.59,7.59C9.37,6.8 10.63,6.8 11.41,7.59C11.94,8.11 12.11,8.85 11.93,9.5L14.5,12.07L15,12C15.18,12 15.35,12 15.5,12.07L19.07,8.5C19,8.35 19,8.18 19,8A2,2 0 0,1 21,6A2,2 0 0,1 23,8A2,2 0 0,1 21,10C20.82,10 20.65,10 20.5,9.93L16.93,13.5C17,13.65 17,13.82 17,14A2,2 0 0,1 15,16A2,2 0 0,1 13,14L13.07,13.5L10.5,10.93C10.18,11 9.82,11 9.5,10.93L4.93,15.5L5,16A2,2 0 0,1 3,18A2,2 0 0,1 1,16A2,2 0 0,1 3,14Z" fill="#1C1B1F"/>
    </svg>
  ),
  'finance/revenue': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21,4H16V20H21V4M14,9H9V20H14V9M7,14H2V20H7V14Z" fill="#1C1B1F"/>
    </svg>
  ),
  'finance/business-models': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5,8A4,4 0 0,1 9,12A4,4 0 0,1 5,16A4,4 0 0,1 1,12A4,4 0 0,1 5,8M5,10A2,2 0 0,0 3,12A2,2 0 0,0 5,14A2,2 0 0,0 7,12A2,2 0 0,0 5,10M12,1A4,4 0 0,1 16,5A4,4 0 0,1 12,9A4,4 0 0,1 8,5A4,4 0 0,1 12,1M12,3A2,2 0 0,0 10,5A2,2 0 0,0 12,7A2,2 0 0,0 14,5A2,2 0 0,0 12,3M12,15A4,4 0 0,1 16,19A4,4 0 0,1 12,23A4,4 0 0,1 8,19A4,4 0 0,1 12,15M12,17A2,2 0 0,0 10,19A2,2 0 0,0 12,21A2,2 0 0,0 14,19A2,2 0 0,0 12,17M19,8A4,4 0 0,1 23,12A4,4 0 0,1 19,16A4,4 0 0,1 15,12A4,4 0 0,1 19,8M19,10A2,2 0 0,0 17,12A2,2 0 0,0 19,14A2,2 0 0,0 21,12A2,2 0 0,0 19,10Z" fill="#1C1B1F"/>
    </svg>
  ),
  'miscellaneous/roadmap': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M23,12L19,16V13H6.83C6.42,14.17 5.31,15 4,15A3,3 0 0,1 1,12A3,3 0 0,1 4,9C5.31,9 6.42,9.83 6.83,11H19V8L23,12Z" fill="#1C1B1F"/>
    </svg>
  ),
  'miscellaneous/send-metrics': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21,4H16V20H21V4M14,9H9V20H14V9M7,14H2V20H7V14Z" fill="#1C1B1F"/>
    </svg>
  ),
  'miscellaneous/intellectual-property': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M23 12L20.6 9.2L20.9 5.5L17.3 4.7L15.4 1.5L12 3L8.6 1.5L6.7 4.7L3.1 5.5L3.4 9.2L1 12L3.4 14.8L3.1 18.5L6.7 19.3L8.6 22.5L12 21L15.4 22.5L17.3 19.3L20.9 18.5L20.6 14.8L23 12M18.7 16.9L16 17.5L14.6 19.9L12 18.8L9.4 19.9L8 17.5L5.3 16.9L5.5 14.1L3.7 12L5.5 9.9L5.3 7.1L8 6.5L9.4 4.1L12 5.2L14.6 4.1L16 6.5L18.7 7.1L18.5 9.9L20.3 12L18.5 14.1L18.7 16.9M16.6 7.6L18 9L10 17L6 13L7.4 11.6L10 14.2L16.6 7.6Z" fill="#1C1B1F"/>
    </svg>
  ),
  'miscellaneous/send-contract-addresses': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M18.17,12L15,8.83L16.41,7.41L21,12L16.41,16.58L15,15.17L18.17,12M5.83,12L9,15.17L7.59,16.59L3,12L7.59,7.42L9,8.83L5.83,12Z" fill="#1C1B1F"/>
    </svg>
  ),
  'miscellaneous/brand-links-assets': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M11.14 4L6.43 16H8.36L9.32 13.43H14.67L15.64 16H17.57L12.86 4M12 6.29L14.03 11.71H9.96M4 18V15H2V20H22V18Z" fill="#1C1B1F"/>
    </svg>
  ),
  'miscellaneous/glossary': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7V19H19V21H4C2 21 2 19 2 19V7H4M21 5V15H8V5H21M21.3 3H7.7C6.76 3 6 3.7 6 4.55V15.45C6 16.31 6.76 17 7.7 17H21.3C22.24 17 23 16.31 23 15.45V4.55C23 3.7 22.24 3 21.3 3M9 6H12V11H9V6M20 14H9V12H20V14M20 8H14V6H20V8M20 11H14V9H20V11Z" fill="#1C1B1F"/>
    </svg>
  ),
  'legal/affiliate-marketing-disclaimer': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21.71 8.71C22.96 7.46 22.39 6 21.71 5.29L18.71 2.29C17.45 1.04 16 1.61 15.29 2.29L13.59 4H11C9.1 4 8 5 7.44 6.15L3 10.59V14.59L2.29 15.29C1.04 16.55 1.61 18 2.29 18.71L5.29 21.71C5.83 22.25 6.41 22.45 6.96 22.45C7.67 22.45 8.32 22.1 8.71 21.71L11.41 19H15C16.7 19 17.56 17.94 17.87 16.9C19 16.6 19.62 15.74 19.87 14.9C21.42 14.5 22 13.03 22 12V9H21.41L21.71 8.71M20 12C20 12.45 19.81 13 19 13L18 13L18 14C18 14.45 17.81 15 17 15L16 15L16 16C16 16.45 15.81 17 15 17H10.59L7.31 20.28C7 20.57 6.82 20.4 6.71 20.29L3.72 17.31C3.43 17 3.6 16.82 3.71 16.71L5 15.41V11.41L7 9.41V11C7 12.21 7.8 14 10 14S13 12.21 13 11H20V12M20.29 7.29L18.59 9H11V11C11 11.45 10.81 12 10 12S9 11.45 9 11V8C9 7.54 9.17 6 11 6H14.41L16.69 3.72C17 3.43 17.18 3.6 17.29 3.71L20.28 6.69C20.57 7 20.4 7.18 20.29 7.29Z" fill="#1C1B1F"/>
    </svg>
  ),
  'legal/disclaimer': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" fill="#1C1B1F"/>
    </svg>
  ),
  'legal/licenses': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8,9A2,2 0 0,1 10,11A2,2 0 0,1 8,13A2,2 0 0,1 6,11A2,2 0 0,1 8,9M12,17H4V16C4,14.67 6.67,14 8,14C9.33,14 12,14.67 12,16V17M20,8H14V10H20V8M20,12H14V14H20V12M20,16H14V18H20V16M22,4H14V6H22V20H2V6H10V4H2A2,2 0 0,0 0,6V20A2,2 0 0,0 2,22H22A2,2 0 0,0 24,20V6A2,2 0 0,0 22,4M13,6H11V2H13V6Z" fill="#1C1B1F"/>
    </svg>
  ),
  'legal/prohibited-activities': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8.27,3L3,8.27V15.73L8.27,21H15.73C17.5,19.24 21,15.73 21,15.73V8.27L15.73,3M9.1,5H14.9L19,9.1V14.9L14.9,19H9.1L5,14.9V9.1M9.12,7.71L7.71,9.12L10.59,12L7.71,14.88L9.12,16.29L12,13.41L14.88,16.29L16.29,14.88L13.41,12L16.29,9.12L14.88,7.71L12,10.59" fill="#1C1B1F"/>
    </svg>
  ),
  'legal/terms-of-service': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ transform: 'scaleX(-1)' }}>
      <path d="M2.3,20.28L11.9,10.68L10.5,9.26L9.78,9.97C9.39,10.36 8.76,10.36 8.37,9.97L7.66,9.26C7.27,8.87 7.27,8.24 7.66,7.85L13.32,2.19C13.71,1.8 14.34,1.8 14.73,2.19L15.44,2.9C15.83,3.29 15.83,3.92 15.44,4.31L14.73,5L16.15,6.43C16.54,6.04 17.17,6.04 17.56,6.43C17.95,6.82 17.95,7.46 17.56,7.85L18.97,9.26L19.68,8.55C20.07,8.16 20.71,8.16 21.1,8.55L21.8,9.26C22.19,9.65 22.19,10.29 21.8,10.68L16.15,16.33C15.76,16.72 15.12,16.72 14.73,16.33L14.03,15.63C13.63,15.24 13.63,14.6 14.03,14.21L14.73,13.5L13.32,12.09L3.71,21.7C3.32,22.09 2.69,22.09 2.3,21.7C1.91,21.31 1.91,20.67 2.3,20.28M20,19A2,2 0 0,1 22,21V22H12V21A2,2 0 0,1 14,19H20Z" fill="#1C1B1F"/>
    </svg>
  ),
  'legal/privacy-policy': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12,17C10.89,17 10,16.1 10,15C10,13.89 10.89,13 12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17M18,20V10H6V20H18M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10C4,8.89 4.89,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" fill="#1C1B1F"/>
    </svg>
  )
};

export default function DocsLayout({ children, treeData, headings = [] }) {
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Extract page info from pathname
  const pathParts = pathname.split('/').filter(Boolean);
  const isRoot = pathParts.length === 0;
  const isDocsRoute = pathParts[0] === 'docs';
  const section = isRoot ? 'welcome' : (isDocsRoute ? pathParts[1] : 'welcome');
  const pageParts = isDocsRoute ? pathParts.slice(2) : [];
  const page = pageParts.length ? pageParts.join('/') : null;
  const isSectionLanding = isDocsRoute && pathParts.length === 2;
  const isFeaturePage = section === 'features';
  const effectiveSection = isFeaturePage ? 'send-mobile-apps' : section;
  
  const sectionLabels = {
    'welcome': 'Send Foundation',
    'send-token': 'Send Token',
    'send-mobile-apps': 'Send App',
    'send-safe': 'Send Safe',
    'cusd-stablecoin': 'CUSD Stablecoin',
    'finance': 'Finance',
    'miscellaneous': 'Miscellaneous',
    'legal': 'Legal'
  };
  
  const pageLabels = {
    'send-overview': 'Overview',
    'problem-statement': 'Problem Statement',
    'mission-vision-values': 'Core Values',
    'team': 'Team',
    'contact': 'Contact'
  };
  
  const sectionLabel = isRoot ? 'Welcome' : (sectionLabels[effectiveSection] || effectiveSection?.replace(/-/g, ' ') || 'Welcome');
  const pageLabel = page ? (pageLabels[page] || page.replace(/-/g, ' ')) : '';
  const currentId = page ? `${section}/${page}` : null;
  const currentSectionItems = (treeData && section && treeData[section]) ? treeData[section] : [];
  const currentItem = currentId ? currentSectionItems.find((it) => it.id === currentId) : null;
  const currentPageTitle = currentItem?.title || pageLabel;
  const effectiveSectionItems = (treeData && effectiveSection && treeData[effectiveSection]) ? treeData[effectiveSection] : [];
  const sectionLandingPath = section ? `/docs/${section}` : null;
  const shouldShowHero = isRoot || isSectionLanding;
  const heroConfigMap = {
    root: { image: '/img/yourprivateneobank.png', aria: 'Your private neobank - Send' },
    welcome: { image: '/img/privatebydefault.png', aria: 'Private by default - Send Foundation' },
    'send-token': { image: '/img/send-token-banner.png', aria: 'Send Token documentation banner' },
    'send-mobile-apps': { image: '/img/globalbynature.png', aria: 'Global by nature - Send App' },
    'send-safe': { image: '/img/theprivacyfirstwallet.png', aria: 'The privacy first wallet - Send Safe' },
    'cusd-stablecoin': { image: '/img/cusd-banner.png', aria: 'CUSD stablecoin overview banner' },
    finance: { image: '/img/futurecash.png', aria: 'Future cash - Finance' },
    miscellaneous: { image: '/img/thefutureofmoney.png', aria: 'The future of money - Miscellaneous' },
    legal: { image: '/img/stayingtransparent.png', aria: 'Staying transparent - Legal' }
  };
  const heroConfig = isRoot ? heroConfigMap.root : (heroConfigMap[effectiveSection] || { image: '/img/globalwallet.png', aria: `${sectionLabel} hero` });

  const heroCards = useMemo(() => {
    if (!shouldShowHero) return [];
    if (isRoot) return navigationCards;
    return effectiveSectionItems.map((item) => {
      const titleText = item.title;
      const href = `/docs/${item.id}`;
      const initial = titleText.charAt(0).toUpperCase();
      return {
        id: item.id,
        href,
        title: titleText,
        icon: (
          heroItemIcons[item.id] || (
            <span className="nav-card-initial" aria-hidden="true">
              {initial}
            </span>
          )
        )
      };
    });
  }, [shouldShowHero, isRoot, effectiveSectionItems]);

  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [pathname]);

  return (
    <div className={`docs-shell ${isMobileNavOpen ? 'mobile-nav-open' : ''}`}>
      <SidebarNav
        treeData={treeData}
        isMobileOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
      {isMobileNavOpen && (
        <button
          type="button"
          className="mobile-nav-overlay"
          aria-label="Close menu"
          onClick={() => setIsMobileNavOpen(false)}
        />
      )}
      <div className="content-panel">
        <div className="main-content">
          <div className="mobile-header">
            <SiteHeader />
            <button
              type="button"
              className="mobile-nav-toggle"
              aria-label="Open menu"
              onClick={() => setIsMobileNavOpen(true)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
          {shouldShowHero && (
            <>
              <div className="welcome-header">
                <div className="welcome-title">{sectionLabel}</div>
              </div>
              <WelcomeHero backgroundImage={heroConfig.image} ariaLabel={heroConfig.aria} />
              {heroCards.length > 0 && (
                <div className={`navigation-grid ${isRoot ? 'grid-2-col' : 'grid-3-col'}`}>
                  {heroCards.map((card) => (
                    <Link
                      key={card.id}
                      href={card.href}
                      className="nav-card"
                    >
                      <div className="nav-card-icon">
                        {card.icon}
                      </div>
                      <div className="nav-card-title">
                        {card.title}
                      </div>
                      <span className="nav-card-arrow" aria-hidden="true">
                        <Image
                          className="nav-card-arrow-icon"
                          src="/img/arrow.svg"
                          alt=""
                          width={10}
                          height={10}
                        />
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
          {!shouldShowHero && (
            <>
              <div className="breadcrumb-row">
                {sectionLandingPath ? (
                  <Link
                    href={sectionLandingPath}
                    className="breadcrumb-link breadcrumb-section"
                  >
                    {sectionLabel}
                  </Link>
                ) : (
                  <span className="breadcrumb-link breadcrumb-section">{sectionLabel}</span>
                )}
                {isFeaturePage && (
                  <>
                    <span className="breadcrumb-separator">&gt;</span>
                    <span className="breadcrumb-subsection">Features</span>
                  </>
                )}
                <span className="breadcrumb-separator">&gt;</span>
                <span className="breadcrumb-current">{currentPageTitle}</span>
              </div>
              <div className="divider"></div>
            </>
          )}
          {!shouldShowHero && (
            <div className={`article-layout${headings.length ? ' has-toc' : ''}`}>
              <div className="article-container">
                {children}
              </div>
              {headings.length > 0 && (
                <aside className="article-toc" aria-label="On this page">
                  <ul className="toc-list">
                    {headings.map((heading) => (
                      <li
                        key={heading.id}
                        className={`toc-item toc-item-depth-${heading.level}`}
                      >
                        <a href={`#${heading.id}`}>{heading.text}</a>
                      </li>
                    ))}
                  </ul>
                </aside>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

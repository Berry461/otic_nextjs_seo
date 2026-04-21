"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkProps extends Omit<LinkProps, "className"> {
  href: string;
  className?: string;
  activeClassName?: string;
  children?: React.ReactNode;
  exact?: boolean; // true = only match exact path, false = match nested
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, activeClassName, href, children, exact = false, ...props }, ref) => {
    const pathname = usePathname();
    
    const isActive = exact 
      ? pathname === href 
      : pathname.startsWith(href);

    return (
      <Link
        ref={ref}
        href={href}
        className={cn(className, isActive && activeClassName)}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink };
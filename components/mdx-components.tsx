import Image from "next/image";
import * as React from "react";
import * as runtime from "react/jsx-runtime";

import { Callout } from "@/components/callout";
import { cn } from "@/lib/utils";
import { MdxCard } from "@/components/mdx-card";

// Fungsi untuk menggunakan komponen MDX
const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

// Definisi komponen untuk MDX
const components = {
  // Komponen h1 dengan style tambahan untuk margin top, scroll margin, ukuran font, dan tracking
  h1: ({ className, ...props }: { className?: string }) => (
    <h1
      className={cn(
        "mt-5 scroll-m-20 text-4xl font-bold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  // Komponen h2 dengan style tambahan untuk margin top, scroll margin, ukuran font, dan tracking
  h2: ({ className, ...props }: { className?: string }) => (
    <h2
      className={cn(
        "mt-5 scroll-m-20 pb-1 text-3xl tracking-tight first:mt-0",
        className
      )}
      {...props}
    />
  ),
  // Komponen h3 dengan style tambahan untuk margin top, scroll margin, ukuran font, dan tracking
  h3: ({ className, ...props }: { className?: string }) => (
    <h3
      className={cn(
        "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  // Komponen h4 dengan style tambahan untuk margin top, scroll margin, ukuran font, dan tracking
  h4: ({ className, ...props }: { className?: string }) => (
    <h4
      className={cn(
        "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  // Komponen h5 dengan style tambahan untuk margin top, scroll margin, ukuran font, dan tracking
  h5: ({ className, ...props }: { className?: string }) => (
    <h5
      className={cn(
        "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  // Komponen h6 dengan style tambahan untuk margin top, scroll margin, ukuran font, dan tracking
  h6: ({ className, ...props }: { className?: string }) => (
    <h6
      className={cn(
        "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  // Komponen a dengan style tambahan untuk font dan underline
  a: ({ className, ...props }: { className?: string }) => (
    <a
      className={cn("font-medium underline underline-offset-4", className)}
      {...props}
    />
  ),
  // Komponen p dengan style tambahan untuk leading dan margin top untuk elemen yang tidak pertama
  p: ({ className, ...props }: { className?: string }) => (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  // Komponen ul dengan style tambahan untuk margin dan list style
  ul: ({ className, ...props }: { className?: string }) => (
    <ul className={cn("ml-6 list-disc", className)} {...props} />
  ),
  // Komponen ol dengan style tambahan untuk margin dan list style
  ol: ({ className, ...props }: { className?: string }) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  // Komponen li dengan style tambahan untuk margin top
  li: ({ className, ...props }: { className?: string }) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  // Komponen blockquote dengan style tambahan untuk margin top, border, padding, dan font style
  blockquote: ({ className, ...props }: { className?: string }) => (
    <blockquote
      className={cn(
        "[&>*]:text-muted-foreground mt-6 border-l-2 pl-6 italic",
        className
      )}
      {...props}
    />
  ),
  // Komponen img dengan style tambahan untuk border dan rounded corners
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & { className?: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn("rounded-md border", className)} alt={alt} {...props} />
  ),
  // Komponen hr dengan style tambahan untuk margin
  hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
  // Komponen table dengan style tambahan untuk margin dan overflow
  table: ({ className, ...props }: { className?: string }) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn("w-full", className)} {...props} />
    </div>
  ),
  // Komponen tr dengan style tambahan untuk background color pada baris ganjil
  tr: ({ className, ...props }: { className?: string }) => (
    <tr
      className={cn("even:bg-muted m-0 border-t p-0", className)}
      {...props}
    />
  ),
  // Komponen th dengan style tambahan untuk border, padding, dan text alignment
  th: ({ className, ...props }: { className?: string }) => (
    <th
      className={cn(
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  // Komponen td dengan style tambahan untuk border, padding, dan text alignment
  td: ({ className, ...props }: { className?: string }) => (
    <td
      className={cn(
        "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  // Komponen pre dengan style tambahan untuk margin, overflow, border, dan background color
  pre: ({ className, ...props }: { className?: string }) => (
    <pre
      className={cn(
        "mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4",
        className
      )}
      {...props}
    />
  ),
  // Komponen code dengan style tambahan untuk border, padding, dan font
  code: ({ className, ...props }: { className?: string }) => (
    <code
      className={cn(
        "relative rounded border px-[0.3rem] py-[0.2rem] font-mono text-sm",
        className
      )}
      {...props}
    />
  ),
  // Komponen Image dari next/image
  Image,
  // Komponen Callout dari komponen callout
  Callout,
  // Komponen Card dari komponen MdxCard
  Card: MdxCard,
};

interface MdxProps {
  code: string;
}

export function MDXContent({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}

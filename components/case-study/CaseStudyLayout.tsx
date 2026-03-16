interface CaseStudyLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export function CaseStudyLayout({ sidebar, children }: CaseStudyLayoutProps) {
  return (
    <div className="px-6 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
          {/* Left sidebar: sticky on desktop */}
          <div className="lg:w-52 xl:w-60 flex-shrink-0">{sidebar}</div>

          {/* Main content */}
          <div className="min-w-0 flex-1 space-y-20">{children}</div>
        </div>
      </div>
    </div>
  );
}

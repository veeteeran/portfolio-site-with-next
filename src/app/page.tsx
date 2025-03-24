import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FeaturedProjects from "@/components/FeaturedProjects";
import ContactSection from "@/components/ContactSection";
import ScrollButton from "@/components/ui/ScrollButton";
import FooterLinks from "@/components/FooterLinks";

export const metadata = {
  title: "Viet Tran | Thoughtful Solutions, Meaningful Impact",
  description: "Personal portfolio showcasing my projects and skills",
};

export default function Home() {
  const skills = [
    { name: "TypeScript", level: "Advanced" },
    { name: "React", level: "Advanced" },
    { name: "Next.js", level: "Advanced" },
    { name: "Node.js", level: "Advanced" },
    { name: "Express.js", level: "Advanced" },
    { name: "Tailwind CSS", level: "Advanced" },
    { name: "Firebase", level: "Intermediate" },
    { name: "PostgreSQL", level: "Intermediate" },
    { name: "MySQL", level: "Intermediate" },
    { name: "Jest", level: "Intermediate" },
    { name: "Google Cloud Platform", level: "Intermediate" },
    { name: "GitHub Actions", level: "Intermediate" },
  ];

  return (
    <>
      <main className="min-h-screen">
        <nav className="border-b py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <p>Thoughtful Solutions, Meaningful Impact</p>
            <div className="hidden md:flex space-x-6">
              <ScrollButton
                sectionId="projects"
                variant="link"
                className="hover:text-primary transition-colors p-0"
              >
                Projects
              </ScrollButton>
              <ScrollButton
                sectionId="about"
                variant="link"
                className="hover:text-primary transition-colors p-0"
              >
                About
              </ScrollButton>
              <ScrollButton
                sectionId="skills"
                variant="link"
                className="hover:text-primary transition-colors p-0"
              >
                Skills
              </ScrollButton>
              <ScrollButton
                sectionId="contact"
                variant="link"
                className="hover:text-primary transition-colors p-0"
              >
                Contact
              </ScrollButton>
            </div>
            <Button variant="outline" size="sm" className="md:hidden">
              Menu
            </Button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="space-y-6 max-w-2xl">
                <Badge className="px-3 py-1 text-sm mb-4" variant="outline">
                  Available for opportunities
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  Hi, I&apos;m <span className="text-primary">Viet Tran</span>
                </h1>
                <h2 className="text-2xl md:text-3xl text-muted-foreground">
                  Software Engineer
                </h2>
                <p className="text-lg">
                  I thrive on collaborative problem-solving to build impactful
                  applications that make a difference. Experienced with
                  TypeScript, React, and Node.js, and adaptable to the right
                  tools for each challenge, I create solutions that are secure,
                  accessible, and thoroughly tested to ensure reliability. My
                  work focuses on developing high-impact features that help
                  products grow while expanding their reach. At the core of my
                  approach is the belief that good technology should make life
                  easier and respect user privacy—working for people in the way
                  they expect and need.
                </p>
                <div className="flex gap-4 pt-4">
                  <ScrollButton sectionId="projects">
                    View Projects
                  </ScrollButton>
                  <ScrollButton sectionId="contact">Get in Touch</ScrollButton>
                </div>
              </div>
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20">
                <Image
                  src="/images/headshot.jpg"
                  alt="Viet Tran"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">
              My Tech Stack
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {skills.map((skill) => (
                <Badge
                  key={skill.name}
                  variant="secondary"
                  className="text-lg py-3 px-6"
                >
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <FeaturedProjects />

        {/* Brief About Section */}
        <section id="about" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/3">
                <Avatar className="w-48 h-48 mx-auto">
                  <AvatarImage
                    src="/images/headshot.jpg"
                    alt="Viet Tran"
                    className="object-cover"
                  />
                  <AvatarFallback>VT</AvatarFallback>
                </Avatar>
              </div>
              <div className="w-full md:w-2/3">
                <h2 className="text-3xl font-bold mb-6">About Me</h2>
                <p className="text-lg mb-4">
                  My journey in software engineering builds on a diverse
                  background that&apos;s shaped my approach to problem-solving.
                  With over three years of professional development experience,
                  I&apos;ve developed a perspective that values simplicity,
                  reliability, and user-centered design.
                </p>
                <p className="text-lg mb-4">
                  Throughout my professional career, I&apos;ve thrived in
                  leading complex integration projects and building stable
                  systems that connect essential services. I take pride in
                  creating reliable solutions that work seamlessly behind the
                  scenes, enabling others to accomplish their goals without
                  technological friction.
                </p>
                <p className="text-lg mb-4">
                  My approach to development emphasizes simplicity over
                  complexity. I believe the most elegant solutions are often the
                  most intuitive - whether in code architecture or user
                  interface design. I&apos;m particularly interested in
                  exploring underserved areas where technology can benefit
                  broader communities rather than just early adopters.
                </p>
                <p className="text-lg mb-6">
                  When I&apos;m not coding, you&apos;ll likely find me climbing,
                  trying to be a little better today than the day before.
                </p>
                <Link
                  href="/documents/viet_tran_resume.pdf"
                  download="Viet_Tran_Resume.pdf"
                  target="_blank"
                >
                  <Button>Download Resume</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA Section */}
        <ContactSection />

        {/* Footer */}
        <footer className="py-8 border-t">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p>
                © {new Date().getFullYear()} Viet Tran. All rights reserved.
              </p>
              <FooterLinks />
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

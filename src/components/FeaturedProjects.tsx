import ParkManagementSystem from "./ParkManagementSystem";

export default function FeaturedProjects() {
  return (
    <section id="projects" className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Featured Projects
        </h2>
        <ParkManagementSystem />

        {/* Add more projects here */}
      </div>
    </section>
  );
}

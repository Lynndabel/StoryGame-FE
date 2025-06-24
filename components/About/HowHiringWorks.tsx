import Image from "next/image";
import Link from "next/link";

interface Step {
  number: string;
  title: string;
  description: string;
  imageSrc: string;
}

const HowHiringWorks = () => {
  const stepsForArtisans: Step[] = [
    {
      number: "#1",
      title: "Set Up Your Profile",
      description: "Create a profile that highlights your craft and experience.",
      imageSrc: "/ejl1.svg",
    },
    {
      number: "#2",
      title: "Explore Job Listings",
      description: "Create a profile that highlights your craft and experience.",
      imageSrc: "/ejl.svg",
    },
    {
      number: "#3",
      title: "Get Hired",
      description: "Clients review applications and select the right artisan.",
      imageSrc: "/ejl2.svg",
    },
    {
      number: "#4",
      title: "Deliver & Earn",
      description: "Do the work, get approved, and receive secure payment.",
      imageSrc: "/ejl3.svg",
    },
  ];

  const stepsForClients: Step[] = [
    {
      number: "#1",
      title: "Set up Profile",
      description: "Create a profile that highlights who you are.",
      imageSrc: "/ejl4.svg",
    },
    {
      number: "#2",
      title: "Post a Job",
      description: "Describe the task, timeline, and budget.",
      imageSrc: "/ejl5.svg",
    },
    {
      number: "#3",
      title: "Pick the Best Fit",
      description: "Review profiles and hire the artisan that suits your needs.",
      imageSrc: "/ejl7.svg",
    },
    {
      number: "#4",
      title: "Track & Pay",
      description: "Follow project progress and release payment when the job is done.",
      imageSrc: "/ejl6.svg",
    },
  ];

  const renderSection = (title: string, steps: Step[]) => (
    <div className="mb-16">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-6">
        <h2
          className="text-4xl lg:text-5xl font-semi-bold text-center lg:text-left"
          style={{ fontFamily: "Alata, serif", color: "#F9F1E2" }}
        >
          {title}
        </h2>
        <Link
          href="/register"
          className="bg-[#FFD700] hover:bg-yellow-400 text-black font-semibold py-3 px-6 rounded-md transition-all"
        >
          SIGN IN
        </Link>
      </div>

      {/* Steps Grid */}
      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="p-4 rounded-lg w-full"
            style={{
              backgroundColor: "#F2E8CF0A",
              minHeight: "360px",
            }}
          >
            <div className="space-y-4">
              <span
                className="text-4xl lg:text-5xl font-bold"
                style={{ color: "#F2E8CF29", fontFamily: "Merriweather, serif" }}
              >
                {step.number}
              </span>
              <h3
                className="text-2xl lg:text-3xl font-bold text-[#F9F1E2]"
                style={{ fontFamily: "Merriweather, serif" }}
              >
                {step.title}
              </h3>
              <p
                className="text-base"
                style={{
                  color: "#F2E8CF29",
                  fontFamily: "Merriweather, serif",
                }}
              >
                {step.description}
              </p>
              <div className="relative h-[180px] lg:h-[220px] bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                <Image
                  src={step.imageSrc}
                  alt={`Step ${index + 1}: ${step.title}`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="py-16 px-6 lg:px-12" style={{ backgroundColor: "#333333" }}>
      <div className="max-w-7xl mx-auto">
        {renderSection("The process is made easy", stepsForArtisans)}
        {renderSection("How Hiring Works for Clients", stepsForClients)}
      </div>
    </section>
  );
};

export default HowHiringWorks;


interface ServiceSectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const ServiceSection = ({ id, title, subtitle, children }: ServiceSectionProps) => {
  return (
    <section id={id} className={`py-16 bg-blue mt-8`}>
      <div className="container mx-auto px-20">
        <div className="text-center mb-12">
          <h1 className="section-title">{title}</h1>
          {subtitle && <p className="text-auto-gray text-lg max-w-2xl mx-auto">{subtitle}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {children}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;

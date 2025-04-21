
interface ServiceCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const ServiceCard = ({ title, description, icon }: ServiceCardProps) => {
  return (
    <div className="service-card group">
      {icon && <div className="service-icon">{icon}</div>}
      <h1 className="service-title">{title}</h1>
      <p className="service-description">{description}</p>
    </div>
  );
};

export default ServiceCard;

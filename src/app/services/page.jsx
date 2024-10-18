import './Services.css';
import ServicesPage from '../components/ServicesStuff/ServicesList/ServicesPage';
export default function Services() {
  return (
    <main className="services-main">
      <h1 className="service-title">
        <span>ServIt Up:</span> <br></br> Let Skills Meet Opportunities!
      </h1>
      <ServicesPage />
    </main>
  );
}

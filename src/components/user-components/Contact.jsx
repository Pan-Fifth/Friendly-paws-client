import Map from "../user-components/Map";
import ContactForm from "../user-components/SendEmailForm";
import { Email, Information, Phone, Opening, Adress } from "../../icon/IContact";

const Contact = () => {
  return (
    <div className="bg-blue-50 text-black min-h-screen">
      <header className="bg-blue-400 text-white p-4 text-center">
        <h1 className="text-3xl font-bold">Contact Us 🐶🐱</h1>
      </header>
      <section className="mx-auto py-10 px-4 lg:px-20 w-4/5">
        <h2 className="text-4xl font-bold mb-6">Get In Touch</h2>
        <p className="mb-6 text-lg">
          For general enquiries or information about our volunteer program, veterinary care, animal health, or partnerships, please contact:
        </p>
        
        {/* Contact Information Section */}
        <div className="mb-10 bg-white p-6 rounded-lg shadow-md border border-blue-300">
          <p className="flex items-center mb-4">
            <Information height="20px" width="20px" className="mr-2" />
            <strong>General information</strong>: contact@rescue-paws.org
          </p>
          <p className="flex items-center mb-4">
            <Email height="20px" width="20px" className="mr-2" />
            <strong>Adoptions</strong>: contact@rescue-paws.org
          </p>
          <p className="flex items-center mb-4">
            <Phone height="20px" width="20px" className="mr-2" />
            <strong>Phone</strong>: +66 (0) 12 123 123
          </p>
          <p className="flex items-center mb-4">
            <Opening height="20px" width="20px" className="mr-2" />
            <strong>Opening Times</strong>: Monday – Friday 08:30 – 16:30
          </p>
          <p className="flex items-center">
            <Adress height="20px" width="20px" className="mr-2" />
            <strong>Address</strong>: 35 อาคารธรรมศาสตร์
          </p>
        </div>
        
        {/* Map and Contact Form Section */}
        <div className="grid lg:grid-cols-2 gap-10 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md border border-blue-300">
            <Map />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-blue-300">
            <ContactForm />
          </div>
        </div>

        {/* Daily Schedule Section */}
        <section className="bg-pink-50 p-8 rounded-lg shadow-md border border-pink-200 mt-24">
          <h2 className="text-2xl font-bold mb-4">The Sanctuary Daily Schedule 🐾</h2>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="text-center lg:text-left flex-shrink-0">
              <img
                src="/path/to/your/dog-image.jpg"
                alt="Sanctuary dog"
                className="w-full lg:w-48 h-auto rounded-md border border-pink-300"
              />
            </div>
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
              <div className="bg-white p-4 rounded-lg shadow-md border border-pink-200">
                <p className="text-orange-600 font-semibold">6 a.m. - 9 a.m.</p>
                <p>Morning walks, food preparation, feeding and cleaning. 🐾</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border border-pink-200">
                <p className="text-orange-600 font-semibold">9 a.m. - 12 p.m.</p>
                <p>Specialized care for disabled dogs, hydro and physical therapy. 💦</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border border-pink-200">
                <p className="text-orange-600 font-semibold">9 a.m. - 3 p.m.</p>
                <p>Clinic and sanctuary visiting hours. 🏥</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border border-pink-200">
                <p className="text-orange-600 font-semibold">12 p.m. - 1 p.m.</p>
                <p>Lunch time. 🍲</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border border-pink-200">
                <p className="text-orange-600 font-semibold">1 p.m. - 5 p.m.</p>
                <p>Afternoon walks, food preparation, feeding and cleaning. 🌞</p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Contact;

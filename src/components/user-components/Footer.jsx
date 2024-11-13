import { PawPrint } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/Logo-navbar2.png'
import { useTranslation } from 'react-i18next';



export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative mt-16">
      {/* Wave SVG */}
      <div className="absolute left-0 w-full transform -translate-y-full">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-[100px]"
          preserveAspectRatio="none"
          fill="#FFF5EA"
        >
          <path d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,80C672,64,768,64,864,80C960,96,1056,128,1152,128C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </svg>
      </div>

      <div className="bg-[#FFF5EA] pt-12 pb-8">
        {/* Main Content */}
        <div className="container mx-auto px-4">
          {/* Contact Section */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-primary mb-2">{t('footer.how')}</h2>
            <p className="text-xl text-gray-600 mb-6">{t('footer.contact')}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm">
                {/* <Mail className="h-4 w-4 text-primary" /> */}
                <span className="text-sm">hello@homephase.org</span>
              </div>
              <div className="bg-white rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm">
                {/* <Phone className="h-4 w-4 text-primary" /> */}
                <span className="text-sm">813-534-6365</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-3 md:grid-cols-4 gap-6 mb-6 text-sm">
            <Link to="/" className="md:flex md:justify-center hidden">
              <img src={Logo} alt="Logo" className="h-40 w-50 object-cover" />
            </Link>


            <div>
              <ul className="space-y-2">
                <li><Link to={'/'} className="mb-3 hover:text-gray-800 hover:font-semibold">Home</Link></li>
                <li><Link to={'/adopt'} className="mb-3 hover:text-gray-800 hover:font-semibold">Adopt</Link></li>

              </ul>
            </div>
            <div>
              <ul className="space-y-2">
                <li><Link to={'/donate'} className="mb-3 hover:text-gray-800 hover:font-semibold">Donate</Link></li>
                <li><Link to={'/event'} className="mb-3 hover:text-gray-800 hover:font-semibold">Event</Link></li>
                <li><Link to={'/contact'} className="mb-3 hover:text-gray-800 hover:font-semibold">Contact</Link></li>

              </ul>
            </div>
            <div>
              {/* <h3 className="font-bold mb-3">Follow Us</h3> */}
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-800 hover:font-semibold">
                    {/* <Facebook className="h-4 w-4" /> */}
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-800 hover:font-semibold">
                    {/* <Twitter className="h-4 w-4" /> */}
                    Twitter
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-200 pt-4">
            <p className="text-gray-600 text-sm text-center">© 2024 Your Company. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>

  )
}

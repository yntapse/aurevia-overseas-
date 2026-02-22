import { Globe, Ship, MapPin, Users } from 'lucide-react';

export default function GlobalPresence() {
  const regions = [
    {
      name: 'Middle East',
      countries: ['UAE', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Oman'],
      icon: '🕌',
    },
    {
      name: 'Europe',
      countries: ['UK', 'Germany', 'Netherlands', 'France', 'Italy'],
      icon: '🏰',
    },
    {
      name: 'Asia Pacific',
      countries: ['Singapore', 'Malaysia', 'Japan', 'South Korea', 'Australia'],
      icon: '🌏',
    },
    {
      name: 'Americas',
      countries: ['USA', 'Canada', 'Mexico', 'Brazil'],
      icon: '🗽',
    },
    {
      name: 'Africa',
      countries: ['South Africa', 'Kenya', 'Nigeria', 'Egypt'],
      icon: '🦁',
    },
    {
      name: 'South Asia',
      countries: ['Bangladesh', 'Sri Lanka', 'Nepal', 'Maldives'],
      icon: '🏔️',
    },
  ];

  const stats = [
    { icon: Globe, value: '25+', label: 'Countries Served' },
    { icon: Ship, value: '500+', label: 'Containers Shipped' },
    { icon: MapPin, value: '15+', label: 'Port Destinations' },
    { icon: Users, value: '200+', label: 'Happy Clients' },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="h-1 w-12 bg-yellow-500 rounded"></div>
            <span className="text-yellow-400 font-semibold tracking-wide uppercase text-sm">
              Global Presence
            </span>
            <div className="h-1 w-12 bg-yellow-500 rounded"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Connecting Continents Through Trade
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our extensive network spans across 6 continents, delivering quality products to major
            markets worldwide
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all"
            >
              <stat.icon className="h-10 w-10 text-yellow-400 mx-auto mb-3" />
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-gray-300 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-12">
          <div className="flex items-center space-x-3 mb-8">
            <Globe className="h-8 w-8 text-yellow-400" />
            <h3 className="text-3xl font-bold">Export Destinations</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regions.map((region, index) => (
              <div
                key={index}
                className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-4xl">{region.icon}</span>
                  <h4 className="text-xl font-bold">{region.name}</h4>
                </div>
                <div className="space-y-2">
                  {region.countries.map((country) => (
                    <div
                      key={country}
                      className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                    >
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span>{country}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-8 md:p-12 text-gray-900">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Seamless Supply Chain Management
              </h3>
              <p className="text-lg mb-6 text-gray-800">
                From source to destination, we manage every aspect of the export process with
                precision and care.
              </p>
              <ul className="space-y-3">
                {[
                  'Temperature-controlled logistics',
                  'Real-time shipment tracking',
                  'Customs clearance support',
                  'Multi-modal transportation',
                  'Insurance coverage',
                  'Documentation handling',
                ].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/2226458/pexels-photo-2226458.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Logistics"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

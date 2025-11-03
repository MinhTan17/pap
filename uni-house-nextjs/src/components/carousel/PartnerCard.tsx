import { Partner } from '@/data/partners';

interface PartnerCardProps {
  partner: Partner;
}

export default function PartnerCard({ partner }: PartnerCardProps) {
  const cardContent = (
    <>
      {/* Partner Logo */}
      <div className="aspect-square flex items-center justify-center mb-1 bg-gray-50 rounded overflow-hidden">
        {partner.logo ? (
          <img
            src={partner.logo}
            alt={partner.name}
            loading="lazy"
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-red-500 rounded flex items-center justify-center">
            <span className="text-white font-bold text-base" aria-hidden="true">
              {partner.name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Partner Name */}
      <div className="text-center">
        <h3 className="text-[10px] font-medium text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
          {partner.name}
        </h3>
      </div>
    </>
  );

  if (partner.website) {
    return (
      <a
        href={partner.website}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-white rounded-lg p-3 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 group-hover:border-blue-300 h-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        aria-label={`Visit ${partner.name} website`}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <div className="bg-white rounded-lg p-3 shadow-md border border-gray-200 h-full">
      {cardContent}
    </div>
  );
}

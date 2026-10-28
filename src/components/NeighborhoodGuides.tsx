import { NCR_NEIGHBORHOOD_GUIDES } from '../data/properties';
import { Compass, TrendingUp, MapPin, ArrowRight } from 'lucide-react';

interface NeighborhoodGuidesProps {
  onSelectSubmarket: (submarket: string) => void;
}

export default function NeighborhoodGuides({ onSelectSubmarket }: NeighborhoodGuidesProps) {
  const mapGuideNameToSubmarket = (id: string) => {
    switch (id) {
      case 'noida-expressway':
        return 'Noida Expressway';
      case 'golf-course-extn':
        return 'Golf Course Extension';
      case 'dwarka-expressway':
        return 'Dwarka Expressway';
      case 'greater-noida':
        return 'Greater Noida';
      default:
        return 'All Submarkets';
    }
  };

  return (
    <section className="bg-stone-100/70 border-t border-stone-200 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wider uppercase text-amber-700 mb-2">
            Regional Investment Intelligence
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-3">
            NCR Residential Micro-Market Overviews
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Understand capital growth dynamics, social infrastructure, expressway linkages, and livability indices across key residential clusters in Delhi NCR.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {NCR_NEIGHBORHOOD_GUIDES.map((guide) => (
            <div
              key={guide.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-2">
                  <h3 className="text-lg font-bold text-stone-900">
                    {guide.name}
                  </h3>
                  <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60 tabular-nums">
                    {guide.avgRate}
                  </span>
                </div>

                <div className="text-xs font-medium text-amber-700 mb-3">
                  {guide.title}
                </div>

                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  {guide.description}
                </p>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 text-xs text-stone-700 space-y-1.5 mb-4">
                  <div className="font-semibold text-stone-900 text-[11px] uppercase tracking-wider">
                    Infrastructure Highlights:
                  </div>
                  {guide.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-stone-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] text-stone-500">
                  Ideal for: <strong className="text-stone-800">{guide.bestFor}</strong>
                </span>
                <button
                  onClick={() => onSelectSubmarket(mapGuideNameToSubmarket(guide.id))}
                  className="inline-flex items-center gap-1 text-xs font-bold text-stone-900 hover:text-amber-700 transition-colors cursor-pointer"
                >
                  <span>View Corridor Units</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

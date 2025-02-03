import Stat from '@/components/Stat';
import useActivities from '@/hooks/useActivities';

// only support China for now
const LocationSummary = () => {
  const { years, countries, provinces, cities } = useActivities();
  return (
    <div className="cursor-pointer">
      <section>
        {years ? <Stat value={`${years.length}`} description=" 年里我用运动探索过" /> : null}
        {countries ? <Stat value={countries.length} description=" /193个国家" /> : null}
        {provinces ? <Stat value={provinces.length} description=" /34个中国省份" /> : null}
        {cities ? (
          <Stat value={Object.keys(cities).length} description=" /338个中国地级市" />
        ) : null}
      </section>
      <hr color="red" />
    </div>
  );
};

export default LocationSummary;

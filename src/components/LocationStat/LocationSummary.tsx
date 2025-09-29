import { useState } from 'react';
import Stat from '@/components/Stat';
import useActivities from '@/hooks/useActivities';

// 直辖市列表[1,3](@ref)
const MUNICIPALITIES = ['北京市', '天津市', '上海市', '重庆市'];

const LocationSummary = () => {
  const { years, countries, provinces, cities } = useActivities();
  const [showCityDetails, setShowCityDetails] = useState(false);

  // 检查是否存在运动数据
  const hasData = years?.length > 0 || 
                 countries?.length > 0 || 
                 provinces?.length > 0 || 
                 (cities && Object.keys(cities).length > 0);

  if (!hasData) {
    return (
      <div className="text-gray-400 text-center py-5">
        暂无运动地点数据
      </div>
    );
  }

  // 按省份分组城市：假设每个城市对象包含 province 属性
  const citiesByProvince = {};
  let totalCities = 0;
  if (cities) {
    totalCities = Object.keys(cities).length;
    const cityList = Object.values(cities);
    cityList.forEach(city => {
      if (city?.province) {
        const provinceName = city.province;
        if (!citiesByProvince[provinceName]) {
          citiesByProvince[provinceName] = [];
        }
        citiesByProvince[provinceName].push(city);
      }
    });
  }

  return (
    <div>
      <section className="flex flex-wrap gap-4">
        {years?.length > 0 && (
          <Stat 
            value={`${years.length}`} 
            description=" 年里我已运动打卡过"  // 修正错别字：以 -> 已
          />
        )}
        {countries?.length > 0 && (
          <Stat value={countries.length} description=" 个国家" />
        )}
        {provinces?.length > 0 && (
          <Stat value={provinces.length} description=" 个中国省份" />
        )}
        {cities && totalCities > 0 && (
          // 点击城市统计数字展开/收起详细信息
          <div 
            className="cursor-pointer" 
            onClick={() => setShowCityDetails(!showCityDetails)}
          >
            <Stat value={totalCities} description=" 个中国城市" />
          </div>
        )}
      </section>
      
      {/* 城市详细信息：按省份分组显示 */}
      {showCityDetails && cities && Object.keys(citiesByProvince).length > 0 && (
        <div className="city-details mt-4 pl-4">
          <h3 className="font-bold text-lg mb-3">按省份分布的城市</h3>
          {provinces.map(province => {
            const provinceCities = citiesByProvince[province] || [];
            if (provinceCities.length === 0) return null;
            
            const isMunicipality = MUNICIPALITIES.includes(province);
            return (
              <div key={province} className="province-section mb-4">
                <h4 className="font-semibold text-md">{province}</h4>
                <p className="text-sm text-gray-600 mb-2">
                  {isMunicipality ? '直辖市区' : '地级市'}（共 {provinceCities.length} 个）
                </p>
                <ul className="list-disc list-inside grid grid-cols-2 gap-1">
                  {provinceCities.map(city => (
                    <li key={city.name || city.id} className="text-sm">
                      {city.name || '未知城市'}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
      <hr className="my-4" />
    </div>
  );
};

export default LocationSummary;

import { useState, useMemo, useCallback } from 'react';
import Stat from '@/components/Stat';
import useActivities from '@/hooks/useActivities';

// 直辖市列表
const MUNICIPALITIES = ['北京市', '天津市', '上海市', '重庆市'];

// 自治州名称简化映射 - 修复语法错误并完善格式
const AUTONOMOUS_PREFECTURE_MAP = {
  '海南藏族自治州': '海南州',
  '伊犁哈萨克自治州': '伊犁州',
  '恩施土家族苗族自治州': '恩施州',
  '湘西土家族苗族自治州': '湘西州',
  '甘孜藏族自治州': '甘孜州',
  '凉山彝族自治州': '凉山州',
  '阿坝藏族羌族自治州': '阿坝州',
  '黔东南苗族侗族自治州': '黔东南州',
  '黔南布依族苗族自治州': '黔南州',
  '黔西南布依族苗族自治州': '黔西南州',
  '西双版纳傣族自治州': '西双版纳',
  '文山壮族苗族自治州': '文山州',
  '红河哈尼族彝族自治州': '红河州',
  '德宏傣族景颇族自治州': '德宏州',
  '怒江傈僳族自治州': '怒江州',
  '大理白族自治州': '大理州',
  '楚雄彝族自治州': '楚雄州',
  '迪庆藏族自治州': '迪庆州',
  '甘南藏族自治州': '甘南州',
  '临夏回族自治州': '临夏州',
  '玉树藏族自治州': '玉树州',
  '海西蒙古族藏族自治州': '海西州',
  '果洛藏族自治州': '果洛州',
  '黄南藏族自治州': '黄南州',
  '海北藏族自治州': '海北州',
  '香港特别行政区': '香港',
  '澳门特别行政区': '澳门',
  '大兴安岭地区': '大兴安岭',
  '巴音郭楞蒙古自治州': '巴音郭楞',
  '彭水苗族土家族自治县': '彭水县',
  '克孜勒苏柯尔克孜自治州': '克孜勒州',
  '昌吉回族自治州': '昌吉州',
  '博尔塔拉蒙古自治州': '博尔塔拉'
};

// 使用 React.memo 避免不必要的重渲染[5,8](@ref)
const LocationSummary = () => {
  const { years, countries, provinces, cities } = useActivities();
  const [showCityDetails, setShowCityDetails] = useState(false);

  // 使用 useCallback 优化事件处理函数[4,7](@ref)
  const toggleCityDetails = useCallback(() => {
    setShowCityDetails(prev => !prev);
  }, []);

  // 检查是否存在运动数据 - 使用 useMemo 优化计算[4,8](@ref)
  const hasData = useMemo(() => 
    years?.length > 0 || 
    countries?.length > 0 || 
    provinces?.length > 0 || 
    (cities && Object.keys(cities).length > 0),
    [years, countries, provinces, cities]
  );

  // 格式化城市名称 - 使用 useCallback 缓存函数[4](@ref)
  const formatCityName = useCallback((cityName) => {
    return AUTONOMOUS_PREFECTURE_MAP[cityName] || cityName;
  }, []);

  // 使用 useMemo 优化城市分组计算，避免每次渲染都重新计算[4,8](@ref)
  const { citiesByProvince, totalCities } = useMemo(() => {
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
    
    return { citiesByProvince, totalCities };
  }, [cities]);

  // 早期返回模式：先处理无数据情况[5](@ref)
  if (!hasData) {
    return (
      <div className="text-gray-400 text-center py-5">
        暂无运动地点数据
      </div>
    );
  }

  return (
    <div className="location-summary">
      <section className="flex flex-wrap gap-4">
        {years?.length > 0 && (
          <Stat 
            value={`${years.length}`} 
            description=" 年里我已运动打卡过"
          />
        )}
        {countries?.length > 0 && (
          <Stat value={countries.length} description=" 个国家" />
        )}
        {provinces?.length > 0 && (
          <Stat value={provinces.length} description=" 个中国省份" />
        )}
        {totalCities > 0 && (
          <div 
            className="cursor-pointer transition-colors hover:text-blue-600"
            onClick={toggleCityDetails}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                toggleCityDetails();
              }
            }}
          >
            <Stat value={totalCities} description=" 个中国城市" />
          </div>
        )}
      </section>
      
      {/* 城市详细信息：按省份分组显示 */}
      {showCityDetails && totalCities > 0 && (
        <div className="city-details mt-4 pl-4 animate-fade-in">
          <h3 className="font-bold text-lg mb-3 text-gray-800">按省份分布的城市</h3>
          <div className="space-y-6">
            {provinces.map(province => {
              const provinceCities = citiesByProvince[province] || [];
              if (provinceCities.length === 0) return null;
              
              const isMunicipality = MUNICIPALITIES.includes(province);
              
              return (
                <div key={province} className="province-section p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-md text-gray-900">{province}</h4>
                    <span className="text-sm text-gray-600 bg-white px-2 py-1 rounded">
                      {isMunicipality ? '直辖市区' : '地级市'}（{provinceCities.length} 个）
                    </span>
                  </div>
                  <ul className="list-none grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {provinceCities.map((city, index) => (
                      <li 
                        key={city.id || `${province}-${city.name}-${index}`}
                        className="text-sm text-gray-700 bg-white px-3 py-2 rounded shadow-sm"
                      >
                        {city.name ? formatCityName(city.name) : '未知城市'}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <hr className="my-4 border-gray-200" />
    </div>
  );
};

// 使用 React.memo 进行性能优化[5,8](@ref)
export default React.memo(LocationSummary);

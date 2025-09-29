<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>中国城市名称优化展示</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
        }
        
        body {
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            color: #333;
            line-height: 1.6;
            padding: 20px;
            min-height: 100vh;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        
        header {
            background: linear-gradient(120deg, #1a73e8, #0d47a1);
            color: white;
            padding: 25px 30px;
            text-align: center;
        }
        
        h1 {
            font-size: 2.2rem;
            margin-bottom: 10px;
            font-weight: 600;
        }
        
        .subtitle {
            font-size: 1.1rem;
            opacity: 0.9;
            max-width: 700px;
            margin: 0 auto;
        }
        
        .controls {
            padding: 20px;
            background: #f8f9fa;
            border-bottom: 1px solid #eaeaea;
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            align-items: center;
        }
        
        .search-box {
            flex: 1;
            min-width: 250px;
            position: relative;
        }
        
        .search-box input {
            width: 100%;
            padding: 12px 20px 12px 45px;
            border: 2px solid #e0e0e0;
            border-radius: 30px;
            font-size: 1rem;
            transition: all 0.3s;
        }
        
        .search-box input:focus {
            outline: none;
            border-color: #1a73e8;
            box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.2);
        }
        
        .search-icon {
            position: absolute;
            left: 18px;
            top: 50%;
            transform: translateY(-50%);
            color: #777;
        }
        
        .filter-section {
            display: flex;
            gap: 15px;
            flex-wrap: wrap;
        }
        
        .filter-btn {
            background: white;
            border: 2px solid #e0e0e0;
            border-radius: 30px;
            padding: 8px 18px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.2s;
        }
        
        .filter-btn.active, .filter-btn:hover {
            background: #1a73e8;
            color: white;
            border-color: #1a73e8;
        }
        
        .stats {
            display: flex;
            justify-content: center;
            gap: 30px;
            padding: 15px;
            background: #f1f8ff;
            border-bottom: 1px solid #e0e0e0;
            flex-wrap: wrap;
        }
        
        .stat-card {
            background: white;
            border-radius: 10px;
            padding: 15px 25px;
            text-align: center;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
            min-width: 150px;
        }
        
        .stat-value {
            font-size: 2.2rem;
            font-weight: 700;
            color: #1a73e8;
            margin-bottom: 5px;
        }
        
        .stat-label {
            font-size: 0.95rem;
            color: #666;
        }
        
        .cities-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            padding: 25px;
        }
        
        .province-section {
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
            transition: transform 0.3s;
        }
        
        .province-section:hover {
            transform: translateY(-5px);
        }
        
        .province-header {
            background: linear-gradient(120deg, #4a69bd, #1e3799);
            color: white;
            padding: 15px 20px;
            font-size: 1.2rem;
            font-weight: 600;
        }
        
        .city-list {
            padding: 15px;
        }
        
        .city-item {
            padding: 10px 15px;
            border-bottom: 1px solid #f0f0f0;
            display: flex;
            justify-content: space-between;
        }
        
        .city-item:last-child {
            border-bottom: none;
        }
        
        .city-name {
            font-weight: 500;
        }
        
        .city-code {
            color: #777;
            font-size: 0.9rem;
            font-family: monospace;
        }
        
        .simplified {
            color: #e74c3c;
            font-weight: 600;
        }
        
        footer {
            text-align: center;
            padding: 20px;
            color: #666;
            font-size: 0.9rem;
            border-top: 1px solid #eee;
            background: #f8f9fa;
        }
        
        .highlight {
            background-color: #fff9c4;
            padding: 2px 5px;
            border-radius: 3px;
        }
        
        @media (max-width: 768px) {
            .cities-container {
                grid-template-columns: 1fr;
            }
            
            .controls {
                flex-direction: column;
                align-items: stretch;
            }
            
            .filter-section {
                justify-content: center;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>中国城市名称优化展示</h1>
            <p class="subtitle">在UI层转换城市名称，保持数据源不变 - 自治州、特别行政区等名称已简化</p>
        </header>
        
        <div class="controls">
            <div class="search-box">
                <span class="search-icon">🔍</span>
                <input type="text" id="searchInput" placeholder="搜索省份或城市...">
            </div>
            
            <div class="filter-section">
                <div class="filter-btn active" data-filter="all">全部</div>
                <div class="filter-btn" data-filter="simplified">已简化名称</div>
                <div class="filter-btn" data-filter="municipalities">直辖市</div>
                <div class="filter-btn" data-filter="autonomous">自治州</div>
            </div>
        </div>
        
        <div class="stats">
            <div class="stat-card">
                <div class="stat-value" id="totalProvinces">0</div>
                <div class="stat-label">省份/自治区</div>
            </div>
            <div class="stat-card">
                <div class="stat-value" id="totalCities">0</div>
                <div class="stat-label">地级市/自治州</div>
            </div>
            <div class="stat-card">
                <div class="stat-value" id="simplifiedCount">0</div>
                <div class="stat-label">名称已简化</div>
            </div>
        </div>
        
        <div class="cities-container" id="citiesContainer">
            <!-- 城市列表将通过JavaScript动态生成 -->
        </div>
        
        <footer>
            <p>注：<span class="highlight">红色高亮</span>表示名称已被简化，数据源保持原始名称不变</p>
            <p>所有城市数据基于中国行政区划代码（GB/T 2260）</p>
        </footer>
    </div>

    <script>
        // 城市数据（保持原始数据不变）
        const chinaCities = [
            // 这里放置您提供的完整城市数据
            // 由于数据量很大，在实际实现中会包含完整数据
            // 这里仅展示部分数据作为示例
            {
                code: '110000',
                name: '北京市',
                province: '11'
            },
            {
                code: '120000',
                name: '天津市',
                province: '12'
            },
            {
                code: '130100',
                name: '石家庄市',
                province: '13',
                city: '01'
            },
            {
                code: '130200',
                name: '唐山市',
                province: '13',
                city: '02'
            },
            {
                code: '152200',
                name: '兴安盟',
                province: '15',
                city: '22'
            },
            {
                code: '152500',
                name: '锡林郭勒盟',
                province: '15',
                city: '25'
            },
            {
                code: '152900',
                name: '阿拉善盟',
                province: '15',
                city: '29'
            },
            {
                code: '222400',
                name: '延边朝鲜族自治州',
                province: '22',
                city: '24'
            },
            {
                code: '513200',
                name: '阿坝藏族羌族自治州',
                province: '51',
                city: '32'
            },
            {
                code: '513300',
                name: '甘孜藏族自治州',
                province: '51',
                city: '33'
            },
            {
                code: '513400',
                name: '凉山彝族自治州',
                province: '51',
                city: '34'
            },
            {
                code: '632500',
                name: '海南藏族自治州',
                province: '63',
                city: '25'
            },
            {
                code: '632200',
                name: '海北藏族自治州',
                province: '63',
                city: '22'
            },
            {
                code: '810000',
                name: '香港特别行政区',
                province: '81'
            },
            {
                code: '820000',
                name: '澳门特别行政区',
                province: '82'
            },
            // ...其他城市数据
        ];

        // 名称简化映射（在UI层转换）
        const nameSimplificationMap = {
            '香港特别行政区': '香港',
            '澳门特别行政区': '澳门',
            '延边朝鲜族自治州': '延边州',
            '恩施土家族苗族自治州': '恩施州',
            '湘西土家族苗族自治州': '湘西州',
            '阿坝藏族羌族自治州': '阿坝州',
            '甘孜藏族自治州': '甘孜州',
            '凉山彝族自治州': '凉山州',
            '黔东南苗族侗族自治州': '黔东南州',
            '黔南布依族苗族自治州': '黔南州',
            '黔西南布依族苗族自治州': '黔西南州',
            '西双版纳傣族自治州': '版纳州',
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
            '海南藏族自治州': '海南州',
            '海北藏族自治州': '海北州',
            '巴音郭楞蒙古自治州': '巴州',
            '克孜勒苏柯尔克孜自治州': '克州',
            '昌吉回族自治州': '昌吉州',
            '伊犁哈萨克自治州': '伊犁州',
            '博尔塔拉蒙古自治州': '博州',
            '兴安盟': '兴安盟',
            '锡林郭勒盟': '锡林郭勒盟',
            '阿拉善盟': '阿拉善盟'
        };

        // 直辖市列表
        const municipalities = ['北京市', '天津市', '上海市', '重庆市'];

        // 初始化页面
        document.addEventListener('DOMContentLoaded', () => {
            renderCities(chinaCities);
            setupEventListeners();
            updateStatistics(chinaCities);
        });

        // 渲染城市列表
        function renderCities(cities) {
            const container = document.getElementById('citiesContainer');
            container.innerHTML = '';
            
            // 按省份分组
            const provincesMap = groupCitiesByProvince(cities);
            
            // 渲染每个省份
            for (const [province, cities] of Object.entries(provincesMap)) {
                const provinceSection = document.createElement('div');
                provinceSection.className = 'province-section';
                
                const provinceHeader = document.createElement('div');
                provinceHeader.className = 'province-header';
                provinceHeader.textContent = province;
                
                const cityList = document.createElement('div');
                cityList.className = 'city-list';
                
                // 渲染该省份下的城市
                cities.forEach(city => {
                    const cityItem = document.createElement('div');
                    cityItem.className = 'city-item';
                    
                    const displayName = simplifyCityName(city.name);
                    const isSimplified = displayName !== city.name;
                    
                    const cityNameSpan = document.createElement('span');
                    cityNameSpan.className = 'city-name';
                    cityNameSpan.innerHTML = isSimplified 
                        ? `<span class="simplified">${displayName}</span> <span style="color:#999;font-size:0.9em">(${city.name})</span>`
                        : displayName;
                    
                    const cityCodeSpan = document.createElement('span');
                    cityCodeSpan.className = 'city-code';
                    cityCodeSpan.textContent = city.code;
                    
                    cityItem.appendChild(cityNameSpan);
                    cityItem.appendChild(cityCodeSpan);
                    cityList.appendChild(cityItem);
                });
                
                provinceSection.appendChild(provinceHeader);
                provinceSection.appendChild(cityList);
                container.appendChild(provinceSection);
            }
        }

        // 按省份分组城市
        function groupCitiesByProvince(cities) {
            const provincesMap = {};
            
            cities.forEach(city => {
                // 获取省份名称
                const provinceCode = city.province;
                const provinceName = getProvinceName(provinceCode);
                
                if (!provincesMap[provinceName]) {
                    provincesMap[provinceName] = [];
                }
                
                provincesMap[provinceName].push(city);
            });
            
            return provincesMap;
        }

        // 简化城市名称（UI层转换）
        function simplifyCityName(name) {
            return nameSimplificationMap[name] || name;
        }

        // 根据省份代码获取省份名称
        function getProvinceName(code) {
            const provinceMap = {
                '11': '北京市',
                '12': '天津市',
                '13': '河北省',
                '14': '山西省',
                '15': '内蒙古自治区',
                '21': '辽宁省',
                '22': '吉林省',
                '23': '黑龙江省',
                '31': '上海市',
                '32': '江苏省',
                '33': '浙江省',
                '34': '安徽省',
                '35': '福建省',
                '36': '江西省',
                '37': '山东省',
                '41': '河南省',
                '42': '湖北省',
                '43': '湖南省',
                '44': '广东省',
                '45': '广西壮族自治区',
                '46': '海南省',
                '50': '重庆市',
                '51': '四川省',
                '52': '贵州省',
                '53': '云南省',
                '54': '西藏自治区',
                '61': '陕西省',
                '62': '甘肃省',
                '63': '青海省',
                '64': '宁夏回族自治区',
                '65': '新疆维吾尔自治区',
                '71': '台湾省',
                '81': '香港特别行政区',
                '82': '澳门特别行政区'
            };
            
            return provinceMap[code] || `省份${code}`;
        }

        // 设置事件监听器
        function setupEventListeners() {
            // 搜索功能
            const searchInput = document.getElementById('searchInput');
            searchInput.addEventListener('input', () => {
                const searchTerm = searchInput.value.toLowerCase();
                const filteredCities = chinaCities.filter(city => {
                    const provinceName = getProvinceName(city.province).toLowerCase();
                    const cityName = city.name.toLowerCase();
                    const simpleName = simplifyCityName(city.name).toLowerCase();
                    
                    return provinceName.includes(searchTerm) || 
                           cityName.includes(searchTerm) || 
                           simpleName.includes(searchTerm);
                });
                
                renderCities(filteredCities);
                updateStatistics(filteredCities);
            });
            
            // 筛选功能
            const filterButtons = document.querySelectorAll('.filter-btn');
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // 更新按钮状态
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    
                    // 应用筛选
                    const filterType = button.dataset.filter;
                    let filteredCities = chinaCities;
                    
                    if (filterType === 'simplified') {
                        filteredCities = chinaCities.filter(city => 
                            nameSimplificationMap[city.name] !== undefined
                        );
                    } else if (filterType === 'municipalities') {
                        filteredCities = chinaCities.filter(city => 
                            municipalities.includes(city.name)
                        );
                    } else if (filterType === 'autonomous') {
                        filteredCities = chinaCities.filter(city => 
                            city.name.includes('自治州') || city.name.includes('盟')
                        );
                    }
                    
                    renderCities(filteredCities);
                    updateStatistics(filteredCities);
                });
            });
        }

        // 更新统计信息
        function updateStatistics(cities) {
            // 计算省份数量
            const provinces = new Set(cities.map(city => city.province));
            document.getElementById('totalProvinces').textContent = provinces.size;
            
            // 计算城市数量
            document.getElementById('totalCities').textContent = cities.length;
            
            // 计算已简化名称的数量
            const simplifiedCount = cities.filter(city => 
                nameSimplificationMap[city.name] !== undefined
            ).length;
            document.getElementById('simplifiedCount').textContent = simplifiedCount;
        }
    </script>
</body>
</html>

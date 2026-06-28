import type { DashboardContent } from '../types/dashboard'

export const dashboardContent: DashboardContent = {
  profile: {
    title: '丹江口水库环境遥感分析仪表盘',
    subtitle: '水体格局、库周生态响应与地表温度冷岛效应',
    studyArea: '南水北调中线源区丹江口水库及库周 10 km 缓冲区',
    period: '2010-2024 年，6-10 月 Landsat 年度合成',
    sourceNote:
      '页面数值来自本地课程报告输出 CSV 与已生成图件；JRC、CHIRPS、MODIS、ESA WorldCover / Dynamic World 作为独立参考或解释背景。',
  },
  views: [
    {
      id: 'overview',
      label: '总览',
      eyebrow: 'Integrated view',
      summary:
        '先看研究区、证据链和最关键结论：水体面积扩大较明确，生态与热环境信号需要结合质量标记谨慎解释。',
    },
    {
      id: 'water',
      label: '水体格局',
      eyebrow: 'MNDWI and JRC validation',
      summary:
        '聚焦 MNDWI 水体提取、2014 异常低值、阈值敏感性和 JRC 年度/空间一致性验证。',
    },
    {
      id: 'ecology',
      label: '生态响应',
      eyebrow: 'NDVI / NDMI buffers',
      summary:
        '比较 0-1、1-3、3-5、5-10 km 缓冲区内的绿度与水分状态，保留 2010 的 vegetation caution。',
    },
    {
      id: 'thermal',
      label: '热环境',
      eyebrow: 'LST and water cooling intensity',
      summary:
        '展示水体与陆地缓冲区 LST 差异，使用 WCI 描述水体冷岛强度及其年际变化。',
    },
    {
      id: 'context',
      label: '解释背景',
      eyebrow: 'Climate and land cover context',
      summary:
        '把降水、ET/PET 与土地覆盖作为解释背景，避免把遥感相关性直接写成工程因果。',
    },
    {
      id: 'evidence',
      label: '证据边界',
      eyebrow: 'Cautions and claims',
      summary:
        '汇总可稳健陈述的结论、必须保留的 caution 年份，以及不能越界推断的地方。',
    },
  ],
  metrics: [
    {
      label: '最大水库范围',
      value: '869.76',
      unit: 'km²',
      delta: 'JRC 30 m raster pixelArea',
      note: '最终研究区水体面积统计口径；后续水体面积均限制在该范围内。',
      tone: 'water',
    },
    {
      label: '运行期水面均值',
      value: '777.78',
      unit: 'km²',
      delta: '+178.63 km² vs 2010-2013',
      note: '2015-2024 年平均水体面积明显高于通水前参考期，2014 单独处理。',
      tone: 'water',
    },
    {
      label: '运行期 NDVI',
      value: '0.611',
      unit: 'mean',
      delta: '+0.074 vs 2011-2013',
      note: '绿度提高较清楚；若包含 2010，增幅会被放大。',
      tone: 'vegetation',
    },
    {
      label: '运行期 NDMI',
      value: '0.178',
      unit: 'mean',
      delta: '+0.001 vs 2011-2013',
      note: '水分状态提升弱于 NDVI，说明绿度与水分并不同步。',
      tone: 'vegetation',
    },
    {
      label: '平均冷岛强度',
      value: '6.02',
      unit: '℃',
      delta: 'land buffer - water',
      note: '水体相对陆地是稳定冷源，但陆地缓冲区距离梯度不强。',
      tone: 'thermal',
    },
    {
      label: '特殊解释年份',
      value: '2010 / 2014',
      delta: 'vegetation / transition caution',
      note: '2010 影响生态参考期；2014 水体提取异常，需要单独讨论。',
      tone: 'caution',
    },
  ],
  signals: [
    { label: '研究区控制', value: 96 },
    { label: '数据质量诊断', value: 88 },
    { label: '水体结果验证', value: 92 },
    { label: '生态响应证据', value: 78 },
    { label: '热环境证据', value: 84 },
    { label: '因果边界控制', value: 90 },
  ],
  trendDatasets: {
    waterArea: [
      {
        label: 'MNDWI water area',
        color: '#1f78a8',
        points: [
          { year: 2010, value: 748.4169 },
          { year: 2011, value: 528.8626 },
          { year: 2012, value: 596.9222 },
          { year: 2013, value: 522.413 },
          { year: 2014, value: 346.6304, quality: 'caution' },
          { year: 2015, value: 658.3435 },
          { year: 2016, value: 698.1436 },
          { year: 2017, value: 762.3552 },
          { year: 2018, value: 811.0487 },
          { year: 2019, value: 784.0314 },
          { year: 2020, value: 819.9735 },
          { year: 2021, value: 834.7401 },
          { year: 2022, value: 777.1401 },
          { year: 2023, value: 824.53 },
          { year: 2024, value: 807.4875 },
        ],
      },
    ],
    waterValidation: [
      {
        label: 'Landsat MNDWI',
        color: '#1f78a8',
        points: [
          { year: 2010, value: 748.4169 },
          { year: 2011, value: 528.8626 },
          { year: 2012, value: 596.9222 },
          { year: 2013, value: 522.413 },
          { year: 2014, value: 346.6304, quality: 'caution' },
          { year: 2015, value: 658.3435 },
          { year: 2016, value: 698.1436 },
          { year: 2017, value: 762.3552 },
          { year: 2018, value: 811.0487 },
          { year: 2019, value: 784.0314 },
          { year: 2020, value: 819.9735 },
          { year: 2021, value: 834.7401 },
        ],
      },
      {
        label: 'JRC YearlyHistory',
        color: '#7a6f5a',
        points: [
          { year: 2010, value: 616.5601 },
          { year: 2011, value: 654.4456 },
          { year: 2012, value: 553.3634 },
          { year: 2013, value: 564.98 },
          { year: 2014, value: 717.0548, quality: 'caution' },
          { year: 2015, value: 731.919 },
          { year: 2016, value: 723.393 },
          { year: 2017, value: 826.7091 },
          { year: 2018, value: 825.4048 },
          { year: 2019, value: 821.5928 },
          { year: 2020, value: 850.7745 },
          { year: 2021, value: 864.7142 },
        ],
      },
    ],
    ecology: [
      {
        label: 'Mean NDVI',
        color: '#4f8f3a',
        points: [
          { year: 2010, value: 0.309, quality: 'vegetation caution' },
          { year: 2011, value: 0.5625 },
          { year: 2012, value: 0.4971 },
          { year: 2013, value: 0.5508 },
          { year: 2014, value: 0.5886, quality: 'transition caution' },
          { year: 2015, value: 0.6085 },
          { year: 2016, value: 0.5773 },
          { year: 2017, value: 0.6426 },
          { year: 2018, value: 0.5549 },
          { year: 2019, value: 0.6281 },
          { year: 2020, value: 0.6655 },
          { year: 2021, value: 0.65 },
          { year: 2022, value: 0.5615 },
          { year: 2023, value: 0.639 },
          { year: 2024, value: 0.585 },
        ],
      },
      {
        label: 'Mean NDMI',
        color: '#2b9c86',
        points: [
          { year: 2010, value: 0.1225, quality: 'vegetation caution' },
          { year: 2011, value: 0.1921 },
          { year: 2012, value: 0.1949 },
          { year: 2013, value: 0.1466 },
          { year: 2014, value: 0.1905, quality: 'transition caution' },
          { year: 2015, value: 0.1738 },
          { year: 2016, value: 0.1601 },
          { year: 2017, value: 0.2151 },
          { year: 2018, value: 0.1197 },
          { year: 2019, value: 0.1877 },
          { year: 2020, value: 0.2018 },
          { year: 2021, value: 0.2014 },
          { year: 2022, value: 0.1472 },
          { year: 2023, value: 0.2021 },
          { year: 2024, value: 0.1753 },
        ],
      },
    ],
    thermal: [
      {
        label: 'Mean WCI',
        color: '#c94f38',
        points: [
          { year: 2010, value: 3.6917, quality: 'vegetation caution' },
          { year: 2011, value: 6.3869 },
          { year: 2012, value: 4.266 },
          { year: 2013, value: 7.5451 },
          { year: 2014, value: 6.818, quality: 'transition caution' },
          { year: 2015, value: 5.2371 },
          { year: 2016, value: 6.4457 },
          { year: 2017, value: 5.5172 },
          { year: 2018, value: 6.1597 },
          { year: 2019, value: 7.4295 },
          { year: 2020, value: 6.9644 },
          { year: 2021, value: 5.7329 },
          { year: 2022, value: 7.6113 },
          { year: 2023, value: 5.3633 },
          { year: 2024, value: 5.1079 },
        ],
      },
    ],
    climate: [
      {
        label: '6-10月降水',
        color: '#2a6fbb',
        points: [
          { year: 2010, value: 697.1871 },
          { year: 2011, value: 566.2372 },
          { year: 2012, value: 563.5237 },
          { year: 2013, value: 525.3898 },
          { year: 2014, value: 575.2058, quality: 'transition caution' },
          { year: 2015, value: 518.886 },
          { year: 2016, value: 569.4266 },
          { year: 2017, value: 725.5547 },
          { year: 2018, value: 412.6734 },
          { year: 2019, value: 550.5511 },
          { year: 2020, value: 673.5283 },
          { year: 2021, value: 764.5268 },
          { year: 2022, value: 432.5541 },
          { year: 2023, value: 777.0501 },
          { year: 2024, value: 620.1542 },
        ],
      },
      {
        label: '6-10月 ET/PET',
        color: '#b7832f',
        points: [
          { year: 2010, value: 0.4735 },
          { year: 2011, value: 0.4151 },
          { year: 2012, value: 0.4089 },
          { year: 2013, value: 0.4152 },
          { year: 2014, value: 0.436, quality: 'transition caution' },
          { year: 2015, value: 0.4268 },
          { year: 2016, value: 0.4829 },
          { year: 2017, value: 0.5056 },
          { year: 2018, value: 0.4616 },
          { year: 2019, value: 0.4238 },
          { year: 2020, value: 0.5448 },
          { year: 2021, value: 0.5543 },
          { year: 2022, value: 0.3327 },
          { year: 2023, value: 0.5053 },
          { year: 2024, value: 0.4532 },
        ],
      },
    ],
  },
  phaseStats: [
    {
      label: '水体面积均值',
      group: 'water',
      pre: '599.15 km²',
      caution2014: '346.63 km²',
      operation: '777.78 km²',
      interpretation:
        '运行期均值明显高于 2010-2013；2014 是低值异常年，不并入前后阶段均值。',
    },
    {
      label: 'NDVI 均值',
      group: 'ecology',
      pre: '0.537 (2011-2013)',
      caution2014: '0.589',
      operation: '0.611',
      interpretation:
        '运行期绿度高于敏感性参考期，但 2010 异常低值会放大 2010-2013 基线差异。',
    },
    {
      label: 'NDMI 均值',
      group: 'ecology',
      pre: '0.177 (2011-2013)',
      caution2014: '0.191',
      operation: '0.178',
      interpretation:
        'NDMI 相比敏感性参考期几乎不变，说明水分状态响应弱于 NDVI。',
    },
    {
      label: '水体冷岛强度',
      group: 'thermal',
      pre: '5.47 ℃',
      caution2014: '6.82 ℃',
      operation: '6.16 ℃',
      interpretation:
        '水体冷源效应稳定存在，但 0-1 km 与 5-10 km 陆地 LST 梯度较弱。',
    },
    {
      label: '6-10 月降水',
      group: 'context',
      pre: '588.08 mm',
      caution2014: '575.21 mm',
      operation: '604.59 mm',
      interpretation:
        '降水年际波动较大，是解释水体与生态指标变化时必须同时考虑的背景。',
    },
  ],
  figures: [
    {
      title: '南水北调中线工程背景',
      group: 'overview',
      src: 'middle_route_authoritative.jpg',
      emphasis: 'wide',
      caption:
        '权威路线图用于说明丹江口水库、陶岔渠首、河南、河北、北京、天津之间的工程背景。',
    },
    {
      title: '研究区与四级缓冲区',
      group: 'overview',
      src: 'study_area_buffers.png',
      caption:
        '研究区不是 rawBox 简单平均，而是基于 JRC 自动清理后的水库范围和 0-10 km 陆地缓冲区。',
    },
    {
      title: '技术流程与数据模块',
      group: 'overview',
      src: 'technical_workflow.png',
      caption:
        '展示从研究区构建、Landsat 质量控制、水体/生态/热环境分析到解释背景的完整证据链。',
    },
    {
      title: '水体面积变化',
      group: 'water',
      src: 'water_area_trend_2010_2024.png',
      emphasis: 'wide',
      caption:
        '2015-2024 水体面积整体维持较高水平；2014 低值被标记为 transition caution。',
    },
    {
      title: '阶段统计',
      group: 'water',
      src: 'water_area_phase_statistics.png',
      caption:
        '三阶段统计采用 2010-2013、2014、2015-2024 的结构，避免把 2014 直接并入前后均值。',
    },
    {
      title: '阈值敏感性',
      group: 'water',
      src: 'water_area_threshold_sensitivity.png',
      caption:
        '不同 MNDWI 阈值下 2014 仍保持明显低谷，说明异常不只是单一阈值导致。',
    },
    {
      title: 'Landsat 与 JRC 年度面积对比',
      group: 'water',
      src: 'landsat_vs_jrc_water_area_trend.png',
      emphasis: 'wide',
      caption:
        'JRC 作为独立参考而非绝对真值；2014 在两套数据中差异最大。',
    },
    {
      title: '2014 空间一致性',
      group: 'water',
      src: 'jrc_landsat_spatial_agreement_2014.png',
      caption:
        '2014 出现较大 jrc_only 区域，提示 Landsat-MNDWI 掩膜存在漏提或 MNDWI 整体偏低问题。',
    },
    {
      title: '2020 空间一致性',
      group: 'water',
      src: 'jrc_landsat_spatial_agreement_2020.png',
      caption:
        '2020 的空间一致性明显更好，用于对照说明 2014 的特殊性。',
    },
    {
      title: '2014 MNDWI 诊断',
      group: 'water',
      src: 'water2014_diagnostic_mndwi_map_2014.png',
      caption:
        '2014 有效像元比例较高，但 MNDWI 中位数偏低，水体 mask 更破碎。',
    },
    {
      title: 'NDVI 阶段统计',
      group: 'ecology',
      src: 'ndvi_phase_statistics.png',
      caption:
        '运行期 NDVI 高于通水前参考期；同时报告 2010-2013 和 2011-2013 两种基线。',
    },
    {
      title: 'NDMI 阶段统计',
      group: 'ecology',
      src: 'ndmi_phase_statistics.png',
      caption:
        'NDMI 相比 2011-2013 参考期提升很弱，生态解释不能只看 NDVI。',
    },
    {
      title: 'NDVI 参考期敏感性',
      group: 'ecology',
      src: 'ndvi_pre_period_sensitivity.png',
      caption:
        '2010 低值会显著影响 2010-2013 均值，因此被标记为 vegetation caution。',
    },
    {
      title: 'NDMI 参考期敏感性',
      group: 'ecology',
      src: 'ndmi_pre_period_sensitivity.png',
      caption:
        '水分状态对参考期选择更敏感，不能把 NDMI 弱变化夸大为显著生态改善。',
    },
    {
      title: 'NDVI 年际变化',
      group: 'ecology',
      src: 'buffer_ndvi_trend.png',
      emphasis: 'wide',
      caption:
        '四级缓冲区 NDVI 同步波动明显，距离梯度弱于年际背景变化。',
    },
    {
      title: 'NDMI 年际变化',
      group: 'ecology',
      src: 'buffer_ndmi_trend.png',
      emphasis: 'wide',
      caption:
        'NDMI 反映植被水分状态，运行期并未表现出与 NDVI 同等幅度的提高。',
    },
    {
      title: 'WCI 年际变化',
      group: 'thermal',
      src: 'water_cooling_intensity_trend.png',
      emphasis: 'wide',
      caption:
        'WCI 为陆地缓冲区平均 LST 减水体区 LST，整体显示稳定的水体冷源效应。',
    },
    {
      title: 'LST 分区趋势',
      group: 'thermal',
      src: 'lst_trend_by_zone.png',
      caption:
        '水体区 LST 明显低于陆地缓冲区，但陆地缓冲区之间距离梯度并不总是单调。',
    },
    {
      title: '2020 LST 空间分布',
      group: 'thermal',
      src: 'lst_map_2020.png',
      caption:
        '空间图用于检查水陆热差异是否与水库位置一致，并辅助解释 WCI。',
    },
    {
      title: 'WCI 阶段统计',
      group: 'thermal',
      src: 'wci_phase_statistics.png',
      caption:
        '运行期 WCI 均值约 6.16 ℃，但仍需考虑云、薄云、传感器和地表覆盖影响。',
    },
    {
      title: '降水与水体面积',
      group: 'context',
      src: 'precip_water_area_trend.png',
      emphasis: 'wide',
      caption:
        '降水是解释水体面积年际波动的重要背景，但相关性不能直接写成因果。',
    },
    {
      title: '降水与 NDVI / NDMI',
      group: 'context',
      src: 'precip_ndvi_ndmi_trend.png',
      caption:
        'NDMI 与季节降水的对应关系强于 NDVI，说明植被水分状态受气候背景影响。',
    },
    {
      title: 'ET/PET 背景',
      group: 'context',
      src: 'et_pet_ratio_trend.png',
      caption:
        'ET/PET 反映水分供需背景，2022 低值对生态与热环境解释具有参考意义。',
    },
    {
      title: '相关性热图',
      group: 'context',
      src: 'climate_correlation_heatmap.png',
      caption:
        '相关矩阵只作为描述性统计，不能替代机制模型或因果识别。',
    },
    {
      title: '2021 土地覆盖组成',
      group: 'context',
      src: 'esa_worldcover_2021_buffer_composition.png',
      caption:
        '土地覆盖差异帮助解释为什么近岸缓冲区不一定表现出更高 NDVI 或更低 LST。',
    },
    {
      title: '2016-2024 土地覆盖变化',
      group: 'context',
      src: 'dynamic_world_landcover_change_2016_2024.png',
      caption:
        'Dynamic World 提供背景性的土地覆盖变化线索，不作为正式分类精度评价。',
    },
    {
      title: '综合解释框架',
      group: 'evidence',
      src: 'comprehensive_explanation_framework.png',
      emphasis: 'wide',
      caption:
        '最终解释采用多因素框架：水库运行阶段、气候背景、土地覆盖、物候和观测质量共同塑造遥感信号。',
    },
  ],
  claims: [
    {
      claim: '2015-2024 年水体面积显著高于 2010-2013。',
      evidence:
        'MNDWI > 0 下运行期均值为 777.78 km²，2010-2013 均值为 599.15 km²；JRC 对 2018-2021 的面积与空间一致性较好。',
      caution:
        '2014 不是稳定阶段均值，应作为 transition caution 单独讨论。',
    },
    {
      claim: '库周 NDVI 在运行期整体较高。',
      evidence:
        '四级缓冲区运行期 NDVI 均值约 0.611，相比 2011-2013 敏感性参考期提高约 0.074。',
      caution:
        '2010 NDVI 异常低，若纳入 2010-2013 均值会放大提升幅度。',
    },
    {
      claim: 'NDMI 没有与 NDVI 同步显著提升。',
      evidence:
        '运行期 NDMI 约 0.178，相比 2011-2013 仅提高约 0.001。',
      caution:
        '水分状态受降水、作物物候与土地覆盖影响，不能只用工程节点解释。',
    },
    {
      claim: '水体对周边陆地具有稳定冷源效应。',
      evidence:
        '2010-2024 平均 WCI 约 6.02 ℃，运行期约 6.16 ℃。',
      caution:
        '陆地缓冲区间梯度弱，近水区并不总是明显更冷。',
    },
    {
      claim: '本研究支持“阶段性遥感变化”而非直接因果证明。',
      evidence:
        '水体、生态、热环境和气候背景共同变化，且存在 2010、2014 两个质量/异常解释节点。',
      caution:
        '缺少完整水位、调度、降水站网、土地管理和因果识别模型，不能把相关性写成工程单因果。',
    },
  ],
  qualityNotes: [
    '2010 年 NDVI/NDMI 低值混合了影像质量、传感器差异和真实年景差异，生态阶段统计需同时报告 2010-2013 与 2011-2013。',
    '2014 年有效像元比例较高，但 MNDWI 中位数明显偏低，水体 mask 破碎；水体趋势中必须标记为 caution。',
    'JRC 是独立参考数据，不是绝对真值；JRC 与 Landsat-MNDWI 的差异可能来自浅水区、涨落带、库湾、支流和阈值差异。',
    '降水、ET/PET 和土地覆盖模块只作为解释背景，不能替代因果模型。',
  ],
}

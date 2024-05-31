import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { State } from '~/store/types';

import { fetchData } from '../api/memory';
import { useLineChartMemory } from '../hooks/useLineChart';
import {
  chartJSResource,
  chartStyles,
  commonDataSetProps,
  memoryChartOptions,
} from '../misc/chart-memory';
import { getClashAPIConfig, getSelectedChartStyleIndex } from '../store/app';
import s0 from './MemoryChart.module.scss';
import { connect } from './StateProvider';

const { useMemo } = React;

const chartWrapperStyle = {
  // make chartjs chart responsive
  justifySelf: 'center',
  position: 'relative',
  width: '100%',
  height: '100%',
};

const canvasWrapperStyle = {
  width: '100%',
  height: '100%',
  padding: '10px',
  borderRadius: '10px',
};

const mapState = (s: State) => ({
  apiConfig: getClashAPIConfig(s),
  selectedChartStyleIndex: getSelectedChartStyleIndex(s),
});

export default connect(mapState)(MemoryChart);

function MemoryChart({ apiConfig, selectedChartStyleIndex }) {
  const ChartMod = chartJSResource.read();
  const memory = fetchData(apiConfig);
  const { t } = useTranslation();
  const data = useMemo(
    () => ({
      labels: memory.labels,
      datasets: [
        {
          ...commonDataSetProps,
          ...memoryChartOptions,
          ...chartStyles[selectedChartStyleIndex].inuse,
          label: t('Memory'),
          data: memory.inuse,
        },
      ],
    }),
    [memory, selectedChartStyleIndex, t]
  );

  useLineChartMemory(ChartMod.Chart, 'MemoryChart', data, memory);

  return (
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ position: string; maxWidth: number; }' is ... Remove this comment to see the full error message
    <div style={chartWrapperStyle}>
      <canvas id="MemoryChart" style={canvasWrapperStyle} className={s0.TrafficChart} />
    </div>
  );
}

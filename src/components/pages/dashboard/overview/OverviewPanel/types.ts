export interface DataPoint {
  date: string;
  value: number;
  compare: number;
  fullDate: string;
  lastPeriod: number;
}

export interface Action {
  title: string;
  count: string;
  icon: string;
}

export interface TooltipData {
  date: string;
  value: number;
  lastPeriod: number;
}

export interface CustomDotProps {
  cx?: number;
  cy?: number;
  payload?: DataPoint;
}

export interface ChartMouseEvent {
  activeLabel?: string;
  activePayload?: Array<{
    payload: DataPoint;
  }>;
}

export interface MetricCard {
  label: string;
  value: string;
}
